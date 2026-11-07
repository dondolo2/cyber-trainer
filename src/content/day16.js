import { Q, M, E, O } from "../lib/helpers.js";

export default {
  id: 16, day: 16, short: "Verification Phase", title: "Secure SDLC: Verification Phase",
  outcome: "Apply secure coding standards to real code, run static analysis inside the development workflow, and fix common flaws proactively.",
  theory: [
    { h: "The Verification Phase", p: [
        "The Secure SDLC builds security into every phase, from requirements to maintenance. The verification phase is where theory meets the real codebase. It is not enough to know secure coding. You must write secure code and then prove it with tools, reviews and tests.",
        "The approach is proactive: find and fix problems as early as possible using SAST, code review and dependency checks, so that developers become the main guardians of their application's security."],
      say: "Verification is where I prove my code is secure instead of assuming it. I do it early, with tools and with reviews." },
    { h: "Applying secure coding standards", p: [
        "Secure coding standards are rules that prevent common vulnerabilities. They are often language and framework specific, and applying them consistently marks a mature team."],
      bullets: [
        "**Input validation and sanitisation**: never trust user input, validate on the server, use whitelisting and prepared statements (parameterised queries).",
        "**Output encoding**: encode all dynamic content for its context (HTML, URL, JavaScript, CSS) to stop XSS.",
        "**Error handling and logging**: custom error pages, generic messages for users, detailed internal logs, no stack traces to users and no sensitive data in logs.",
        "**Secrets management**: externalise all secrets and rotate them.",
        "**Authentication and authorisation**: strong authentication such as MFA, role-based access control, least privilege and secure session management.",
        "**Secure configuration**: secure by default, disable unnecessary services, remove default credentials, patch promptly. This follows the principle of least functionality.",
        "**Dependency management**: scan and update libraries, keep a **software bill of materials (SBOM)** and run SCA in CI/CD."],
      beyond: "An SBOM is a machine-readable inventory of every component in your software. Common formats are CycloneDX and SPDX. After incidents like Log4Shell, an SBOM lets a team answer 'are we using the affected library?' in minutes instead of days.",
      say: "I apply the standards as a set: validate in, encode out, handle errors safely, externalise secrets, enforce least privilege and keep dependencies current." },
    { h: "Example: a Flask greeting with several standards applied", p: [
        "The lesson shows a small Flask app that greets a user and applies standards to prevent XSS and log safely. The exact snippet was an image, so this is a representative version."],
      code: `import logging, re
from flask import Flask, request, render_template_string, abort
from markupsafe import escape

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
log = logging.getLogger("greeter")

NAME_RE = re.compile(r"[A-Za-z ]{1,40}")        # whitelist

@app.get("/greet")
def greet():
    name = request.args.get("name", "")
    if not NAME_RE.fullmatch(name):               # validate on the server
        log.warning("invalid_name length=%d", len(name))   # no raw input logged
        abort(400)
    # Jinja2 auto-escapes {{ name }}, escape() shown for clarity
    return render_template_string("<p>Hello, {{ name }}!</p>", name=escape(name))

@app.errorhandler(Exception)
def generic(err):
    log.exception("unhandled error")              # detail stays internal
    return "Something went wrong", 500`,
      say: "In one small route I validate with a whitelist, encode output, log without leaking, and return a generic error." },
    { h: "Running static analysis in the dev workflow", p: [
        "Shift-left means running SAST continuously while developing, not only as a CI gate. That gives immediate feedback when the code is still fresh in your mind."],
      bullets: [
        "**IDE plugins**: real-time warnings as you type, like a linter. Examples: SonarLint, ESLint extensions, Bandit integrations.",
        "**Pre-commit hooks**: run SAST on staged changes before a commit is allowed, so easily detectable flaws never reach the repository.",
        "**Local command-line scans**: run `bandit -r .` or `npx eslint .` on demand before pushing.",
        "**Benefits**: immediate feedback, reduced cost, better code quality and developer education through repeated exposure to flagged patterns."],
      code: `# .pre-commit-config.yaml (the pre-commit framework)
repos:
  - repo: https://github.com/PyCQA/bandit
    rev: 1.7.9          # pin to a release you have checked
    hooks:
      - id: bandit
        args: ["-ll"]   # report medium severity and above`,
      beyond: "The pre-commit snippet is my own illustration. Check the Bandit repository for the current release tag before using it, and note that hooks can be bypassed with `git commit --no-verify`, which is why the same scan must also run in CI.",
      say: "I run SAST in my IDE, in a pre-commit hook and in CI, because each layer catches what the previous one missed or skipped." },
    { h: "Fixing common flaws proactively", bullets: [
        "**Insecure input handling** (SQL injection, XSS, path traversal): server-side whitelisting, parameterised queries, contextual output encoding.",
        "**Hardcoded secrets**: move them to environment variables or a secrets manager and never commit them.",
        "**Verbose error messages**: generic messages for users, detailed logs internally.",
        "**Vulnerable dependencies**: run SCA (npm audit, pip-audit, OWASP Dependency-Check) and update to patched versions.",
        "**Broken authentication and session management**: strong password policies, MFA, secure token generation and invalidation, brute-force protection.",
        "**Missing security headers**: send `Content-Security-Policy`, `X-Content-Type-Options: nosniff` and `Strict-Transport-Security`."],
      code: `# Flask: add headers to every response
@app.after_request
def add_headers(resp):
    resp.headers["Content-Security-Policy"] = "default-src 'self'"
    resp.headers["X-Content-Type-Options"] = "nosniff"
    resp.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return resp`,
      beyond: "HSTS only makes sense on sites served over HTTPS, and a strict Content-Security-Policy usually needs tuning for your scripts and styles. Test it in the browser console before enforcing it.",
      say: "For each common flaw I know the standard fix, and I apply it as soon as it is found." },
    { h: "Developer accountability", bullets: [
        "**Understand security reports**: do not dismiss SAST findings. Learn why they were raised.",
        "**Prioritise security bugs** at the same level as functional bugs, or higher.",
        "**Keep learning**: new vulnerabilities and practices appear constantly."],
      say: "Security is not only a tool. It is ownership of my own code." }
  ],
  qs: [
    Q("Verification", "What is the main purpose of the verification phase of the Secure SDLC?", "To apply secure coding principles to the real codebase and validate that it is secure", ["To write the marketing plan", "To choose the project name", "To decommission the system"], "Knowing is not enough. You must do it and verify it."),
    Q("Verification", "Which approach characterises the verification phase?", "Proactively finding and fixing vulnerabilities as early as possible", ["Waiting for users to report bugs", "Testing only after release", "Skipping reviews to save time"], "Early fixes are cheaper."),
    Q("Verification", "Which activities does the verification phase include?", "SAST, code reviews and dependency checks", ["Branding and advertising", "Hardware purchasing", "Salary reviews"], "These find issues before release."),
    Q("Standards", "What is a secure coding standard?", "A set of rules and guidelines that prevent common vulnerabilities during coding", ["A legal contract", "A type of firewall", "A database engine"], "They are often language and framework specific."),
    Q("Standards", "Which standard applies to database interactions?", "Use prepared statements (parameterised queries)", ["Concatenate input into SQL", "Escape quotes by hand only", "Disable validation for speed"], "Parameters keep input as data."),
    Q("Standards", "Output encoding mainly prevents which vulnerability?", "Cross-site scripting (XSS)", ["SQL injection", "Brute force", "Buffer underflow"], "User data is displayed as data, not run as script."),
    Q("Standards", "Encoding should be chosen based on:", "The output context (HTML, URL, JavaScript, CSS)", ["The length of the text", "The user's browser colour", "The server's uptime"], "Each context treats different characters as special."),
    Q("Standards", "Which is the standard for error handling?", "Custom error pages for users and detailed errors only in internal logs", ["Show the stack trace to help users", "Show SQL errors on the page", "Hide all errors and never log"], "Users get generic messages and developers get detail."),
    Q("Standards", "The standard for secrets management says to:", "Externalise all secrets and rotate them", ["Hardcode them for speed", "Share them in chat", "Put them in the README"], "Never hardcode secrets."),
    Q("Standards", "Which pair belongs to the authentication and authorisation standard?", "Multi-factor authentication and role-based access control", ["Larger fonts and more colours", "Faster builds and smaller images", "Longer logs and bigger disks"], "Strong authentication plus least privilege."),
    Q("Standards", "What does the principle of least functionality say?", "Enable only the features and services that are needed", ["Enable everything by default", "Remove all logging", "Use only one server"], "Fewer features means a smaller attack surface."),
    Q("Standards", "What is an SBOM?", "A software bill of materials, an inventory of the components in your software", ["A secure boot mode", "A server backup option", "A source branch of master"], "It lets you find affected components quickly."),
    Q("Standards", "Which secure configuration step is correct?", "Remove default credentials and disable unnecessary services", ["Keep default passwords for convenience", "Leave all ports open", "Postpone patches for a year"], "Secure by default."),
    Q("Static analysis", "What does running SAST in the developer workflow mean?", "Running it continuously while developing, not only as a CI gate", ["Running it once a year", "Running it only on production", "Running it only on the final release"], "It is the heart of shift-left."),
    Q("Static analysis", "Which of these is an IDE-based SAST tool?", "SonarLint", ["Photoshop", "Excel", "Zoom"], "It gives real-time feedback as you type."),
    Q("Static analysis", "What is a pre-commit hook used for?", "Running checks such as SAST on staged changes before a commit is accepted", ["Deleting old commits", "Publishing to production", "Renaming branches"], "Bad code never enters the repository."),
    Q("Static analysis", "Why must the same scan also run in CI even with a pre-commit hook?", "Hooks can be bypassed or not installed, so CI is the enforced backstop", ["Hooks are illegal", "CI is faster than hooks", "Hooks only work on Windows"], "`git commit --no-verify` skips local hooks."),
    Q("Static analysis", "Which command runs Bandit on the current Python project recursively?", "bandit -r .", ["npm audit .", "pip install .", "eslint --bandit ."], "-r means recursive."),
    Q("Static analysis", "Which is a benefit of early SAST integration?", "Developers fix issues while the code is still fresh in their minds", ["Bugs fix themselves", "Code review is no longer needed", "Production never fails"], "Immediate feedback makes fixes quicker."),
    Q("Static analysis", "How does early SAST help developer education?", "Developers learn secure patterns by repeatedly meeting and fixing flagged issues", ["It hides issues from developers", "It replaces training entirely", "It only reports to managers"], "Feedback in context teaches."),
    Q("Fixing flaws", "What is the proactive fix for hardcoded secrets?", "Move them to environment variables or a secrets manager and never commit them", ["Rename the variable", "Encode them in Base64 in the code", "Add a comment saying not to use them"], "Base64 is not protection."),
    Q("Fixing flaws", "What is the proactive fix for vulnerable dependencies?", "Run SCA tools regularly and update to patched versions", ["Ignore audit warnings", "Delete the lock file", "Pin everything to the oldest version"], "Patches only help when applied."),
    Q("Fixing flaws", "Which header tells browsers not to guess the content type?", "X-Content-Type-Options: nosniff", ["Content-Length", "Accept-Language", "Cache-Control: no-store"], "It reduces MIME sniffing attacks."),
    Q("Fixing flaws", "Which header forces browsers to use HTTPS for a site?", "Strict-Transport-Security", ["Content-Encoding", "Server", "Referer"], "It is known as HSTS."),
    Q("Fixing flaws", "Which header restricts where scripts and other resources can load from?", "Content-Security-Policy", ["Content-Type", "Date", "ETag"], "It helps limit XSS impact."),
    Q("Fixing flaws", "Which is a fix for broken authentication?", "Strong password policy, MFA and secure session token invalidation", ["Longer session timeouts for everyone", "Sharing admin accounts", "Disabling lockouts"], "Layered controls on login and sessions."),
    Q("Fixing flaws", "A verbose error page shows a stack trace. What is the fix?", "Show a generic message to users and log the detail internally", ["Show more detail", "Turn on debug mode", "Email the trace to the user"], "Stack traces help attackers."),
    Q("Accountability", "How should a developer treat a SAST finding?", "Understand why it was flagged and learn from it, instead of dismissing it", ["Disable the rule immediately", "Wait for the security team to fix it", "Ignore it if the build passes"], "Accountability means ownership."),
    Q("Accountability", "How should security bugs be prioritised relative to functional bugs?", "With the same or higher priority", ["Always lower", "Only after release", "Never tracked"], "A security bug can cost more than a broken button."),
    Q("Accountability", "Why is continuous learning part of developer accountability?", "New vulnerabilities and best practices keep appearing", ["Because tools never change", "Because courses are free", "Because exams are annual"], "Threats evolve.")
  ],
  match: [
    M("Match the standard to the vulnerability it prevents", "Secure coding standards.", [
      ["Prepared statements", "SQL injection"],
      ["Contextual output encoding", "Cross-site scripting"],
      ["Generic errors with internal logs", "Information leakage"],
      ["Externalised secrets", "Credential exposure in source code"],
      ["Strong sessions and MFA", "Broken authentication"],
      ["Server-side whitelisting", "Malicious input reaching the system"],
      ["Security headers", "Missing browser-side protections"]]),
    M("Match the integration point to what it does", "Static analysis in the workflow.", [
      ["IDE plugin", "Real-time warnings as you type"],
      ["Pre-commit hook", "Scans staged changes before a commit is allowed"],
      ["Local command-line scan", "On-demand scan before pushing"],
      ["CI gate", "Enforced check that cannot be skipped locally"]]),
    M("Match the security header to its job", "Fixing missing headers.", [
      ["Content-Security-Policy", "Restricts where content and scripts can load from"],
      ["X-Content-Type-Options: nosniff", "Stops browsers guessing the content type"],
      ["Strict-Transport-Security", "Forces HTTPS for the site"]]),
    M("Match the common flaw to its proactive fix", "Proactive fixing.", [
      ["Hardcoded secrets", "Use environment variables or a secrets manager"],
      ["Verbose error messages", "Generic user messages and detailed internal logs"],
      ["Vulnerable dependencies", "SCA scans and updates"],
      ["Path traversal", "Whitelist names and keep paths inside a base directory"],
      ["Broken session management", "Secure token generation and invalidation"]])
  ],
  order: [
    O("Order the steps for verifying a new feature", "A sensible local workflow.", [
      "Write the code following the secure coding standards",
      "Let the IDE plugin flag issues as you type and fix them",
      "Run a local scan such as bandit -r . or npx eslint .",
      "Let the pre-commit hook check the staged changes",
      "Push so CI re-runs SAST and SCA as an enforced gate"])
  ],
  open: [
    E("Explain what the verification phase of the Secure SDLC is and why it matters.", [
      "It is where secure coding principles are applied to real code and checked with SAST, reviews and dependency scans.",
      "It matters because knowing the theory is not enough. Proof catches mistakes early, when they are cheapest to fix."]),
    E("Exercise 1: review a flawed comment-submission Flask snippet, list the weaknesses and refactor it.", [
      "Weaknesses: no length or character validation, raw comment echoed into HTML (XSS), no error handling, and error messages or stack traces that may reveal internals.",
      "Refactor: whitelist with a regex such as letters, digits, spaces and basic punctuation up to 200 characters, and reject anything else with a 400 and a generic message.",
      "Encode the comment on output (auto-escaping template or `markupsafe.escape`).",
      "Handle errors with a custom handler that logs detail internally and returns a generic message.",
      "Make sure the error messages never include the raw input or system details."],
      "The exact snippet is in your GitLab repo. Use the same four-part answer: weaknesses, validation, encoding, error handling."),
    E("Exercise 2: describe how you would scan and fix issues with Bandit, ESLint security or SonarLint.", [
      "Create a small project with deliberate flaws: `eval(input())`, a hardcoded password, an `assert` used for a security check, or `document.write(user_input)`.",
      "Run `bandit -r .` or `npx eslint .`, or watch the SonarLint warnings in the editor.",
      "Fix each: replace eval with safe parsing, load the password from an environment variable, replace assert with a real check and exception, and use safe DOM APIs instead of document.write.",
      "Re-run the scan to confirm the warnings are gone."],
      "`assert` statements are removed when Python runs with the -O flag, so a security check written as an assert silently disappears."),
    E("Exercise 3: update outdated or vulnerable dependencies and describe what you found.", [
      "Node: `npm audit` and `npm outdated`. Python: `pip-audit` and `pip list --outdated`.",
      "Identify vulnerable or significantly outdated packages.",
      "Update with `npm update <package>` or `pip install --upgrade <package>`, then re-scan.",
      "Note challenges: breaking changes in major versions, conflicting version requirements, and the need to re-run tests."]),
    E("Name four secure coding standards and the flaw each prevents.", [
      "Parameterised queries prevent SQL injection.",
      "Contextual output encoding prevents XSS.",
      "Externalised secrets prevent credential exposure.",
      "Generic error messages with internal logging prevent information leakage."]),
    E("Why run static analysis in the IDE and pre-commit hooks as well as CI?", [
      "Earlier feedback is faster to act on and cheaper to fix.",
      "Hooks and IDE checks can be skipped, so CI remains the enforced gate.",
      "Together they build secure habits and catch problems before they spread."]),
    E("What does developer accountability for security mean in practice?", [
      "Understanding and learning from security reports instead of dismissing them.",
      "Treating security bugs with the same or higher priority as functional bugs.",
      "Staying up to date on new vulnerabilities and best practices."])
  ]
};
