import { Q, M, E, O } from "../lib/helpers.js";

export default {
  id: 18, day: 18, short: "Maintenance & Assurance", title: "Maintenance and Continuous Assurance",
  outcome: "Explain how ongoing maintenance keeps applications secure, run security-focused peer reviews, and rotate secrets and patch configurations.",
  theory: [
    { h: "Security is a journey, not a destination", p: [
        "Once an application goes live, new vulnerabilities are discovered in operating systems, libraries and frameworks, attackers refine their techniques, and even small configuration changes can add weaknesses. Thinking software is 'done' at deployment is a dangerous misconception.",
        "Maintenance and continuous assurance mean monitoring, adapting and responding so that the application stays secure long after release. Developers are active participants in this, not bystanders."],
      say: "Security is not a one-time achievement. After release the threat landscape keeps moving, so maintenance has to as well." },
    { h: "How maintenance keeps security healthy", bullets: [
        "**Patch management**: regularly apply security patches to operating systems, frameworks, libraries and all components. It prevents exploitation of known flaws.",
        "**Vulnerability management**: continuously identify, assess and fix weaknesses using regular scans (SAST, DAST, SCA), penetration testing and bug bounty programmes.",
        "**Configuration management**: keep servers, databases, network devices and application settings at secure baselines and prevent **configuration drift**.",
        "**Security monitoring and incident response**: watch logs, traffic and behaviour for signs of compromise, and have a plan to detect, contain, eradicate and recover.",
        "**Code reviews and audits**: periodic security-focused reviews, even for older code, and external audits for an independent view.",
        "**Threat intelligence**: stay informed about new threats and techniques and feed them into tools and practices."],
      beyond: "Incident response is often described in phases. A common version is preparation, detection and analysis, containment, eradication, recovery and lessons learned (as in NIST SP 800-61). The lesson's list, detect, contain, eradicate and recover, matches the middle of that cycle.",
      say: "Maintenance is patching, vulnerability management, configuration control, monitoring and response, reviews and threat intelligence working together." },
    { h: "Security-focused peer reviews", p: [
        "Automated tools are good at known patterns, but they struggle with business logic flaws, design weaknesses and subtle errors that need an understanding of intent. Human review fills the gap."],
      bullets: [
        "**Catches logic flaws**: authorisation bypasses and flawed design decisions.",
        "**Contextual understanding**: reviewers know the purpose, data flows and trust boundaries.",
        "**Knowledge sharing and mentorship**: builds a security-aware culture.",
        "**Better code quality** and **fresh perspectives**.",
        "**Best practices**: involve security champions, use a checklist (OWASP Top 10, ASVS or internal guidelines), review with the threat model in mind, review all changes (not only new code), hunt for anti-patterns such as SQL concatenation and unvalidated redirects, check security configuration, and give constructive feedback focused on education, not blame."],
      beyond: "A classic review catch that automated tools rarely see: an endpoint that checks the user is logged in but never checks that the order they request belongs to them (an insecure direct object reference). Broken Access Control is number one in the OWASP Top 10:2025.",
      say: "I review with the threat model in mind and ask how an attacker could abuse this change, then I give feedback that teaches." },
    { h: "Rotating secrets", p: [
        "Secret rotation means periodically changing credentials such as API keys, database passwords and encryption keys. It limits how long a stolen secret is useful."],
      bullets: [
        "**Why**: limits the impact of a compromise, reduces the chance long-lived secrets are found or brute-forced, and satisfies standards such as PCI DSS.",
        "**Automate** with HashiCorp Vault, AWS Secrets Manager or Azure Key Vault where possible.",
        "**Schedule** manual rotation (for example every 90 days) with a clear process where automation is not possible.",
        "**Least privilege** for whatever performs the rotation.",
        "**Update all consumers** at the same time, which is why a secrets manager that distributes the new value helps."],
      code: `# AWS Secrets Manager (boto3)
import json, boto3
client = boto3.client("secretsmanager")
resp = client.get_secret_value(SecretId="prod/blog/db")
creds = json.loads(resp["SecretString"])
conn = connect(user=creds["username"], password=creds["password"])

# HashiCorp Vault (hvac)
import hvac
vault = hvac.Client(url="https://vault.example.com")   # auth via role/token, not hardcoded
data = vault.secrets.kv.v2.read_secret_version(path="blog/db")["data"]["data"]

# Kubernetes Secret mounted as a file
with open("/etc/secrets/db_password") as f:
    db_password = f.read().strip()`,
      beyond: "Rotation intervals such as '90 days' are common policy, but current guidance from bodies like NIST leans toward rotating **on evidence of compromise** for human passwords, while still favouring short-lived or automatically rotated credentials for machine secrets. The best design is secrets that are dynamic and short-lived, so there is little to steal. Also, Kubernetes Secrets are base64-encoded, not encrypted, unless you enable encryption at rest or use an external manager. Treat the snippets above as concept illustrations, not production code.",
      say: "Secrets managers give central control, auditing, access policies and automated rotation, which environment variables alone cannot." },
    { h: "Patching configurations", p: [
        "Patching configurations means updating security-related settings in software, operating systems and infrastructure, alongside patching the software itself."],
      bullets: [
        "**Fixes misconfigurations**: defaults are often insecure.",
        "**Addresses new vulnerabilities**: many are found in how software is configured, not only in code.",
        "**Prevents drift**: manual changes cause inconsistent and insecure environments.",
        "**Automated configuration management**: Infrastructure as Code (Terraform, Ansible, Puppet, Chef) so settings are version-controlled, reviewed and applied automatically.",
        "**Regular audits** against baselines such as CIS Benchmarks.",
        "**Policy as Code**, for example Open Policy Agent, to block non-compliant configurations from being deployed.",
        "**Centralised management** to push secure configurations and patches everywhere."],
      say: "I treat configuration as code: version it, review it, audit it against a baseline and enforce it automatically." }
  ],
  qs: [
    Q("Maintenance", "Why is software never 'done' from a security point of view?", "New vulnerabilities and attack techniques keep appearing after deployment", ["Users get bored", "Compilers expire", "Servers change colour"], "The threat landscape evolves."),
    Q("Maintenance", "What is patch management?", "Regularly applying security patches to operating systems, frameworks, libraries and other components", ["Writing new features", "Deleting logs", "Changing the logo"], "It closes known flaws."),
    Q("Maintenance", "What is vulnerability management?", "Continuously identifying, assessing and remediating vulnerabilities in the deployed application and infrastructure", ["Counting users", "Writing contracts", "Printing reports only"], "It includes scans, pen tests and bug bounties."),
    Q("Maintenance", "Which of these is part of vulnerability management?", "Penetration testing and bug bounty programmes", ["Changing the office layout", "Hiring a designer", "Choosing a font"], "They actively find weaknesses."),
    Q("Maintenance", "What is configuration drift?", "Configurations gradually departing from the secure baseline through ad hoc changes", ["A network cable moving", "A slow disk", "A bug in CSS"], "It leads to inconsistent and insecure environments."),
    Q("Maintenance", "Which is NOT a security maintenance activity?", "Choosing a new brand colour", ["Patching", "Configuration management", "Security monitoring"], "Branding is unrelated."),
    Q("Maintenance", "Why integrate threat intelligence?", "It lets you adapt defences proactively to emerging threats", ["It speeds up compile time", "It removes need for patches", "It reduces disk use"], "Awareness drives action."),
    Q("Maintenance", "What does security monitoring plus incident response enable?", "Rapid detection and response to active threats, minimising damage", ["Eliminating all attacks", "Skipping patches", "Reducing server size"], "Speed limits impact."),
    Q("Maintenance", "Why do periodic code reviews matter even for older code?", "New anti-patterns and subtle logic flaws are recognised over time", ["Old code is always perfect", "Reviews are legally required", "It removes tests"], "Knowledge improves."),
    Q("Peer review", "What kind of flaws do peer reviews catch that tools often miss?", "Business logic flaws and authorisation bypasses", ["Syntax errors only", "Spelling in comments", "Indentation"], "They need understanding of intent."),
    Q("Peer review", "What does contextual understanding give a reviewer?", "Knowledge of the app's purpose, data flows and trust boundaries to spot domain-specific risks", ["Faster typing", "Better graphics", "More servers"], "Tools lack this context."),
    Q("Peer review", "Which review practice is recommended?", "Use a checklist based on the OWASP Top 10, ASVS or internal guidelines", ["Review only on Fridays", "Skip small changes", "Only review code you wrote"], "Checklists give consistent coverage."),
    Q("Peer review", "Why review changes and not only new code?", "Even small changes can introduce vulnerabilities", ["Small changes are always safe", "Only new files matter", "Changes are generated"], "A one-line change can remove a check."),
    Q("Peer review", "Which is an anti-pattern to look for in review?", "Direct SQL string concatenation or unvalidated redirects", ["Parameterised queries", "Input whitelisting", "Generic error pages"], "These are classic insecure patterns."),
    Q("Peer review", "What tone should security feedback have?", "Constructive and educational, not blaming", ["Harsh and public", "Silent", "Sarcastic"], "The goal is a security-aware culture."),
    Q("Peer review", "Why review with the threat model in mind?", "It focuses attention on how an attacker could abuse the code given known threats", ["It shortens the review", "It avoids the checklist", "It removes testing"], "Reviews become targeted."),
    Q("Secret rotation", "What is secret rotation?", "Periodically changing credentials such as API keys and database passwords", ["Deleting the repository", "Copying secrets to email", "Encoding secrets in Base64"], "The old value becomes invalid."),
    Q("Secret rotation", "Why does rotation limit damage?", "A leaked secret quickly becomes invalid", ["It makes secrets shorter", "It hides the app", "It deletes logs"], "It shrinks the attacker's window."),
    Q("Secret rotation", "Which tool can automate secret rotation?", "HashiCorp Vault, AWS Secrets Manager or Azure Key Vault", ["A text editor", "A spreadsheet", "A paint program"], "Secrets managers support automation."),
    Q("Secret rotation", "When a secret is rotated, what must happen?", "All consumers of the secret must be updated", ["Only the developer is told", "Nothing else", "The old secret is posted publicly"], "Otherwise services break."),
    Q("Secret rotation", "What does least privilege mean for the rotation process?", "The rotating system has only the permissions needed to rotate", ["It is an administrator everywhere", "It can read all data", "It has no permissions"], "Limit blast radius."),
    Q("Secret rotation", "Which approach reads a secret from a Kubernetes-mounted secret?", "Open the mounted file such as /etc/secrets/db_password", ["Hardcode it in the image", "Print it to the log", "Send it by email"], "Secrets are mounted into the pod as files."),
    Q("Secret rotation", "Which AWS call retrieves a secret in code?", "get_secret_value from the Secrets Manager client", ["put_object", "create_bucket", "describe_instances"], "It returns the secret string."),
    Q("Secret rotation", "What is a benefit of a secrets manager over plain environment variables?", "Central access control, auditing and automated rotation", ["It is easier to forget", "It stores secrets in Git", "It disables logging"], "Environment variables lack these features."),
    Q("Configuration", "What does Policy as Code do for configuration assurance?", "Automatically checks and enforces configuration compliance, blocking insecure deployments", ["Writes the application", "Replaces the OS", "Prints policies on paper"], "Policies are enforced by code."),
    Q("Configuration", "Which tools define infrastructure so settings are versioned and reviewed?", "Terraform, Ansible, Puppet or Chef", ["Photoshop", "Excel", "Slack"], "Infrastructure as Code."),
    Q("Configuration", "What are CIS Benchmarks used for?", "Auditing configurations against recognised security baselines", ["Compressing images", "Naming servers", "Generating passwords"], "They provide secure configuration guides."),
    Q("Configuration", "Why are default configurations a concern?", "They are often insecure and need hardening", ["They are always perfect", "They cannot be changed", "They are encrypted"], "Patching configuration enforces a secure baseline."),
    Q("Configuration", "Why centralise configuration management?", "To push secure configurations and patches consistently across infrastructure", ["To hide logs", "To slow deployments", "To avoid audits"], "Consistency prevents drift.")
  ],
  match: [
    M("Match the maintenance activity to its impact", "Maintenance.", [
      ["Patch management", "Prevents exploitation of known flaws"],
      ["Vulnerability management", "Finds and fixes weaknesses before attackers do"],
      ["Configuration management", "Prevents drift and accidental exposure"],
      ["Monitoring and incident response", "Rapid detection and response to threats"],
      ["Code reviews and audits", "Catches issues tools miss"],
      ["Threat intelligence", "Lets defences adapt to emerging threats"]]),
    M("Match the benefit to peer reviews or automated tools", "Human versus tool strengths.", [
      ["Business logic flaws", "Peer review"],
      ["Known vulnerable patterns at scale", "Automated tools"],
      ["Understanding of intent and context", "Peer review"],
      ["Consistent checks on every commit", "Automated tools"],
      ["Mentoring junior developers", "Peer review"],
      ["Authorisation design mistakes", "Peer review"]]),
    M("Match the secrets approach to how code gets the secret", "Secret retrieval concepts.", [
      ["HashiCorp Vault", "Request the secret through its API or client such as hvac"],
      ["AWS Secrets Manager", "Call get_secret_value through the AWS SDK"],
      ["Kubernetes Secret mounted as a file", "Read the file from the mount path in the pod"],
      ["Environment variable", "Read with os.getenv, simplest but limited"]]),
    M("Match the configuration practice to its goal", "Patching configurations.", [
      ["Infrastructure as Code", "Version-controlled, reviewable, repeatable configuration"],
      ["CIS Benchmark audit", "Compare settings to a recognised baseline"],
      ["Policy as Code (OPA)", "Block non-compliant configurations from deploying"],
      ["Centralised management", "Push consistent secure configuration everywhere"]])
  ],
  order: [
    O("Order a secret rotation done safely", "A sensible sequence.", [
      "Generate the new secret in the secrets manager",
      "Distribute the new value to all consuming applications",
      "Verify each consumer works with the new secret",
      "Revoke the old secret",
      "Record the rotation and schedule the next one"])
  ],
  open: [
    E("Explain how continuous maintenance keeps an application's security healthy.", [
      "Patching closes known flaws, vulnerability management finds new ones, and configuration management stops drift.",
      "Monitoring and incident response detect and contain attacks. Reviews catch what tools miss, and threat intelligence keeps defences current.",
      "Together they keep security healthy as the threat landscape changes."]),
    E("Exercise 1: pair review. Describe a subtle flaw tools would miss and how a reviewer would catch it.", [
      "Example: a `/orders/<id>` endpoint checks that the user is logged in but not that the order belongs to them. A SAST tool sees valid code.",
      "A reviewer who knows the rules asks 'what stops user A reading user B's order?'.",
      "Fix: check ownership server-side (`order.user_id == current_user.id`) and return 403 or 404 otherwise.",
      "Give feedback constructively and explain the attack."],
      "Another example is a discount code that can be applied repeatedly. The fix is a server-side rule, not a code pattern."),
    E("Exercise 2: replace os.getenv with a secrets manager conceptually and explain the benefits.", [
      "Choose one: Vault via the API, AWS Secrets Manager via `get_secret_value`, or a Kubernetes secret mounted as a file.",
      "Replace `os.getenv(\"DB_PASSWORD\")` with a small `get_secret(name)` function that calls the chosen system.",
      "Benefits: central storage and access control, audit logs, automated rotation, short-lived or dynamic credentials, and fewer secrets sitting in process environments or deployment files."]),
    E("Exercise 3: explain Policy as Code in your own words and describe a scenario where it prevents a misconfiguration.", [
      "Policy as Code writes security and compliance rules as version-controlled, executable code that is evaluated automatically.",
      "In a pipeline it evaluates infrastructure definitions before deployment and blocks anything non-compliant.",
      "Scenario: a developer defines a public S3 bucket. The policy flags it, the pipeline fails, and the bucket is never created. This provides continuous assurance without manual checking."]),
    E("Why rotate secrets, and what makes rotation hard in practice?", [
      "Rotation limits how long a leaked secret is valid and reduces the chance of discovery or brute force.",
      "It is hard because every consumer must update at the same time, so you need automation and coordination.",
      "Prefer dynamic short-lived credentials where possible."]),
    E("What makes a security-focused peer review effective?", [
      "Reviewers with security knowledge using a checklist and the threat model.",
      "Review all changes, look for anti-patterns, check configuration.",
      "Give constructive feedback that educates."])
  ]
};
