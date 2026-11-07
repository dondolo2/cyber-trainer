import { Q, M, E, O } from "../lib/helpers.js";

export default {
  id: 12, day: 12, short: "Input Handling & Validation", title: "Secure Input Handling and Validation",
  outcome: "Explain why input validation is critical, apply whitelisting, sanitisation and encoding, and spot poor input handling in code.",
  theory: [
    { h: "Why untrusted input is the main attack path", p: [
        "Every piece of data from outside your code (a user, another application, an API) must be treated with suspicion. Think of it as the drawbridge to a castle: anything allowed across without inspection may carry invaders. Many of the most serious OWASP Top 10 vulnerabilities come directly from weak input handling."],
      bullets: [
        "**Injection attacks**: malicious data is inserted into a query or command and changes what runs (SQL, NoSQL, command and LDAP injection).",
        "**Cross-site scripting (XSS)**: malicious scripts run in other users' browsers, leading to session hijacking, data theft or defacement.",
        "**Broken authentication and authorisation**: manipulated input bypasses logins or reaches protected resources.",
        "**Buffer overflows**: oversized input overwrites memory and can lead to code execution.",
        "**Denial of service**: crafted input consumes excessive resources.",
        "**Data corruption**: invalid data creates inconsistencies and unexpected behaviour."],
      say: "All external input is untrusted. I validate it on the server, and I encode it when it goes back out." },
    { h: "Whitelisting (positive validation)", p: [
        "Whitelisting defines what is allowed and rejects everything else. It is the most secure approach, because it does not depend on listing every bad input, which is impossible. Blacklisting tries to block known bad input and always misses something."],
      bullets: [
        "**Allowed characters**: a numbers-only field rejects letters and symbols.",
        "**Allowed formats**: dates, emails and URLs checked with regular expressions or built-in validators.",
        "**Allowed lengths and ranges**: minimum and maximum lengths, numeric ranges. This helps prevent buffer overflows and logic errors.",
        "**Allowed values**: for dropdowns and radio buttons, accept only the values on the predefined list."],
      code: `import re

USERNAME_RE = re.compile(r"[A-Za-z0-9_]{3,20}")
ALLOWED_SORT_FIELDS = {"title", "due_date", "priority"}

def validate_username(value: str) -> str:
    if not USERNAME_RE.fullmatch(value):
        raise ValueError("Invalid username")
    return value

def validate_sort(value: str) -> str:
    if value not in ALLOWED_SORT_FIELDS:   # enumerated allowed values
        raise ValueError("Invalid sort field")
    return value`,
      say: "I whitelist: I define exactly what is allowed by character, format, length and value, and reject everything else." },
    { h: "Sanitisation", p: [
        "Sanitisation cleans or filters input to remove or neutralise dangerous parts. It is used when strict whitelisting is not feasible, for example a rich text editor that must allow some HTML."],
      bullets: [
        "**Remove malicious tags and attributes**: drop `<script>`, `<iframe>` and attributes like `onerror` from user HTML.",
        "**Escape special characters**: turn characters with special meaning (such as `<`, `>`, `&` and quotes) into safe entities.",
        "**Filter unwanted content**: remove executable code or disallowed file types.",
        "**Validation versus sanitisation**: validation decides whether input is acceptable and rejects it if not. Sanitisation changes input to make it safe."],
      beyond: "In practice, 'escaping special characters' is output encoding, and it is best done when data is written to a page. For rich HTML, use a well-maintained sanitiser library (for example DOMPurify in JavaScript) instead of writing your own filter, because hand-written filters are easy to bypass. For SQL, do not try to sanitise input. Use parameterised queries.",
      say: "Validation rejects bad input. Sanitisation cleans input I have to accept. Encoding makes sure data is shown as data." },
    { h: "Encoding (output encoding)", p: [
        "Encoding translates special characters so that they are displayed or transmitted as data and never interpreted as code. It is the key defence against XSS when you show user-supplied data back in a page."],
      bullets: [
        "**Contextual encoding**: encode for where the data will be used. HTML entity encoding for HTML, URL encoding for URL parameters, JavaScript encoding for scripts.",
        "**Default to encoding**: anything user-supplied that is displayed should be encoded unless it is known to be safe and intended as active content, and even then it should have been rigorously sanitised.",
        "**Auto-escaping tools**: templating engines such as Jinja2 and frameworks such as React escape output by default."],
      beyond: "Auto-escaping is easy to switch off by accident. In React, `dangerouslySetInnerHTML` bypasses escaping, and in templates, marking content as 'safe' does the same. Treat those as red flags in code review.",
      say: "I encode output for its context, and I prefer frameworks and templates that escape by default." },
    { h: "Spotting poor input handling", bullets: [
        "**Concatenating user input into SQL queries**: the classic SQL injection.",
        "**Printing user input into HTML without encoding**: XSS.",
        "**Using blacklists**: blocking known bad characters instead of allowing known good input.",
        "**Trusting client-side validation alone**: JavaScript in the browser is easily bypassed. Server-side validation is mandatory.",
        "**Not validating input from internal sources**: internal services and APIs can have bugs or be compromised.",
        "**Building file paths from user input**: lets attackers read files outside the intended directory."],
      code: `# A. SQL: concatenation (insecure) versus a parameterised query (secure)
cur.execute("SELECT * FROM users WHERE name = '" + name + "'")   # insecure
cur.execute("SELECT * FROM users WHERE name = ?", (name,))       # secure (sqlite3 style)

# B. HTML: raw output (insecure) versus encoded output (secure)
return "<p>Hello " + name + "</p>"                               # insecure
from html import escape
return "<p>Hello " + escape(name) + "</p>"                       # secure

# C. File path: user-controlled path (insecure) versus restricted (secure)
open("/var/app/uploads/" + filename)                             # insecure: ../../etc/passwd
from pathlib import Path
BASE = Path("/var/app/uploads").resolve()
target = (BASE / filename).resolve()
if not target.is_relative_to(BASE):                              # Python 3.9+
    abort(400)`,
      beyond: "The exercise snippets (A: insecure SQL, B: insecure HTML output, C: weak file path validation) were not included in the lesson text. The versions above are typical examples of the same three flaws and fixes, so compare them with your repository's snippets.",
      say: "When I review code I look for string concatenation into queries, unencoded output, blacklists, client-only checks and paths built from user input." },
    { h: "Real breaches linked to input handling", bullets: [
        "**Equifax (2017)**: the Apache Struts flaw CVE-2017-5638 was improper input validation in the Jakarta Multipart parser, which let attackers run arbitrary code on the server through a crafted request. Prevention: patching promptly, strict input validation and monitoring.",
        "**Heartbleed (2014, CVE-2014-0160)**: OpenSSL's heartbeat feature trusted the length the sender claimed instead of checking it against the real data, so servers returned extra memory (up to 64 KB at a time) containing secrets. It is not classic injection, but it is improper handling of input length. Prevention: validate lengths and check bounds.",
        "**Log4Shell (2021)**: a string supplied by an attacker and then logged was interpreted by a lookup feature. Untrusted data was treated as instructions."],
      say: "All three come down to the same thing: the program trusted data it should have validated." },
    { h: "Five dos and don'ts for a junior developer", bullets: [
        "**Do** validate all input on the server using whitelists for type, format, length and range.",
        "**Do** use parameterised queries for every database call.",
        "**Do** encode output for its context, and prefer auto-escaping frameworks.",
        "**Do** treat internal and third-party data as untrusted too.",
        "**Do** show generic error messages for invalid input and log the detail internally.",
        "**Don't** rely on client-side validation alone.",
        "**Don't** build SQL, shell commands or file paths by concatenating user input.",
        "**Don't** use blacklists as your main defence.",
        "**Don't** write your own sanitiser when a trusted library exists.",
        "**Don't** echo raw user input back into HTML."] }
  ],
  qs: [
    Q("Why validate", "Which statement best explains why input validation is critical?", "All external input is untrusted, and weak handling leads to injection, XSS and other serious flaws", ["It makes pages load faster", "It is only needed for passwords", "It replaces authentication"], "Many OWASP Top 10 risks come from inadequate input handling."),
    Q("Why validate", "Which attack inserts malicious data into a query or command so it changes what runs?", "Injection", ["Phishing", "Port scanning", "Password reuse"], "SQL, NoSQL, command and LDAP injection are examples."),
    Q("Why validate", "Which attack runs malicious scripts in other users' browsers?", "Cross-site scripting (XSS)", ["SQL injection", "Buffer overflow", "Credential stuffing"], "It can lead to session hijacking and data theft."),
    Q("Why validate", "Supplying oversized input to overwrite adjacent memory is a:", "Buffer overflow", ["Cross-site scripting", "Session fixation", "DNS spoofing"], "Length limits help prevent it."),
    Q("Whitelisting", "What is whitelisting?", "Defining exactly what input is allowed and rejecting everything else", ["Blocking a list of known bad characters", "Logging all input", "Encrypting input"], "It does not depend on knowing every attack."),
    Q("Whitelisting", "Why is blacklisting weaker than whitelisting?", "You cannot list every possible malicious input", ["It is slower to type", "It uses more memory", "It only works on mobile"], "Attackers find inputs the list missed."),
    Q("Whitelisting", "A field must contain a 4-digit PIN. Which validation is a whitelist?", "Accept only input that matches exactly four digits", ["Reject input containing a quote character", "Reject input containing the word 'script'", "Accept anything under 100 characters"], "It defines the allowed form and rejects everything else."),
    Q("Whitelisting", "A sort parameter must be one of title, due_date or priority. Which approach is best?", "Accept only those three values and reject the rest", ["Strip the characters ; and -- from the value", "Accept any string and escape quotes", "Check only that it is shorter than 50 characters"], "Enumerating allowed values is the strictest form of whitelisting."),
    Q("Whitelisting", "Setting minimum and maximum string lengths helps prevent:", "Buffer overflows and logic errors", ["Phishing", "Weak passwords only", "Slow networks"], "Length limits are part of whitelisting."),
    Q("Sanitisation", "When is sanitisation most appropriate?", "When strict whitelisting is not feasible, such as a rich text editor allowing some HTML", ["For every numeric field", "Never", "Only for passwords"], "It cleans input that must be accepted."),
    Q("Sanitisation", "What is the difference between validation and sanitisation?", "Validation checks and rejects invalid input. Sanitisation modifies input to make it safe", ["They are the same", "Validation modifies input. Sanitisation rejects it", "Sanitisation is only for databases"], "Use validation first and sanitise when you must accept risky content."),
    Q("Sanitisation", "Which is a sanitisation action for user-generated HTML?", "Removing `<script>` tags and `onerror` attributes", ["Adding more scripts", "Hashing the HTML", "Compressing the HTML"], "Dangerous tags and attributes are stripped."),
    Q("Encoding", "What does output encoding do?", "Translates special characters so they are displayed as data and not run as code", ["Makes data shorter", "Encrypts data for storage", "Deletes special characters"], "It prevents XSS when showing user data."),
    Q("Encoding", "Which encoding fits data placed in HTML content?", "HTML entity encoding", ["URL encoding", "Base64 only", "No encoding is needed"], "Match the encoding to the context."),
    Q("Encoding", "Why must encoding be contextual?", "Different contexts (HTML, URL, JavaScript) treat different characters as special", ["Because encoding is always slow", "Because one encoding is always enough", "Because browsers ignore encoding"], "The wrong encoding can leave a hole."),
    Q("Encoding", "Which tools escape output by default?", "Templating engines such as Jinja2 and frameworks such as React", ["Raw string concatenation", "Disabling the templating engine", "Using document.write with user data"], "Prefer defaults that are safe."),
    Q("Code review", "`cursor.execute(\"SELECT * FROM users WHERE name = '\" + name + \"'\")` is dangerous because:", "User input is concatenated into SQL, allowing SQL injection", ["It is too slow", "It uses the wrong quote characters", "It is missing a comment"], "Use a parameterised query instead."),
    Q("Code review", "`return \"<p>Hello \" + name + \"</p>\"` with user-controlled `name` is a problem because:", "The output is not encoded, so it allows XSS", ["The string is too long", "It uses concatenation for speed", "It returns HTML"], "Encode output with an escaping function or template."),
    Q("Code review", "`open(\"/var/app/uploads/\" + filename)` allows `../../etc/passwd`. What is this flaw?", "Path traversal caused by an unvalidated file path", ["SQL injection", "Weak hashing", "Session fixation"], "Resolve the path and check it stays inside the base directory."),
    Q("Code review", "Which fix best addresses a path traversal flaw?", "Whitelist file names and make sure the resolved path stays inside a designated directory", ["Add a longer random prefix", "Convert the file name to uppercase", "Log the file name only"], "Restrict file operations to an allowed location."),
    Q("Code review", "A form is validated only with JavaScript in the browser. What is the problem?", "An attacker can bypass the browser and send requests directly", ["JavaScript is too slow", "Users cannot read the messages", "Browsers cache the form"], "Server-side validation is mandatory."),
    Q("Code review", "A service accepts data from another internal API without checking it. Why is this risky?", "Internal systems can have bugs or be compromised, so their input is not automatically safe", ["Internal systems are always safe", "Internal APIs cannot send bad data", "It makes logging impossible"], "Validate input from every source."),
    Q("Code review", "Which is the right defence against SQL injection?", "Parameterised queries (and validation)", ["Hiding database errors only", "Using shorter table names", "Encrypting the query string in the code"], "Parameters keep input as data."),
    Q("Breaches", "What was the input-related flaw in the Equifax breach?", "Improper input validation in the Apache Struts Jakarta Multipart parser (CVE-2017-5638)", ["A weak Wi-Fi password", "An open S3 bucket", "A phishing email"], "It allowed arbitrary code execution through a crafted request."),
    Q("Breaches", "What kind of input flaw was Heartbleed (CVE-2014-0160)?", "The server trusted a claimed length without checking it against the actual data", ["SQL concatenation", "Missing output encoding", "A hardcoded password"], "It is improper handling of input length."),
    Q("Breaches", "Which secure input practice would most directly have prevented Heartbleed?", "Validating lengths and checking bounds before using input", ["Longer passwords", "Two-factor authentication", "More logging"], "The code needed to compare the claimed length to the real payload."),
    Q("Breaches", "In Log4Shell, what went wrong with an attacker-supplied string?", "A logging feature interpreted it as an instruction, so untrusted data was treated as code", ["It was too long", "It was encoded", "It was stored in a cookie"], "Data and instructions got mixed."),
    Q("Dos and don'ts", "Which is a 'do' for secure input handling?", "Validate all input on the server with whitelists", ["Rely on JavaScript validation only", "Use blacklists as the main defence", "Skip validation for internal APIs"], "Server-side whitelisting is the core practice."),
    Q("Dos and don'ts", "Which is a 'don't'?", "Build SQL, commands or file paths by concatenating user input", ["Use parameterised queries", "Encode output for its context", "Return generic error messages"], "Concatenation is how injection and traversal happen.")
  ],
  match: [
    M("Match the attack to how bad input causes it", "Think about what the input does.", [
      ["SQL injection", "Input is inserted into a query and changes its meaning"],
      ["Cross-site scripting (XSS)", "Input becomes a script running in another user's browser"],
      ["Buffer overflow", "Oversized input overwrites adjacent memory"],
      ["Denial of service", "Crafted input consumes excessive resources"],
      ["Broken authentication or authorisation", "Manipulated input bypasses a login or access check"],
      ["Data corruption", "Invalid data creates inconsistencies in storage"]]),
    M("Match the technique to its purpose", "Core input handling vocabulary.", [
      ["Whitelisting", "Allow only known-good input and reject the rest"],
      ["Sanitisation", "Clean or modify input to make it safe"],
      ["Output encoding", "Make special characters display as data, not code"],
      ["Parameterised queries", "Keep user input separate from SQL commands"],
      ["Server-side validation", "The mandatory defence that attackers cannot bypass in the browser"],
      ["Canonicalisation", "Convert input to its standard form before validating"]]),
    M("Match the insecure pattern to its fix", "Spot it and fix it.", [
      ["Concatenating user input into a SQL query", "Use a parameterised query"],
      ["Writing user data into HTML unencoded", "Apply contextual output encoding"],
      ["Building a file path from user input", "Whitelist names and keep paths inside a base directory"],
      ["Using a blacklist of bad characters", "Switch to a whitelist of allowed input"],
      ["Relying on client-side validation", "Validate on the server as well"],
      ["Trusting data from an internal service", "Validate all input regardless of source"]]),
    M("Match the incident to its input flaw", "Real-world input failures.", [
      ["Equifax (2017)", "Improper input validation in the Apache Struts Jakarta Multipart parser"],
      ["Heartbleed (2014)", "A claimed length was trusted without checking real data size"],
      ["Log4Shell (2021)", "An attacker-supplied logged string was interpreted by a lookup feature"]])
  ],
  order: [
    O("Order a secure input handling flow", "A typical sequence for handling one piece of input.", [
      "Receive the input at the server, across the trust boundary",
      "Canonicalise it to a standard form",
      "Validate it against a whitelist for type, format, length and range",
      "Reject it (or sanitise it if it must be accepted)",
      "Use parameterised queries when it reaches the database",
      "Encode it for the output context when displaying it"])
  ],
  open: [
    E("Explain why input validation is critical for application security.", [
      "Input from users, APIs and other systems is untrusted, and attackers use it to inject code or commands.",
      "Weak validation causes injection, XSS, broken authentication and authorisation, buffer overflows, DoS and data corruption.",
      "Validation is the first line of defence and shrinks the attack surface, and many OWASP Top 10 risks start here."]),
    E("Exercise 1: review an insecure snippet with SQL built from user input, HTML output and a file path. Identify the flaws and rewrite them securely.", [
      "SQL concatenation: SQL injection. Fix with a parameterised query, plus whitelist validation of the value.",
      "Raw HTML output: XSS. Fix by encoding output for HTML (or by using an auto-escaping template).",
      "File path from user input: path traversal. Fix by whitelisting file names, resolving the path and checking it stays inside a designated directory.",
      "Explain each fix: input stays data, output is displayed as data, and file access is confined."],
      "The exact snippets are in your GitLab repository. Use the same three-part answer: flaw, rewrite, explanation."),
    E("Exercise 2: map an input flaw to a real breach (Equifax or Heartbleed).", [
      "Equifax: the Apache Struts flaw CVE-2017-5638 was improper input validation in the Jakarta Multipart parser. Attackers sent a crafted request and ran code on the server, which led to the theft of data on about 147 million people.",
      "Prevention: strict validation, prompt patching and monitoring.",
      "Heartbleed: OpenSSL trusted a claimed heartbeat length, so servers leaked memory. Prevention: check lengths against real data and validate bounds."]),
    E("Exercise 3: write five dos and don'ts of secure input handling for a junior developer.", [
      "Do validate on the server with whitelists.",
      "Do use parameterised queries.",
      "Do encode output for its context.",
      "Don't trust client-side validation alone.",
      "Don't concatenate user input into queries, commands or paths."]),
    E("Compare whitelisting, sanitisation and encoding, with one example of each.", [
      "Whitelisting: allow only known-good input. Example: a username must match letters, digits and underscores, 3 to 20 characters.",
      "Sanitisation: clean input that must be accepted. Example: strip script tags from rich text with a sanitiser library.",
      "Encoding: display special characters as data. Example: HTML-encode a comment when rendering it so a script tag appears as text."]),
    E("Why is client-side validation not enough, and what should you do?", [
      "Attackers can bypass the browser and send requests directly, so client-side checks do not stop them.",
      "Client-side validation is useful for user experience only.",
      "Always repeat validation on the server and treat it as the primary defence."]),
    E("Why should you validate input from internal services and APIs?", [
      "Internal systems can have bugs or be compromised, so they can send harmful data.",
      "Trust boundaries exist between components, not only between users and servers.",
      "Validating all input limits how far a mistake or attack can spread."])
  ]
};
