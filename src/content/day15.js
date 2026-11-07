import { Q, M, E, O } from "../lib/helpers.js";

export default {
  id: 15, day: 15, short: "SAST & DAST", title: "Static and Dynamic Code Analysis",
  outcome: "Explain how SAST and DAST differ, run basic tools such as Bandit and ESLint security rules, interpret findings, and explain what automated tools miss.",
  theory: [
    { h: "Why we test code for security", p: [
        "Writing secure code is the first defence. Testing is how you check that you actually succeeded. Automated analysis finds common mistakes quickly and consistently, so humans can spend their time on the hard problems."],
      bullets: [
        "**Static analysis (SAST)** examines source code or compiled code without running it.",
        "**Dynamic analysis (DAST)** tests a running application from the outside, as an attacker would.",
        "**Both fit the shift-left idea**: run them in CI/CD so every change is checked."],
      say: "SAST reads the code. DAST attacks the running app. They find different problems, so mature teams use both." },
    { h: "Static Application Security Testing (SAST)", p: [
        "SAST scans code for patterns that indicate vulnerabilities, such as string-built SQL, hardcoded passwords, dangerous functions and weak cryptography."],
      bullets: [
        "**When**: early, on the developer's machine and on every commit or pull request.",
        "**Strengths**: finds issues before the app runs, points to the exact file and line, covers all code paths including rarely used ones, and is cheap to fix at this stage.",
        "**Weaknesses**: false positives (reports problems that are not real), false negatives (misses real ones), cannot see runtime configuration or deployed environment, and is language-specific.",
        "**Typical findings**: hardcoded secrets, use of `eval`, SQL concatenation, weak hashes such as MD5, insecure random numbers."],
      say: "SAST gives fast, early, line-level feedback, but it needs triage because it produces false positives and cannot see the running system." },
    { h: "Dynamic Application Security Testing (DAST)", p: [
        "DAST interacts with a running application, sending crafted requests and watching responses, without seeing the source code. It behaves like an automated attacker."],
      bullets: [
        "**When**: against a test or staging environment, and sometimes on a schedule against production.",
        "**Strengths**: finds real, exploitable issues, finds problems in configuration and deployment (headers, exposed endpoints, server settings), and is language-independent.",
        "**Weaknesses**: runs later, cannot point to the exact code line, only tests what it can reach, and can miss deep logic issues.",
        "**Typical findings**: reflected XSS, missing security headers, insecure cookies, exposed admin pages, verbose errors."],
      beyond: "OWASP ZAP is a well-known open-source DAST tool. There is also IAST (interactive testing with an agent inside the running app) and SCA for dependencies. Treat SAST, DAST and SCA as complementary layers.",
      say: "DAST proves what an outside attacker can really do to the running system, but it arrives late and does not show the code line." },
    { h: "SAST versus DAST", bullets: [
        "**Access**: SAST sees the code (white box). DAST sees only behaviour (black box).",
        "**Timing**: SAST early in development. DAST once something runs.",
        "**Location of the problem**: SAST gives file and line. DAST gives URL and request.",
        "**Coverage**: SAST can cover all code paths. DAST only what it reaches.",
        "**Environment issues**: SAST cannot see them. DAST can.",
        "**Noise**: SAST has more false positives on code patterns. DAST findings are usually exploitable but may miss things."] },
    { h: "Hands-on tools", bullets: [
        "**Bandit** (Python SAST): scans Python files for common security issues and gives severity and confidence ratings.",
        "**ESLint with `eslint-plugin-security`** (JavaScript SAST): flags risky patterns such as `eval`, unsafe regular expressions and non-literal file system paths.",
        "**OWASP Dependency-Check, npm audit, pip-audit**: dependency scanning (see Lesson 14).",
        "**OWASP ZAP**: DAST against a running web app."],
      code: `# Python: scan a project folder recursively
pip install bandit
bandit -r ./app

# JavaScript: add security rules to ESLint
npm install --save-dev eslint eslint-plugin-security
npx eslint .

# Example finding Bandit raises:
#   Issue: [B608] Possible SQL injection via string-based query construction
#   Severity: Medium   Confidence: Low
#   Location: app/db.py:42`,
      beyond: "Always read both **severity** and **confidence**. A high-severity, low-confidence finding may be a false positive that needs a human check, while a high-high one deserves attention first.",
      say: "I can run Bandit and ESLint with the security plugin, read severity and confidence, and decide which findings are real." },
    { h: "Interpreting results and what tools miss", bullets: [
        "**Triage every finding**: confirm, fix, or document why it is a false positive.",
        "**Fix by root cause**: replace the pattern, for example use a parameterised query. Do not just silence the warning.",
        "**Re-run the tool** to confirm the fix, and keep it in CI so the issue cannot return.",
        "**Business logic flaws** are hard for automated tools: for example a discount that can be applied twice, or a user editing another user's order by changing an ID. The tool does not know your rules.",
        "**Design flaws** need threat modelling and review.",
        "**A clean scan is not proof of security**: tools only find what they know how to recognise.",
        "**Add human review**: peer code review and manual testing cover what automation cannot."],
      beyond: "Broken access control is number one in OWASP Top 10:2025 and is a good example of an area where automated tools do poorly, because deciding who should be allowed to do what requires understanding the application's purpose.",
      say: "Tools find patterns. Humans find intent problems. I use both, and I never treat a clean scan as proof." }
  ],
  qs: [
    Q("Basics", "What does SAST stand for?", "Static Application Security Testing", ["Secure Application Session Testing", "System Access Security Tracking", "Static Access Source Tool"], "It analyses code without running it."),
    Q("Basics", "What does DAST stand for?", "Dynamic Application Security Testing", ["Data Access Security Tool", "Dynamic Access Source Testing", "Dual Application Scan Test"], "It tests the running application."),
    Q("Basics", "Which technique examines source code without executing it?", "SAST", ["DAST", "Load testing", "Penetration of a live server"], "Static means not running."),
    Q("Basics", "Which technique tests a running application from the outside?", "DAST", ["SAST", "Code formatting", "Linting only"], "It behaves like an attacker."),
    Q("Basics", "Why run security analysis in CI/CD?", "Every change is checked automatically, supporting shift-left", ["It deletes old code", "It removes all bugs", "It replaces code review"], "Early, consistent feedback."),
    Q("SAST", "When is SAST most useful?", "Early, during coding and on every commit or pull request", ["Only after release", "Only in production", "Never"], "Early fixes are cheaper."),
    Q("SAST", "What does SAST report?", "The file and line where a risky pattern appears", ["The attacker's IP address", "The server's CPU load", "Live network traffic"], "It works from the code."),
    Q("SAST", "A SAST tool flags a vulnerability that is not real. This is a:", "False positive", ["False negative", "True positive", "True negative"], "It reported a problem that does not exist."),
    Q("SAST", "A SAST tool misses a real vulnerability. This is a:", "False negative", ["False positive", "True positive", "True negative"], "It failed to report a real problem."),
    Q("SAST", "Which is a limitation of SAST?", "It cannot see runtime configuration or the deployed environment", ["It cannot read source code", "It only works after release", "It needs an attacker"], "The code is analysed in isolation."),
    Q("SAST", "Which finding would SAST typically catch?", "A hardcoded password in source code", ["A missing HTTP security header on the live server", "An exposed admin page on staging", "A misconfigured firewall"], "Pattern in code versus deployment issue."),
    Q("SAST", "Use of `eval()` on user input is likely to be flagged by:", "SAST", ["DAST only", "Neither tool", "Load testing"], "It is a recognisable dangerous pattern."),
    Q("DAST", "When can DAST run?", "Once the application is running, in a test or staging environment", ["Before any code exists", "Only on paper", "Only on a developer's keyboard"], "It needs something to attack."),
    Q("DAST", "Which finding is DAST well suited to?", "Missing security headers and insecure cookies on the running app", ["Unused variables", "A hardcoded password in a file", "A weak variable name"], "They are visible in responses."),
    Q("DAST", "Which is a weakness of DAST?", "It cannot point to the exact line of vulnerable code", ["It needs source code access", "It cannot find XSS", "It only works offline"], "It sees behaviour, not code."),
    Q("DAST", "Is DAST language-independent?", "Yes, it tests the running app regardless of the language it is written in", ["No, only Python", "No, only Java", "No, only C"], "It interacts over HTTP."),
    Q("DAST", "Which open-source tool is a well-known DAST scanner?", "OWASP ZAP", ["Bandit", "ESLint", "npm audit"], "ZAP attacks a running web application."),
    Q("Comparison", "Which pair is correct?", "SAST is white-box (sees code). DAST is black-box (sees behaviour)", ["SAST is black-box. DAST is white-box", "Both are black-box", "Both need a running app"], "Source access is the key difference."),
    Q("Comparison", "Why do teams use both SAST and DAST?", "They find different kinds of problems", ["They find exactly the same problems", "One replaces human review", "They are required by Git"], "They are complementary."),
    Q("Comparison", "Which problem is only likely to be found by DAST?", "A production server exposing an admin panel or verbose errors due to misconfiguration", ["An unused import", "A hardcoded key in a source file", "A commented-out function"], "It depends on the deployed environment."),
    Q("Tools", "What does Bandit analyse?", "Python source code for common security issues", ["JavaScript packages", "Network packets", "Running web servers"], "It is a Python SAST tool."),
    Q("Tools", "Which command runs Bandit recursively on a folder?", "bandit -r ./app", ["npm audit ./app", "pip-audit ./app", "eslint --python ./app"], "-r means recursive."),
    Q("Tools", "What does eslint-plugin-security add to ESLint?", "Rules that flag risky JavaScript patterns such as eval and unsafe file paths", ["A web server", "A database", "A password manager"], "It makes ESLint a basic security linter."),
    Q("Tools", "Which tool checks dependencies, not your own code patterns?", "npm audit", ["Bandit", "ESLint with security plugin", "OWASP ZAP"], "It is SCA, not SAST."),
    Q("Tools", "A Bandit finding is High severity but Low confidence. What should you do?", "Review it manually, since it could be a false positive", ["Ignore it forever", "Delete the file", "Disable Bandit"], "Check both severity and confidence."),
    Q("Tools", "Bandit reports possible SQL injection from string-based query construction. What is the right fix?", "Use a parameterised query", ["Add a comment saying it is safe", "Rename the variable", "Increase the log level"], "Fix the root cause, not the warning."),
    Q("Interpreting", "After fixing a finding, what next?", "Re-run the tool to confirm, and keep the scan in CI", ["Delete the report", "Never scan again", "Disable the rule"], "Verification and prevention."),
    Q("Interpreting", "Which type of flaw is hardest for automated scanners?", "Business logic flaws, such as applying a discount twice or editing another user's order by changing an ID", ["Use of eval", "Hardcoded secrets", "Outdated library versions"], "Tools do not know your business rules."),
    Q("Interpreting", "A scan reports zero findings. What is the correct conclusion?", "Nothing the tool knows about was found, but the app is not proven secure", ["The app is secure", "The tool is broken", "No review is needed"], "Absence of findings is not proof."),
    Q("Interpreting", "Why combine automated tools with peer code review?", "Reviewers catch intent, logic and design problems tools cannot", ["Reviewers are faster", "Tools cannot read code", "Review replaces testing"], "Humans cover what automation misses."),
    Q("Interpreting", "Which is the best response to a false positive?", "Document why it is not an issue and suppress it narrowly with a comment, not disable the whole rule", ["Disable all rules", "Stop using the tool", "Ignore every future finding"], "Keep the signal for real issues.")
  ],
  match: [
    M("SAST or DAST?", "Which technique fits each description?", [
      ["Reads source code without running it", "SAST"],
      ["Sends crafted requests to a running app", "DAST"],
      ["Reports the file and line number", "SAST"],
      ["Finds missing security headers on a live server", "DAST"],
      ["Runs early on every commit", "SAST"],
      ["Language-independent black-box testing", "DAST"]]),
    M("Match the tool to its category", "Security tooling.", [
      ["Bandit", "SAST for Python"],
      ["ESLint with eslint-plugin-security", "SAST for JavaScript"],
      ["OWASP ZAP", "DAST for web apps"],
      ["npm audit", "Dependency scanning for npm"],
      ["pip-audit", "Dependency scanning for Python"],
      ["OWASP Dependency-Check", "Multi-language dependency scanning"]]),
    M("Match the term to its meaning", "Interpreting results.", [
      ["False positive", "The tool reports a problem that is not real"],
      ["False negative", "A real problem the tool did not report"],
      ["Severity", "How damaging the issue could be"],
      ["Confidence", "How sure the tool is that the finding is real"],
      ["Triage", "Deciding whether each finding is real and what to do"],
      ["Business logic flaw", "A rules problem that tools rarely detect"]])
  ],
  order: [
    O("Order a practical scan-and-fix workflow", "From first step to last.", [
      "Run the SAST tool on the code",
      "Triage each finding: real or false positive",
      "Fix real issues at the root cause",
      "Re-run the tool to confirm the fix",
      "Add the scan to CI so it runs on every change"])
  ],
  open: [
    E("Explain the difference between SAST and DAST, and when you would use each.", [
      "SAST analyses source code without running it. It is used early and gives file and line results.",
      "DAST tests the running application from outside, finding runtime and configuration issues.",
      "Use SAST on every commit and DAST on staging or scheduled runs. They complement each other."]),
    E("Exercise: run Bandit on a Python project and explain two findings.", [
      "Command: `bandit -r ./app`.",
      "Example finding 1: possible SQL injection from string-built queries. Fix with parameterised queries.",
      "Example finding 2: hardcoded password or use of a weak hash like MD5. Fix by loading secrets from the environment and using a modern password hash.",
      "For each, explain severity and confidence, why it matters and how you verified the fix by re-running."],
      "Use your own repository results and keep the pattern: finding, risk, fix, re-run."),
    E("Exercise: run ESLint with eslint-plugin-security and describe what it flags.", [
      "Install `eslint` and `eslint-plugin-security`, enable the plugin in the ESLint config and run `npx eslint .`.",
      "It flags patterns such as eval, non-literal file system paths and potentially unsafe regular expressions.",
      "Review each, fix the real ones and re-run."]),
    E("Why can automated tools miss security flaws? Give examples.", [
      "Tools match known patterns and do not understand intent or business rules.",
      "Business logic flaws, such as applying a discount twice or accessing another user's data by changing an ID, look like normal code.",
      "Design flaws and complex multi-step attacks need threat modelling, peer review and manual testing.",
      "A clean scan is therefore not proof of security."]),
    E("What are false positives and false negatives, and how do you deal with them?", [
      "False positive: a reported issue that is not real. Triage, document and suppress narrowly.",
      "False negative: a real issue not reported. Reduce risk by using several tools, DAST, code review and manual testing."]),
    E("Describe how you would add security analysis to a CI/CD pipeline.", [
      "On every commit or pull request: run SAST (Bandit or ESLint security rules) and dependency checks (npm audit or pip-audit).",
      "Fail the build on high severity findings, and track the rest.",
      "On staging: run DAST such as OWASP ZAP.",
      "Review findings regularly and combine with peer review."])
  ]
};
