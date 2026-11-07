import { Q, M, E, O } from "../lib/helpers.js";

export default {
  id: 17, day: 17, short: "Security Testing in CI/CD", title: "Secure Testing Tools and CI Integration",
  outcome: "Connect secure coding to secure pipelines, run SAST, SCA, secret, DAST and IaC scans in CI/CD, and automatically catch secret leaks and outdated components.",
  theory: [
    { h: "Security at the speed of DevOps", p: [
        "CI/CD lets teams release faster and more often. Testing security only at the end of the cycle creates bottlenecks and lets vulnerabilities live longer, which raises the cost of fixing them.",
        "**DevSecOps** embeds security into the whole pipeline as a shared responsibility of development, security and operations. A key piece is automated **security gates** that stop insecure code from moving forward."],
      say: "In CI/CD, security has to move at the same speed as delivery, so I automate it as gates in the pipeline." },
    { h: "How secure coding connects to secure pipelines", p: [
        "A pipeline cannot make insecure code secure. It enforces the standards developers follow. In essence, the pipeline **operationalises** secure coding."],
      bullets: [
        "**Input validation and output encoding**: SAST verifies they are implemented and DAST tests their effectiveness. The pipeline makes sure the checks are never skipped.",
        "**Secrets management**: developers who use environment variables or a secrets manager let the pipeline inject secrets at runtime, so they never sit in source control or build logs.",
        "**Dependency management**: tidy dependencies make it easy for SCA to flag outdated or vulnerable libraries and block builds.",
        "**Error handling and logging**: safe practices mean the pipeline and monitoring can collect diagnostics without exposing sensitive data.",
        "**Code quality and standards**: SAST in the pipeline catches anti-patterns before they reach the deployable artefact."],
      say: "The pipeline automates enforcement of the practices I already follow, and gives a continuous feedback loop." },
    { h: "The five scan types in a pipeline", bullets: [
        "**SAST** analyses source code before compilation or deployment. Run early, in the build stage or pre-commit. Tools: SonarQube, Bandit, ESLint, Checkmarx, Veracode. Fail the build on critical findings or a failed quality gate.",
        "**SCA** finds known vulnerabilities in third-party libraries. Run after dependencies are installed. Tools: OWASP Dependency-Check, Snyk, npm audit, pip-audit. Block builds with vulnerable dependencies or licence problems.",
        "**Secret scanning** detects hardcoded secrets in code, config and commit history. Run as early as possible, ideally pre-commit or right after push. Tools: GitGuardian, TruffleHog, detect-secrets. Fail immediately and alert.",
        "**DAST** tests the running application by simulating attacks. Run against a deployed test or staging environment. Tools: OWASP ZAP, Burp Suite, Acunetix. Report findings and block production deployment on critical issues.",
        "**IaC scanning** analyses Terraform, CloudFormation and Kubernetes manifests for misconfigurations. Run before infrastructure is provisioned. Tools: Checkov, tfsec, Kube-bench."],
      beyond: "Kube-bench is slightly different from the others. It runs the CIS Kubernetes Benchmark checks against a running cluster rather than scanning IaC files, so it is a configuration audit tool more than a static IaC scanner.",
      say: "I place each scan where it gives the earliest useful answer: secrets first, then SAST and SCA, then IaC, then DAST on a running environment." },
    { h: "Example pipeline with security gates", p: ["Each security scan becomes a stage or job. If a job exits with a non-zero status, the pipeline stops and later stages never run."], code: `# .gitlab-ci.yml (illustrative)
stages: [secrets, build, test, sca, deploy-staging, dast, deploy-prod]

secret_scan:
  stage: secrets
  script:
    - trufflehog git file://. --only-verified --fail
  # fails the pipeline if a verified secret is found

build:
  stage: build
  script: [npm ci, npm run build]

sast:
  stage: test
  script:
    - npx eslint . --max-warnings 0
    - bandit -r ./app -ll          # medium severity and above

sca:
  stage: sca
  script:
    - npm audit --audit-level=high # non-zero exit if high or critical found
    - pip-audit -r requirements.txt

iac_scan:
  stage: test
  script: [checkov -d ./infra]

dast:
  stage: dast
  script: [zap-baseline.py -t https://staging.example.com]
  needs: [deploy-staging]`,
      beyond: "The configuration snippets in the lesson were images, so this is my own illustrative version. Exact flags change between tool releases, so check each tool's documentation before copying.",
      say: "Each security stage is a gate. A failing gate stops the pipeline, so insecure code cannot reach production." },
    { h: "Catching secret leaks automatically", p: [
        "Hardcoded secrets are a direct path to compromise. If an attacker reaches your code through a public repo, a compromised developer machine or a supply chain attack, every hardcoded credential is immediately usable."],
      bullets: [
        "**Tools**: GitGuardian, TruffleHog, detect-secrets.",
        "**Where**: as early as possible, ideally a pre-receive hook on the Git server or the very first build step. Scan commit history, branches and files for patterns that look like keys and passwords.",
        "**Action**: fail the build immediately and alert the security team.",
        "**If one is found**: treat it as compromised and rotate it. Removing it from the latest commit is not enough."],
      code: `# Local scan of a repo
trufflehog git file:///path/to/repo

# GitGuardian CLI
ggshield secret scan repo .

# detect-secrets (create and audit a baseline)
detect-secrets scan > .secrets.baseline`,
      beyond: "The exercise suggests `pip install trufflehog`. The current TruffleHog from Truffle Security is a Go program installed from its releases, Homebrew or Docker, and the Python package of that name on PyPI is an older, unrelated tool. Check the official TruffleHog repository for install instructions. Also, GitHub and GitLab offer built-in secret push protection that blocks many secrets before they land.",
      say: "I scan for secrets at the earliest point possible and fail fast, because a leaked secret must be revoked no matter what." },
    { h: "Catching outdated and vulnerable components", bullets: [
        "**Why**: vulnerable third-party libraries are a leading cause of breaches.",
        "**Tools**: npm audit, pip-audit, OWASP Dependency-Check, Snyk.",
        "**Where**: after the dependency installation step.",
        "**Action**: fail on high or critical severity. For lower severity, pass with warnings and alerts for review."],
      code: `# fail the CI job if high or critical advisories exist
npm ci
npm audit --audit-level=high

# Python
pip install -r requirements.txt
pip-audit -r requirements.txt`,
      say: "I run the audit straight after install and set the threshold, for example high, so the pipeline decides automatically." }
  ],
  qs: [
    Q("DevSecOps", "What is DevSecOps?", "A philosophy that embeds security into the entire DevOps pipeline as a shared responsibility", ["A new programming language", "A hardware vendor", "A type of encryption"], "Development, security and operations share it."),
    Q("DevSecOps", "Why is testing security only at the end of the cycle a problem in CI/CD?", "It creates bottlenecks and lets vulnerabilities persist longer, raising remediation costs", ["It is too fast", "It reduces code quality scores", "It is not allowed in Git"], "Late discovery is slow and expensive."),
    Q("DevSecOps", "What is a security gate in a pipeline?", "An automated check that stops insecure code from progressing", ["A physical door", "A firewall rule", "A user password"], "Failing the gate fails the build."),
    Q("DevSecOps", "What does 'the pipeline operationalises secure coding' mean?", "It automates the enforcement of the practices developers are expected to follow", ["It writes the code for them", "It replaces developers", "It removes the need for standards"], "A pipeline cannot secure insecure code by itself."),
    Q("DevSecOps", "How do good secrets management habits help the pipeline?", "The pipeline can inject secrets at runtime so they never appear in source control or logs", ["They make the pipeline slower", "They remove the need for tests", "They hide the build logs"], "Secrets stay out of code."),
    Q("SAST", "Where does SAST usually run?", "Early, in the build stage or even pre-commit", ["Only in production", "After release", "Only in the staging server"], "It needs source code, not a running app."),
    Q("SAST", "What should the pipeline do if SAST finds critical issues or fails a quality gate?", "Fail the build", ["Deploy anyway", "Delete the repo", "Ignore it"], "Insecure code must not progress."),
    Q("SAST", "Which of these is a SAST tool?", "Bandit", ["OWASP ZAP", "Burp Suite", "TruffleHog"], "It scans Python source."),
    Q("SCA", "What does SCA find?", "Known vulnerabilities in third-party libraries and dependencies", ["Weak passwords", "Misconfigured firewalls", "Slow queries"], "It compares your dependency list with advisories."),
    Q("SCA", "When does SCA usually run?", "After dependencies are installed", ["Before git init", "Only before a meeting", "After deployment only"], "It needs the dependency list resolved."),
    Q("SCA", "Which command fails when high or critical npm vulnerabilities exist?", "npm audit --audit-level=high", ["npm start", "npm run build", "npm init"], "It returns a non-zero exit code at or above that level."),
    Q("SCA", "What is a sensible policy for low-severity vulnerabilities?", "Allow the build but generate warnings and alerts for review", ["Block every build forever", "Hide them", "Delete the lock file"], "Use severity thresholds to keep the pipeline practical."),
    Q("Secrets", "Where should secret scanning run?", "As early as possible, such as a pre-commit or pre-receive hook, or the first build step", ["Only a year later", "Only after deployment", "Only in staging"], "The sooner a leak is found, the less damage."),
    Q("Secrets", "A secret scanner finds an API key in a commit. What must the team do?", "Fail the build, alert and rotate the key because it is compromised", ["Delete the file only", "Rename the variable", "Wait for the next release"], "History retains the old commit."),
    Q("Secrets", "Which tool is a secret scanner?", "GitGuardian or TruffleHog", ["OWASP ZAP", "Checkov", "npm audit"], "They look for key and password patterns."),
    Q("Secrets", "Why do hardcoded secrets matter if an attacker gets read access to your code?", "They are immediately usable credentials", ["They slow the attack", "They are encrypted by default", "They are automatically rotated"], "The code itself becomes the key."),
    Q("Secrets", "Which command runs a local TruffleHog scan of a Git repository?", "trufflehog git file:///path/to/repo", ["npm audit file:///repo", "bandit git .", "ggshield build"], "It reads the repo history."),
    Q("Secrets", "Which command runs a GitGuardian scan of a repo?", "ggshield secret scan repo .", ["npm run ggshield", "git secrets-scan", "tfsec ."], "It is the GitGuardian CLI."),
    Q("DAST", "Where does DAST run in the pipeline?", "Against a deployed application in a test or staging environment", ["On the developer's keyboard", "Before the code exists", "On the Git server only"], "It needs a running app."),
    Q("DAST", "Which tool is a DAST tool?", "OWASP ZAP", ["Bandit", "pip-audit", "detect-secrets"], "It attacks the running app."),
    Q("DAST", "What is a typical CI action on critical DAST findings?", "Report them and block production deployment", ["Delete staging", "Ignore", "Disable DAST"], "Critical issues should not reach production."),
    Q("IaC", "What does IaC security scanning analyse?", "Configuration files such as Terraform, CloudFormation and Kubernetes manifests", ["Employee emails", "Server hardware", "Network cables"], "It finds misconfigurations."),
    Q("IaC", "When should IaC scanning run?", "Early, before infrastructure is provisioned", ["After a breach", "Only in production", "Never"], "It stops insecure infrastructure being built."),
    Q("IaC", "Which of these is an IaC scanner?", "Checkov or tfsec", ["Burp Suite", "TruffleHog", "ESLint"], "They parse infrastructure code."),
    Q("Pipeline design", "Which stage ordering is most sensible?", "Secret scan, build, SAST and SCA, deploy to staging, DAST, then production", ["DAST, then write code", "Production first, tests later", "SCA before dependencies exist"], "Earliest useful checks first."),
    Q("Pipeline design", "Why scan for secrets before the build?", "A leak is critical, so fail fast before spending time on the rest", ["Because builds are free", "Because it is alphabetically first", "Because secrets are public"], "There is no value in building a leaking commit."),
    Q("Pipeline design", "Why is SAST placed before DAST?", "SAST needs only source code and gives faster feedback, while DAST needs a deployed app", ["DAST is illegal early", "SAST is more accurate always", "DAST is free"], "Use the earliest check available."),
    Q("Pipeline design", "A developer commits directly with `git commit --no-verify`, skipping the hooks. Which control still protects the repo?", "The CI pipeline gates, which run on the server", ["Nothing, it is lost", "The IDE theme", "The commit message"], "Server-side checks cannot be skipped locally."),
    Q("Pipeline design", "What is the role of exit codes in security gates?", "A non-zero exit code from a scanner fails the job and stops the pipeline", ["They colour the logs", "They change the Git branch", "They encrypt artefacts"], "Tools signal findings through exit status.")
  ],
  match: [
    M("Match the scan type to its purpose", "Pipeline scans.", [
      ["SAST", "Analyses source code for vulnerabilities"],
      ["SCA", "Finds known vulnerabilities in third-party libraries"],
      ["Secret scanning", "Detects hardcoded keys and passwords in code and history"],
      ["DAST", "Tests a running application by simulating attacks"],
      ["IaC scanning", "Finds misconfigurations in Terraform or Kubernetes files"]]),
    M("Match the tool to its category", "Common tools.", [
      ["SonarQube", "SAST"],
      ["OWASP Dependency-Check", "SCA"],
      ["TruffleHog", "Secret scanning"],
      ["OWASP ZAP", "DAST"],
      ["Checkov", "IaC scanning"],
      ["GitGuardian", "Secret scanning"],
      ["Snyk", "SCA"],
      ["tfsec", "IaC scanning"]]),
    M("Match the scan to where it fits in the pipeline", "Placement.", [
      ["Secret scan", "Very early: pre-commit, pre-receive or first build step"],
      ["SAST", "Early, in the build stage"],
      ["SCA", "After dependencies are installed"],
      ["IaC scan", "Before infrastructure is provisioned"],
      ["DAST", "After deployment to a test or staging environment"]]),
    M("Match the secure coding practice to its pipeline benefit", "Connecting practice to pipeline.", [
      ["Secrets in env vars or a secrets manager", "The pipeline injects them at runtime, never in source or build logs"],
      ["Tidy dependency management", "SCA can flag and block vulnerable libraries easily"],
      ["Input validation and output encoding", "SAST verifies them and DAST tests their effectiveness"],
      ["Safe error handling and logging", "Diagnostics can be collected without leaking secrets"]])
  ],
  order: [
    O("Order a sensible pipeline", "From first stage to last.", [
      "Secret scan",
      "Build",
      "SAST and SCA",
      "IaC scan",
      "Deploy to staging",
      "DAST",
      "Deploy to production"])
  ],
  open: [
    E("Explain how secure coding practices connect to a secure CI/CD pipeline.", [
      "The pipeline operationalises secure coding: it automates enforcement of the practices developers follow.",
      "Validation and encoding are checked by SAST and tested by DAST. Secrets management lets the pipeline inject secrets at runtime. Dependency hygiene lets SCA block bad libraries.",
      "It gives a continuous feedback loop and makes sure checks are never skipped."]),
    E("Exercise 1: scan a repo for secrets and describe what you found and how you remediated it.", [
      "Create a private repo with fake secrets such as an API key, a DB password and an AWS-style key, then commit them.",
      "Run `trufflehog git file:///path/to/repo` or `ggshield secret scan repo .`.",
      "Review the result: the secret type, file and line, and whether the tool found them all.",
      "Remediate: replace with `os.getenv(\"API_KEY\")`, commit, and re-scan. Note that the old commits still contain the secrets in history, so in a real case you would rotate the secrets."],
      "The key point to mention is history: removing a secret from the latest commit does not remove it from earlier ones."),
    E("Exercise 2: write a CI step that audits dependencies and fails on high severity.", [
      "Install dependencies (`npm ci` or `pip install -r requirements.txt`).",
      "Run `npm audit --audit-level=high` or `pip-audit -r requirements.txt`.",
      "The non-zero exit code fails the job when high or critical issues exist.",
      "Update the vulnerable package and re-run to confirm it passes."]),
    E("Exercise 3: where do you add SAST, SCA and secret scan gates in a simple pipeline, and why?", [
      "Secret scan: first stage, because leaks are critical and fail-fast saves time. Command: `trufflehog git file://. --only-verified --fail` or `ggshield`.",
      "SAST: in the build or test stage, before deployment, because it needs only source code. Commands: `bandit -r .`, `npx eslint .`, or SonarQube quality gates.",
      "SCA: after dependency installation and before deployment, because it needs the resolved dependency list. Commands: `npm audit --audit-level=high` or `pip-audit`.",
      "All three fail the job so insecure code cannot move forward."]),
    E("Why do secret scans run earlier than DAST?", [
      "Secrets are a critical exposure and are found without running the app.",
      "Failing fast avoids wasting build time and prevents the leak from spreading.",
      "DAST needs a deployed environment, so it must run later."]),
    E("What happens if a developer bypasses the local pre-commit hooks?", [
      "Server-side CI gates still run on every push.",
      "That is why scans run both locally for speed and in CI as the enforced backstop.",
      "Pre-receive hooks and push protection on the Git server add another layer."])
  ]
};
