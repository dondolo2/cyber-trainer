import { Q, M, E, O } from "../lib/helpers.js";

export default {
  id: 13, day: 13, short: "Errors, Logs & Secrets", title: "Error Handling, Logging and Secrets",
  outcome: "Handle errors safely without leaking internals, log useful events without leaking sensitive data, and keep secrets out of source code.",
  theory: [
    { h: "Safe error handling", p: [
        "Errors are inevitable. What matters is what the user sees and what the team records. An unhandled error can show a stack trace, file paths, framework versions, SQL fragments or even credentials. That is an exposure: it does not break the app by itself, but it gives an attacker a map."],
      bullets: [
        "**Show users a generic message**: 'Something went wrong. Please try again.' with perhaps a reference ID.",
        "**Record the detail internally**: stack trace, request ID and context go to the log, not to the browser.",
        "**Fail securely**: when something breaks, deny access by default. Never fall back to 'allow'.",
        "**Handle exceptions deliberately**: catch specific errors, clean up resources and avoid empty catch blocks that hide problems.",
        "**Turn off debug mode in production**: framework debug pages expose source code and environment variables.",
        "**Keep messages consistent**: different messages for 'user not found' and 'wrong password' help attackers enumerate accounts."],
      code: `from flask import Flask, jsonify
import uuid

app = Flask(__name__)

@app.errorhandler(Exception)
def handle_unexpected(err):
    ref = uuid.uuid4().hex[:8]
    # Full detail stays on the server
    app.logger.exception("Unhandled error ref=%s", ref)
    # The user only gets a generic message and a reference
    return jsonify(error="Something went wrong", ref=ref), 500`,
      beyond: "OWASP Top 10:2025 added a category called **A10: Mishandling of Exceptional Conditions**. Poor error handling is now a top-level risk, not just a logging detail. Failing open (granting access when a check throws) is the classic example.",
      say: "I give users a generic message and a reference ID, and I keep the technical detail in the logs. When something fails, my code denies by default." },
    { h: "Secure logging", p: [
        "Logs are how you detect attacks, investigate incidents and prove what happened. They need to be useful enough to answer who, what, when and where, and safe enough that they do not become a second database of secrets."],
      bullets: [
        "**Log security-relevant events**: logins (success and failure), access control failures, input validation failures, privilege changes, and administrative actions.",
        "**Include context**: timestamp (with timezone), user or account ID, source IP, action, outcome and a request ID.",
        "**Never log**: passwords, tokens, API keys, session IDs, full card numbers, national ID numbers or other personal data you do not need.",
        "**Mask or truncate** when you must reference sensitive values, for example the last four digits only.",
        "**Protect the logs**: restrict access, keep them tamper-evident and ship them to a central place so an attacker cannot simply delete them.",
        "**Prevent log injection**: user-controlled text containing newlines can forge fake log lines, so encode or strip control characters.",
        "**Monitor and alert**: logs nobody reads do not help. Alert on repeated failed logins or unusual access."],
      code: `# Bad: leaks a password and invites log forging
logger.info("Login attempt user=" + username + " password=" + password)

# Better: no secret, structured, with an outcome
logger.warning("login_failed user_id=%s ip=%s request_id=%s",
               user_id, client_ip, request_id)`,
      beyond: "OWASP Top 10:2025 renamed A09 to **Security Logging and Alerting Failures**. The word 'alerting' matters: collecting logs is not enough if no one is notified when something suspicious happens.",
      say: "I log events that help detect and investigate attacks, I never log secrets or unnecessary personal data, and I make sure someone is alerted when the logs show something wrong." },
    { h: "Reviewing a log for leaks", p: [
        "The lesson exercise gives you sample log entries and asks you to find what should not be there. Use this checklist when you read any log line."],
      bullets: [
        "Does it contain a **password, token, API key or session ID**?",
        "Does it contain **personal data** (full email, ID number, card number, phone number) that is not necessary?",
        "Does it show a **stack trace or internal path** that would help an attacker if logs are ever exposed?",
        "Does it include **raw user input** that could forge entries?",
        "Does it lack **who, what, when**, so it is useless in an investigation?"],
      beyond: "The sample log entries from the lesson were not included in the text I received, so the questions here use typical examples such as a line containing `password=...` or `Authorization: Bearer ...`.",
      say: "I read logs as an attacker would: what here would I want to steal, and as an investigator: what is missing?" },
    { h: "Secrets management", p: [
        "A secret is any value that grants access: passwords, API keys, database connection strings, private keys, tokens and certificates. Secrets in source code are one of the most common and most damaging mistakes, because code is copied, shared, pushed to repositories and kept in history forever."],
      bullets: [
        "**Never hardcode secrets** in source files, config files committed to Git, or front-end code.",
        "**Use environment variables** as the simple baseline, and a **secrets manager** (for example HashiCorp Vault, AWS Secrets Manager or Azure Key Vault) for real systems.",
        "**Keep secrets out of version control**: add `.env` to `.gitignore` and scan commits for secrets.",
        "**Least privilege**: give each key only the permissions it needs.",
        "**Rotate regularly** and immediately after any suspected leak.",
        "**Separate secrets per environment**: development, testing and production must never share keys.",
        "**If a secret is committed, treat it as compromised**: revoke and rotate it. Deleting it in a later commit does not remove it from Git history."],
      code: `import os

# Bad: hardcoded secret
API_KEY = "sk_live_51H...."

# Good: read from the environment and fail loudly if missing
API_KEY = os.environ.get("EXTERNAL_API_KEY")
if not API_KEY:
    raise RuntimeError("EXTERNAL_API_KEY is not set")

# In the shell, before starting the app:
#   export EXTERNAL_API_KEY="your-key-here"`,
      beyond: "Environment variables are better than hardcoding, but they are not perfect: they can leak through crash dumps, child processes and debug pages. Also, Kubernetes Secrets are only base64-encoded by default, which is not encryption, so enable encryption at rest or use an external secrets manager.",
      say: "Secrets never go in code. I load them from the environment or a secrets manager, I use least privilege, I rotate them, and if one leaks I revoke it immediately." }
  ],
  qs: [
    Q("Errors", "What should users see when an unexpected error occurs?", "A generic message, optionally with a reference ID", ["The full stack trace", "The SQL query that failed", "The server file path"], "Details help attackers and confuse users."),
    Q("Errors", "Where should the technical detail of an error go?", "Into internal logs", ["Into the HTML response", "Into the page title", "Into a public GitHub issue"], "Developers need it, users and attackers do not."),
    Q("Errors", "Why are verbose error messages a security problem?", "They reveal internal details that help attackers plan attacks", ["They slow the server", "They break the database", "They stop logging"], "They are an exposure."),
    Q("Errors", "What does 'fail securely' mean?", "When something breaks, the system denies access by default", ["Restart the server on every error", "Show the error to the admin only", "Ignore the error and continue"], "Failing open can grant access by accident."),
    Q("Errors", "An authorisation check throws an exception and the code continues as if the user were allowed. This is:", "Failing open, a serious flaw", ["Good resilience", "A logging feature", "Output encoding"], "The default must be deny."),
    Q("Errors", "Why is an empty catch block dangerous?", "It hides failures, so problems and attacks go unnoticed", ["It uses too much memory", "It forces a restart", "It encrypts the error"], "Handle or log errors deliberately."),
    Q("Errors", "Why turn off debug mode in production?", "Debug pages can expose source code, configuration and environment variables", ["It makes pages prettier", "It speeds up the network", "It is required by HTTP"], "Debug output is for developers only."),
    Q("Errors", "Messages like 'user not found' versus 'wrong password' enable what?", "Account enumeration", ["Buffer overflow", "SQL injection", "Clickjacking"], "Use one generic 'invalid credentials' message."),
    Q("Errors", "What is the purpose of a reference ID shown to the user with a generic error?", "It lets support find the matching detailed log entry", ["It encrypts the error", "It logs the user out", "It blocks the attacker"], "The user gets a handle, and the detail stays internal."),
    Q("Errors", "Which OWASP Top 10:2025 category covers poor handling of unexpected failures?", "A10: Mishandling of Exceptional Conditions", ["A03: Software Supply Chain Failures", "A04: Cryptographic Failures", "A05: Injection"], "It is a new category in the 2025 list."),
    Q("Logging", "Which event should always be logged?", "Failed login attempts", ["The user's password", "The full credit card number", "Nothing"], "They help detect brute force attacks."),
    Q("Logging", "Which of these must NEVER be written to logs?", "Passwords and API keys", ["Timestamps", "Request IDs", "Failed login outcomes"], "Logs have a wider audience than the database."),
    Q("Logging", "Which fields make a log entry useful for investigation?", "Timestamp, user ID, source IP, action and outcome", ["Only the user's password", "Only the server name", "A random number"], "They answer who, what, when and where."),
    Q("Logging", "If you must reference a card number in a log, you should:", "Mask or truncate it, for example keep only the last four digits", ["Log the full number for accuracy", "Encode it in Base64", "Email it to yourself"], "Masking limits damage if logs leak."),
    Q("Logging", "What is log injection?", "An attacker puts newlines or control characters in input to forge fake log entries", ["Writing logs to a database", "Compressing logs", "Rotating logs daily"], "Encode or strip control characters."),
    Q("Logging", "Why ship logs to a central location?", "An attacker who compromises one server cannot easily erase the evidence", ["Logs are smaller there", "It removes the need for alerting", "It makes logs public"], "It also helps correlate events."),
    Q("Logging", "Why do logs need alerting and monitoring?", "Logs nobody reads do not help detect attacks", ["Alerts make logs shorter", "It is a legal formality", "It prevents all attacks"], "OWASP now calls this 'Logging and Alerting Failures'."),
    Q("Logging", "Which log line is a problem? `INFO login ok user=amy token=eyJhbGciOi...`", "It logs an authentication token", ["It has a user name", "It says INFO", "It says login"], "A leaked log would give access to the account."),
    Q("Logging", "Which log line is a problem? `ERROR db failed at /srv/app/db.py line 88 password=Winter2026!`", "It leaks a credential and internal paths", ["It has an ERROR level", "It mentions a database", "It has a line number"], "Credentials must never appear in logs."),
    Q("Logging", "A log line says only `error`. What is the main weakness?", "It lacks who, what and when, so it is useless for investigation", ["It is too detailed", "It encrypts data", "It uses the wrong colour"], "Logs need context."),
    Q("Logging", "Who should be able to read application logs?", "Only authorised staff who need them", ["Every user of the app", "Anyone on the internet", "All developers and contractors without limit"], "Logs can contain sensitive operational detail."),
    Q("Secrets", "Which of these is a secret?", "An API key, a database password or a private key", ["The application name", "A public page title", "The CSS file"], "Secrets grant access."),
    Q("Secrets", "Why is hardcoding a secret in source code dangerous?", "Code is shared, copied and kept in version history, so the secret spreads", ["It makes the code slower", "It breaks compilation", "It increases memory use"], "Anyone with the repo has the secret."),
    Q("Secrets", "What is the baseline way to supply a secret to an app without hardcoding?", "Read it from an environment variable", ["Write it in a comment", "Put it in the README", "Put it in the URL"], "A secrets manager is better for real systems."),
    Q("Secrets", "`os.environ.get(\"EXTERNAL_API_KEY\")` followed by a RuntimeError if it is missing does what?", "Loads the secret from the environment and fails loudly when it is absent", ["Hardcodes the key", "Prints the key", "Sends the key to the user"], "Failing early avoids running without the key."),
    Q("Secrets", "A developer accidentally commits an API key, then deletes it in the next commit. What should happen?", "Treat the key as compromised, revoke it and issue a new one", ["Nothing, it is deleted", "Rename the file", "Wait a week"], "Git history keeps the old commit."),
    Q("Secrets", "Which file should be listed in `.gitignore` to avoid committing secrets?", ".env", ["README.md", "package.json", "index.html"], "It usually holds local secrets."),
    Q("Secrets", "What does least privilege mean for API keys?", "A key has only the permissions it needs", ["Every key is an admin key", "Keys never expire", "Keys are shared among all developers"], "A leaked key then does less damage."),
    Q("Secrets", "Why use different secrets for development and production?", "A leak in development must not expose production", ["It is easier to type", "It is a style rule", "It speeds up builds"], "Separate environments, separate keys."),
    Q("Secrets", "Which is an example of a secrets manager?", "HashiCorp Vault, AWS Secrets Manager or Azure Key Vault", ["A spreadsheet", "A sticky note", "A chat channel"], "They provide access control, auditing and rotation."),
    Q("Secrets", "Why rotate secrets regularly?", "It limits how long a leaked secret stays useful", ["It makes them longer", "It makes the app faster", "It removes the need for logging"], "Rotation reduces the window of abuse.")
  ],
  match: [
    M("Match the practice to its reason", "Error handling.", [
      ["Generic user-facing message", "Avoids revealing internals to attackers"],
      ["Detailed server-side log", "Lets developers diagnose the problem"],
      ["Fail securely", "Denies access when a check breaks"],
      ["Debug mode off", "Prevents exposure of code and environment variables"],
      ["Reference ID", "Links a user report to a log entry"],
      ["Same message for all login failures", "Prevents account enumeration"]]),
    M("Should it be logged?", "Decide for each item.", [
      ["Failed login with user ID and IP", "Yes"],
      ["Plain-text password", "Never"],
      ["Access control failure", "Yes"],
      ["Session token", "Never"],
      ["Privilege change by an admin", "Yes"],
      ["Full card number", "Never (mask it)"]]),
    M("Match the secrets rule to its purpose", "Secrets management.", [
      ["Environment variable or secrets manager", "Keeps secrets out of source code"],
      [".gitignore for .env", "Stops local secrets being committed"],
      ["Least privilege", "Limits damage if a key leaks"],
      ["Rotation", "Shortens the useful life of a leaked secret"],
      ["Separate keys per environment", "Contains a leak to one environment"],
      ["Revoke after a commit leak", "Deleting the line does not clear Git history"]])
  ],
  order: [
    O("Order the response to a secret committed to Git", "A sensible sequence.", [
      "Treat the secret as compromised immediately",
      "Revoke or disable the exposed key",
      "Issue a new secret and store it in a secrets manager or environment variable",
      "Check logs for use of the old key",
      "Remove it from the code and add scanning to prevent a repeat"])
  ],
  open: [
    E("Explain how to handle errors safely in a web application.", [
      "Show a generic message with a reference ID to users.",
      "Log the full detail internally.",
      "Fail securely: deny access on any failure.",
      "Disable debug mode in production and avoid empty catch blocks.",
      "Use consistent messages to avoid leaking whether an account exists."]),
    E("Review this log line and explain what is wrong: `INFO 2026-10-30 login user=amy password=Summer2026 ip=10.0.0.4`.", [
      "It logs a plain-text password, which must never be recorded.",
      "Anyone with log access, or an attacker who reads the logs, gets the credential.",
      "Fix: remove the password and log only user ID, outcome, IP and timestamp.",
      "Also consider rotating the exposed password."],
      "The exercise log samples are in your GitLab repo. Use the checklist: secrets, personal data, stack traces, raw input, missing context."),
    E("What should a good security log contain, and what should it never contain?", [
      "Contain: timestamp, user ID, source IP, action, outcome and request ID, for logins, access failures, validation failures and admin actions.",
      "Never contain: passwords, tokens, API keys, session IDs, full card numbers, or unnecessary personal data.",
      "Protect and centralise logs, and alert on suspicious patterns."]),
    E("Explain how to manage an API key securely in a Python application.", [
      "Do not hardcode it. Read it with os.environ.get and raise an error if missing.",
      "Set it outside the code, for example `export EXTERNAL_API_KEY=...`, or use a secrets manager in production.",
      "Add .env to .gitignore, use least privilege, separate keys per environment and rotate regularly."]),
    E("A teammate pushed an API key to GitHub and then deleted it in a new commit. Is the problem solved?", [
      "No. The key remains in Git history and may already have been copied or scraped.",
      "Revoke and rotate the key now.",
      "Check for suspicious use, and add secret scanning and pre-commit checks."]),
    E("Why is poor error handling now a top-level OWASP risk?", [
      "OWASP Top 10:2025 added A10, Mishandling of Exceptional Conditions.",
      "Failing open, leaking details and swallowing errors all create exploitable behaviour.",
      "Good handling means generic user messages, detailed internal logs and deny-by-default."])
  ]
};
