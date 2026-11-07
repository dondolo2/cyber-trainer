import { Q, M, E, O } from "../lib/helpers.js";

export default {
  id: 20, day: 20, short: "Secure Vibe Coding", title: "Secure Vibe Coding",
  outcome: "Use AI coding assistants responsibly, review AI-generated code with SAST and human checks, and keep secure coding habits strong.",
  theory: [
    { h: "The promise and peril of AI-assisted development", p: [
        "AI coding assistants such as GitHub Copilot suggest snippets, complete functions and generate whole files from natural language. They save time on boilerplate and let developers focus on harder problems.",
        "But AI-generated code is not inherently secure. The models learn from existing code, which contains vulnerabilities, anti-patterns and outdated practices. Treating AI output as infallible is a critical mistake. Responsibility for the security of the final application stays with the human developer."],
      say: "AI speeds up writing code, but I am still the one accountable for what ships." },
    { h: "Using AI coding assistants responsibly", bullets: [
        "**Understand the training data**: generated code can reflect common vulnerabilities, insecure patterns and licensing issues.",
        "**Assistant, not authority**: apply your own judgement and security knowledge.",
        "**Context is key**: the model often lacks your architecture, requirements and threat model, so a harmless suggestion in one place can be critical in another.",
        "**Keep sensitive data out of prompts**: real API keys, production data and proprietary algorithms may be sent to the service and could be stored or exposed.",
        "**Mind licensing**: output can resemble code under restrictive licences.",
        "**Keep tools updated**: providers keep improving models and safety features."],
      say: "I give the AI context but never secrets, and I treat what it returns as a suggestion to review." },
    { h: "Practical habits when prompting", bullets: [
        "**Start with clear requirements**, including security ones. Example: 'Use parameterised queries, validate length and character set, and return generic errors.'",
        "**Generate small chunks** that are easy to review, not whole complex modules.",
        "**Use AI for boilerplate**, repetitive code and common algorithms, and keep the security-critical logic under your direct control."],
      beyond: "Security-critical code, such as authentication, authorisation, cryptography and session handling, deserves the most human attention. If you do ask AI for it, prefer well-established libraries and frameworks over custom code, and have it reviewed by someone with security knowledge.",
      say: "Small, specific prompts with security requirements give code that is easier to review and safer to use." },
    { h: "Reviewing AI output: automated checks", p: [
        "SAST is the first line of defence. It detects insecure patterns whether a human or an AI wrote them."],
      bullets: [
        "**Real-time feedback**: IDE plugins such as SonarLint, ESLint security rules and Bandit flag issues the moment AI code appears.",
        "**CI/CD gates**: SAST in the pipeline flags and can block known vulnerability patterns.",
        "**Dependency scanning (SCA)**: the AI may suggest outdated or vulnerable libraries.",
        "**Secret scanning**: AI output might contain hardcoded credentials."],
      beyond: "A newer risk specific to AI assistants is **package hallucination**: the model suggests a library name that does not exist, and attackers can register that name with malicious code (sometimes called slopsquatting). Always verify that a suggested package really exists, is the right one, and is maintained before installing it. Also, OWASP now publishes a **Top 10 for LLM Applications**, covering risks such as prompt injection. The lesson says 'when available', and it is available now.",
      say: "SAST, SCA and secret scanning treat AI code like any other code, so I run all three on it." },
    { h: "Reviewing AI output: human checks", p: [
        "Tools cannot replace human judgement. Treat AI-generated code with the same or more scepticism than code from a junior developer."],
      bullets: [
        "**Input validation**: is all external input validated and sanitised?",
        "**Output encoding**: is output encoded for its context to prevent XSS?",
        "**Error handling**: generic messages for users and detail in the logs?",
        "**Secrets**: handled securely or hardcoded?",
        "**Authorisation logic**: are access controls really enforced? This is often hard for AI.",
        "**Business logic flaws**: could the logic be abused?",
        "**Performance and resource use**: could it cause denial of service?",
        "**Understand the 'why'**: if you cannot explain what the code does, do not use it.",
        "**Refactor** overly complex code to match your standards, and **test thoroughly**, including security tests."],
      code: `# Typical AI suggestion for "read a file the user names"
def read_user_file(filename):
    return open("/data/" + filename).read()     # path traversal

# Reviewed and fixed
from pathlib import Path
BASE = Path("/data").resolve()

def read_user_file(filename: str) -> str:
    target = (BASE / filename).resolve()
    if not target.is_relative_to(BASE):         # stay inside the base directory
        raise PermissionError("Invalid file")
    return target.read_text()`,
      beyond: "This example is my own illustration of a common pattern. It shows how a short, plausible AI answer can hide a classic flaw.",
      say: "I review AI code like I would review a stranger's pull request: validation, encoding, errors, secrets, authorisation and logic." },
    { h: "Keeping secure coding habits alive", bullets: [
        "**Continuous learning**: stay current on OWASP Top 10, LLM risks and emerging threats. Your knowledge is the final filter.",
        "**Active engagement**: question, analyse and modify suggestions instead of accepting them passively.",
        "**Security checklists**: use a personal or team checklist, such as the one from the dependency lesson.",
        "**Pair programming with AI**: discuss and challenge suggestions, keeping the human in the loop.",
        "**Educate your peers**: share what works and build a culture of responsible adoption.",
        "**Understand the limitations**: AI does not understand intent, context or human-level security reasoning."],
      say: "AI is a tool in my hands. My expertise is what makes the output safe." }
  ],
  qs: [
    Q("Promise and peril", "Why is AI-generated code not inherently secure?", "Models learn from existing code that includes vulnerabilities and outdated practices", ["AI always writes perfect code", "AI cannot write code", "AI code is always encrypted"], "Garbage patterns in, garbage patterns out."),
    Q("Promise and peril", "Who is responsible for the security of the final application when AI helped write it?", "The human developer", ["The AI vendor only", "Nobody", "The compiler"], "The developer ships it."),
    Q("Promise and peril", "Which is a legitimate benefit of AI assistants?", "Reducing boilerplate so developers can focus on complex problems", ["Removing the need for testing", "Guaranteeing security", "Replacing code review"], "Productivity, not safety, is the main gain."),
    Q("Promise and peril", "Treating AI output as infallible is:", "A critical mistake", ["Best practice", "Required", "A security control"], "Do not copy blindly."),
    Q("Responsible use", "Why should you avoid pasting real API keys or production data into AI prompts?", "The data may be sent to the service and could be stored or exposed", ["It makes the AI slower", "It breaks syntax", "It is a licence issue only"], "Prompts leave your machine."),
    Q("Responsible use", "'AI as an assistant, not an authority' means:", "Use suggestions as input and apply your own judgement and security knowledge", ["Always accept the first suggestion", "Never read the output", "Trust it over the team"], "Humans decide."),
    Q("Responsible use", "Why does lack of context make AI suggestions risky?", "The model may not know your architecture, requirements or threat model", ["It knows everything about your system", "It reads your mind", "It runs on your servers"], "A benign suggestion elsewhere may be critical here."),
    Q("Responsible use", "What licensing concern exists with AI-generated code?", "It may reproduce code under restrictive licences", ["It has no licence issues", "It is always public domain", "It is always proprietary"], "Be aware of what you accept."),
    Q("Responsible use", "Why keep AI tools and plugins updated?", "Providers keep improving models and security features", ["Updates change fonts", "Updates remove licences", "It is required by Git"], "Newer versions are safer."),
    Q("Prompting habits", "Which prompt is best for a secure registration function?", "Include security requirements such as parameterised queries, length validation and generic errors", ["Write a function quickly", "Make it as short as possible", "Make it clever"], "Precise requirements lead to safer suggestions."),
    Q("Prompting habits", "Why generate small chunks of code?", "They are easier to review thoroughly", ["The AI cannot do large code", "Small code is always secure", "Large code is illegal"], "Review quality drops with size."),
    Q("Prompting habits", "Where is AI most helpful according to the lesson?", "Boilerplate, basic data structures and common algorithms", ["Security-critical logic only", "Cryptography design", "Deciding access control rules"], "Keep critical logic under your control."),
    Q("Automated review", "Why is SAST important for AI-generated code?", "It detects insecure patterns regardless of whether a human or an AI wrote them", ["It writes code for the AI", "It makes the AI faster", "It replaces testing"], "It checks the code, not its author."),
    Q("Automated review", "Which IDE tools give real-time feedback on AI-generated code?", "SonarLint, ESLint security rules and Bandit integrations", ["Paint and Notepad", "A spreadsheet", "A browser extension for colours"], "They flag issues as soon as the code appears."),
    Q("Automated review", "How can AI introduce vulnerable dependencies?", "It may suggest outdated or vulnerable libraries", ["It deletes libraries", "It encrypts libraries", "It uses only built-ins"], "SCA in CI catches these."),
    Q("Automated review", "Why run secret scanning on AI-generated code?", "It may include hardcoded credentials learned from compromised data", ["AI never makes secrets", "Secrets are always blocked", "It is slower otherwise"], "Credentials can leak into suggestions."),
    Q("Automated review", "What is package hallucination?", "The AI suggests a library name that does not exist, which attackers can then register with malicious code", ["A bug in the compiler", "A slow install", "A syntax error"], "Verify that every suggested package is real and trustworthy."),
    Q("Human review", "How sceptical should you be of AI-generated code?", "As sceptical as you would be of code from a junior developer, or more", ["Not at all", "Only for long code", "Only for Python"], "Treat it as unreviewed."),
    Q("Human review", "Which review question concerns XSS?", "Is all output properly encoded for its context?", ["Is the indentation correct?", "Is the variable name short?", "Is the file small?"], "Output encoding prevents XSS."),
    Q("Human review", "Why is authorisation logic hard for AI?", "It depends on your specific roles and rules, which the AI may not know", ["It is too easy", "It is encrypted", "It is automatic"], "Context-specific logic needs human review."),
    Q("Human review", "If you do not understand AI-generated code, you should:", "Not use it until you do", ["Merge it anyway", "Hide it in a library", "Ask it to be longer"], "Understand the 'why'."),
    Q("Human review", "`open(\"/data/\" + filename).read()` in AI output with user-controlled filename is:", "Vulnerable to path traversal", ["Perfectly safe", "SQL injection", "A buffer overflow"], "`../` sequences escape the folder."),
    Q("Human review", "What is the correct fix for that path traversal?", "Resolve the path and verify it stays inside the base directory", ["Add a longer prefix", "Convert to lowercase", "Log the filename"], "Constrain file access."),
    Q("Human review", "Why consider performance and resource usage in a review?", "Inefficient code can lead to denial of service", ["It affects colours", "It affects licensing", "It has no security impact"], "Resource exhaustion is an availability risk."),
    Q("Human review", "Which statement about testing AI code is right?", "It needs thorough testing including security tests like any other code", ["It does not need tests", "Tests are only for humans", "AI tests itself"], "Testing is non-negotiable."),
    Q("Habits", "Which practice keeps secure habits strong while using AI?", "Actively question, analyse and modify suggestions", ["Accept every suggestion", "Stop reading code", "Disable linters"], "Passive acceptance erodes skills."),
    Q("Habits", "What is 'pair programming with AI'?", "Discussing and challenging the AI's suggestions to reach a secure solution together", ["Letting the AI work alone", "Sharing the screen with strangers", "Copying code from forums"], "The human stays in the loop."),
    Q("Habits", "Why use a security checklist for AI code?", "It gives a structured way to ensure key considerations are not overlooked", ["It replaces testing", "It makes code shorter", "It is required by the AI"], "Checklists keep reviews consistent."),
    Q("Habits", "What is a limitation of AI coding assistants?", "They do not understand intent, context or human-level security reasoning", ["They cannot generate text", "They never make mistakes", "They always know the threat model"], "Your expertise remains essential."),
    Q("Habits", "Why share secure AI usage practices with your team?", "It builds a culture of responsible AI adoption", ["It makes the AI faster", "It reduces licensing costs", "It removes the need for reviews"], "Culture scales better than individual care.")
  ],
  match: [
    M("Match the AI coding risk to the safeguard", "Using AI responsibly.", [
      ["Insecure patterns in generated code", "SAST in the IDE and CI"],
      ["Outdated or hallucinated libraries", "SCA scans and manual verification of every package"],
      ["Hardcoded credentials in output", "Secret scanning"],
      ["Sensitive data in prompts", "Never include real secrets or production data"],
      ["Logic and authorisation flaws", "Human security-focused review"],
      ["Licence issues", "Awareness and checking what you accept"]]),
    M("Match the review check to the vulnerability it addresses", "Reviewing AI output.", [
      ["Input validation check", "Injection and malformed data"],
      ["Output encoding check", "Cross-site scripting"],
      ["Error handling check", "Information leakage"],
      ["Secrets check", "Credential exposure"],
      ["Authorisation logic check", "Privilege escalation and access bypass"],
      ["Resource usage check", "Denial of service"]]),
    M("Is it a good or bad AI practice?", "Judge each habit.", [
      ["Request small chunks of code", "Good"],
      ["Paste production API keys into a prompt", "Bad"],
      ["Run SAST on all AI-generated code", "Good"],
      ["Merge code you do not understand", "Bad"],
      ["Include security requirements in the prompt", "Good"],
      ["Install a suggested package without checking it exists", "Bad"]])
  ],
  order: [
    O("Order a safe workflow for using an AI-generated function", "From first step to last.", [
      "Write a clear prompt with security requirements and no secrets",
      "Generate a small, focused piece of code",
      "Read it and make sure you understand how it works",
      "Run SAST, SCA and secret scans on it",
      "Review with a security checklist, fix flaws and add tests"])
  ],
  open: [
    E("Explain how to use AI coding assistants responsibly.", [
      "Treat the AI as an assistant: apply your judgement, and keep secrets and sensitive data out of prompts.",
      "Give clear requirements including security ones, ask for small chunks, and use it mainly for boilerplate.",
      "Be aware of licensing and keep tools updated.",
      "Review everything before it ships."]),
    E("Exercise 1: generate a function with an AI tool and fix its flaws. Describe the process.", [
      "Choose a task: user registration storing data in a database, displaying comments, or reading a file path from a user.",
      "Review the output for missing validation, SQL concatenation, missing encoding, hardcoded secrets and verbose errors.",
      "Fix with parameterised queries, whitelisting, output encoding and environment variables, and handle errors generically.",
      "Document each flaw, the fix and the reasoning, then run SAST to confirm."],
      "Example: AI-generated file reader using string concatenation. Flaw: path traversal. Fix: resolve the path and check it stays inside the base directory."),
    E("Exercise 2: write a personal Secure Vibe Coding Checklist of 5 to 7 items.", [
      "Did I validate all inputs against expected formats, types and lengths?",
      "Are all database queries parameterised and all output encoded for its context?",
      "Are there any hardcoded secrets, and did I keep secrets out of my prompt?",
      "Do error messages stay generic, with details only in logs?",
      "Does the code enforce authorisation correctly for my roles?",
      "Did I verify that every suggested dependency exists, is maintained and passes SCA?",
      "Did SAST pass, do I understand the code, and did I add tests?"]),
    E("Exercise 3: how would you improve a peer's checklist and what scenario shows its value?", [
      "Compare the most critical items, look for gaps such as logging, licensing or dependency checks, and make items actionable with yes or no wording.",
      "Scenario: the dependency item catches an AI-suggested package that does not exist or is a typosquat before it is installed.",
      "Another scenario: the authorisation item catches an endpoint that returns another user's data."]),
    E("Why is human review still essential when SAST passes?", [
      "SAST finds known patterns but not business logic or authorisation flaws that depend on intent.",
      "AI lacks context about your architecture, roles and threat model.",
      "Human review covers design, logic and what the code is supposed to do."]),
    E("What is package hallucination and how do you defend against it?", [
      "The AI suggests a package name that does not exist, and an attacker can register that name with malicious code.",
      "Defend by verifying every suggested package: check the registry, maintainers, age, downloads and repository, run SCA, and prefer packages you already trust."])
  ]
};
