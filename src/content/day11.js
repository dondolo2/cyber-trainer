import { Q, M, E, O } from "../lib/helpers.js";

export default {
  id: 11, day: 11, short: "SDLC Implementation Phase", title: "SDLC Implementation Phase",
  outcome: "Explain why planning is critical for secure software, write basic SMART security requirements, tell vulnerabilities from exposures, and use threat modelling to guide implementation.",
  theory: [
    { h: "Where Weeks 3 and 4 are going", p: [
        "The first two weeks covered principles and frameworks. This module turns to the code itself. The decisions you make about how input is handled, how errors are managed and how dependencies are used decide whether an application resists attack or exposes itself.",
        "The module intro uses two examples of small decisions with huge consequences: **Log4Shell** (2021), where one logging library let attackers run code on millions of systems, and supply chain attacks on open-source JavaScript dependencies, where one compromised library affects thousands of downstream apps."],
      bullets: [
        "**Secure coding standards and best practices** (this lesson).",
        "**Input validation, error handling and secrets management** (Lessons 12 and 13).",
        "**Dependency and third-party library management** (Lesson 14).",
        "**Security testing and review**: static and dynamic analysis, peer review, CI/CD integration (Lesson 15 onward).",
        "**Maintenance and monitoring**: keeping software secure after deployment."],
      beyond: "The September 2025 npm attacks are a good recent example for interviews. As reported by [AWS](https://aws.amazon.com/blogs/security/defending-against-supply-chain-attacks-like-chalk-debug-and-the-shai-hulud-worm), attackers phished a maintainer and pushed malicious updates to 18 popular packages including chalk and debug (8 September), then a self-spreading worm called Shai-Hulud stole tokens and credentials and published infected packages (15 September).",
      say: "Small implementation decisions have systemic consequences. Log4Shell and the npm attacks show that one weak component can affect thousands of applications." },
    { h: "Why planning is critical for secure development", p: [
        "Without a plan, security is reactive and inconsistent: issues are found only after the vulnerability is already in the code. Planning means identifying threats, defining security objectives and making sure security is built into every phase."],
      bullets: [
        "**Cost effectiveness**: fixing issues in requirements or design costs far less than fixing them late.",
        "**Proactive risk mitigation**: understand the attack surface, how data could be exposed and how functionality could be abused before building.",
        "**Clear communication and alignment**: developers, architects, product managers and security share the same expectations, so there is less ambiguity.",
        "**Compliance and regulatory alignment**: GDPR, HIPAA and PCI DSS are met by design instead of retrofitted.",
        "**Trust and reputation**: secure applications keep user trust and avoid legal and brand damage."],
      say: "Planning makes security proactive. Before I write code, the team agrees on authentication, access rules, data handling and logging, so implementation follows a plan instead of guesses." },
    { h: "Early decisions that shape implementation", bullets: [
        "**Enforce authentication in API design**: every endpoint that needs a logged-in user rejects anonymous requests.",
        "**Define role-based access rules before writing business logic**: who can do what is decided first, not patched in later.",
        "**Never log or hardcode sensitive data**: decided in the plan, then followed in the code.",
        "**Shift-left**: security shapes design and implementation, instead of being applied after the system is built."] },
    { h: "Writing basic security requirements", p: [
        "A security requirement is an explicit statement of a control or protection the application must implement. Like functional requirements, it must be **clear, measurable and testable**, because it guides development and gives testers something to verify. The OWASP **Application Security Verification Standard (ASVS)** gives a structured framework, and **Level 1** is a practical baseline for general-purpose applications and for junior and mid-level developers."],
      bullets: [
        "**Confidentiality**: 'All user passwords must be stored using a strong one-way hash with a unique salt.'",
        "**Integrity**: 'All user input must be validated on the server side to prevent injection attacks.'",
        "**Availability**: 'The application must implement basic rate limiting and request size limits to reduce DoS risk.'",
        "**Authentication**: 'The application must enforce multi-factor authentication for administrative users.'",
        "**Permissions**: 'Only authenticated administrators can create, update or delete user accounts.'",
        "**Session management**: 'Session tokens must be invalidated on logout or after a defined period of inactivity.'",
        "**Error handling and logging**: 'User-facing error messages must not reveal internal system details.'"],
      say: "A good security requirement is specific and testable. I can check it with a test, so it does not stay a wish." },
    { h: "SMART requirements and the blog example", p: [
        "The exercise asks for **SMART** security requirements: **S**pecific, **M**easurable, **A**chievable, **R**elevant and **T**ime-bound."],
      bullets: [
        "**Weak**: 'The system must be secure.' It is not specific, not measurable and cannot be tested.",
        "**SMART**: 'By the end of sprint 3, every API endpoint except login and registration must return HTTP 401 for unauthenticated requests, verified by automated tests.'",
        "**Blog application example from the lesson**: authentication with bcrypt-hashed, uniquely salted passwords; authorisation so users manage only their own posts and administrators manage all; server-side validation and sanitisation against XSS and SQL injection; email addresses encrypted at rest; sessions that expire after 30 minutes of inactivity with Secure, HttpOnly cookies."],
      beyond: "ASVS has three levels. Level 1 is the baseline. Level 2 is meant for applications that handle sensitive data, and Level 3 for the most critical applications. For a real project, pick the level that matches the data you handle.",
      say: "I write each requirement so it is specific, measurable and has a deadline, and I can name the test that proves it." },
    { h: "Vulnerabilities versus exposures", p: [
        "People confuse these terms, and clear terminology matters when you communicate risk."],
      bullets: [
        "**Vulnerability**: a weakness in design, implementation or configuration that can be exploited. Examples: missing input validation, insecure cryptography, logic flaws allowing unauthorised actions. Analogy: **a crack in the foundation**.",
        "**Exposure**: a condition that increases the likelihood or impact of exploiting a vulnerability. It may not be a direct flaw on its own. Examples: verbose error messages, open network ports, overly permissive access controls. Analogy: **publicly displaying the building's blueprints**.",
        "**Example pair**: the vulnerability is a SQL injection flaw from missing input sanitisation. An exposure is the application running with a database account that has elevated privileges, so a successful injection causes more damage.",
        "**CVE**: the Common Vulnerabilities and Exposures programme gives each publicly known vulnerability a standard ID so it can be tracked. CVE entries focus on vulnerabilities, but exposures matter when you assess real-world risk."],
      beyond: "CVE's older documentation defined these terms a little differently. It called a 'universal vulnerability' one that is a problem under any commonly used security policy, and an 'exposure' a state that is not a universal vulnerability but still helps an attacker, for example by leaking information or giving an easy entry point. The lesson's definitions are simpler, so use them in your answers and know that official wording varies.",
      say: "A vulnerability is the flaw itself. An exposure is a condition around it that makes it easier to exploit or more damaging." },
    { h: "Threat modelling supports planning and implementation", p: [
        "Threat modelling is a structured way to identify threats, work out how a system can be attacked and decide on countermeasures. It is most effective early, but its results directly shape implementation. It does not need specialised roles or complex tools. A short design discussion with a whiteboard is enough. The goal is to think like an attacker before writing code."],
      bullets: [
        "**1. Define the system**: purpose, components, data flows and trust boundaries.",
        "**2. Identify threats**: use STRIDE or DREAD to find attack scenarios.",
        "**3. Identify vulnerabilities**: where weaknesses in design or implementation would let the threats succeed.",
        "**4. Determine countermeasures**: controls that reduce or remove the risks.",
        "**5. Verify countermeasures**: check they are implemented correctly and work.",
        "**Benefits**: early detection of design flaws, prioritisation of the most impactful risks, comprehensive coverage across components and data flows, better design decisions and a shared language between technical and non-technical people."],
      say: "Threat modelling lets me find design-level problems before any code exists, and it tells me which risks to build controls for first." },
    { h: "Worked example: the Task Management Application", p: [
        "The exercises use a task app for small teams. Users create tasks, assign them, set due dates and mark them complete. There are two roles: **Team Member** and **Team Lead**."],
      bullets: [
        "**Sensitive data**: credentials, email addresses, session tokens, task contents (which may be confidential), team membership and roles, assignments and due dates.",
        "**Components**: web browser, frontend application, backend API, database.",
        "**Trust boundaries**: between the browser and the server, and between the API and the database.",
        "**Typical STRIDE threats**: stolen session used to act as a Team Lead (spoofing), changing the assignee in a request (tampering), a lead denying a deletion with no audit trail (repudiation), SQL injection or verbose errors leaking data (information disclosure), flooding the API (denial of service), a Team Member calling a Team Lead-only endpoint (elevation of privilege)."],
      say: "For any app I start with a simple diagram, mark the trust boundaries, and walk each component through STRIDE." }
  ],
  qs: [
    Q("Module overview", "Which incident does the module intro use to show that small implementation decisions can have systemic consequences?", "Log4Shell, where a flaw in a widely used logging library exposed millions of systems", ["A website colour change that confused users", "A late release that missed a deadline", "A printer driver update"], "One library flaw scaled to millions of systems."),
    Q("Module overview", "Which topic is NOT part of the Weeks 3 and 4 focus?", "Network cabling and hardware installation", ["Dependency and third-party library management", "Security testing and review techniques", "Maintenance and monitoring practices"], "The module is about secure coding, not hardware."),
    Q("Planning", "Why does overlooking security early in the SDLC cost more?", "It leads to technical debt, expensive remediation and a higher risk of incidents", ["It makes code run faster", "It removes the need for testing", "It reduces the number of vulnerabilities"], "Late fixes need rework and emergency patches."),
    Q("Planning", "Which early planning decision reduces vulnerabilities during implementation?", "Defining role-based access rules before writing business logic", ["Choosing the colour scheme", "Choosing the release party date", "Picking the font"], "Access rules decided first are built in instead of patched in."),
    Q("Planning", "What does 'shift-left' mean?", "Integrating security early so it guides design and implementation", ["Testing only after release", "Moving security staff to the left office", "Skipping design"], "Security shapes the work instead of being added after."),
    Q("Planning", "Which is NOT a reason planning is critical for secure development?", "It removes the need for any later security testing", ["Cost effectiveness", "Clear communication and alignment", "Compliance and regulatory alignment"], "Planning reduces risk but never replaces testing."),
    Q("Planning", "How does a shared security plan help a team?", "Developers, architects, product managers and security share expectations, so there is less ambiguity", ["It lets developers work alone", "It removes the product manager", "It guarantees no bugs"], "Clear communication supports consistent decisions."),
    Q("Requirements", "Which best describes a security requirement?", "An explicit, measurable and testable statement of a control the application must implement", ["A wish that the system is safe", "A list of known attackers", "A description of the user interface"], "It guides development and gives testers something to verify."),
    Q("Requirements", "ASVS Level 1 is described as suitable for:", "General-purpose applications, as a baseline for junior and mid-level developers", ["Only military systems", "Only mobile games", "Only database administrators"], "It is a practical starting baseline."),
    Q("Requirements", "'Passwords must be stored with a strong one-way hash and a unique salt' belongs to which area?", "Confidentiality", ["Availability", "Session management", "Error handling and logging"], "It protects credentials from disclosure."),
    Q("Requirements", "'The application must implement rate limiting and request size limits' mainly supports:", "Availability", ["Permissions", "Authentication", "Confidentiality"], "It reduces denial-of-service risk."),
    Q("Requirements", "'Session tokens must be invalidated on logout or after inactivity' belongs to which area?", "Session management", ["Permissions", "Availability", "Integrity"], "It controls how sessions end."),
    Q("Requirements", "'User-facing error messages must not reveal internal system details' belongs to which area?", "Error handling and logging", ["Authentication", "Availability", "Permissions"], "It prevents information leakage."),
    Q("Requirements", "'Only authenticated administrators can create, update or delete user accounts' belongs to which area?", "Permissions", ["Session management", "Availability", "Confidentiality of backups"], "It defines what each role may do."),
    Q("SMART", "What does SMART stand for?", "Specific, Measurable, Achievable, Relevant, Time-bound", ["Secure, Managed, Automated, Reviewed, Tested", "Simple, Modern, Accurate, Reliable, Timely", "Specific, Minimal, Adaptable, Robust, Traceable"], "SMART requirements can be checked and scheduled."),
    Q("SMART", "Which is the best SMART security requirement?", "By the end of sprint 3, every API endpoint except login and registration returns 401 to unauthenticated requests, verified by automated tests", ["The system must be secure", "Developers should think about security", "Passwords should be good"], "It is specific, measurable, relevant and has a deadline and a test."),
    Q("Blog example", "In the lesson's blog example, how are sessions protected?", "They expire after 30 minutes of inactivity and identifiers are stored in Secure, HttpOnly cookies", ["They never expire", "Session IDs are placed in the URL", "Sessions are shared between users"], "Both expiry and cookie flags reduce hijacking risk."),
    Q("Blog example", "In the blog example, how is sensitive user data such as email addresses protected?", "It is encrypted at rest in the database", ["It is stored in plain text for speed", "It is printed in the logs", "It is shown on every page"], "Encryption protects data if the database is exposed."),
    Q("Vulnerability vs exposure", "Which best defines a vulnerability?", "A weakness in design, implementation or configuration that can be exploited", ["A condition that makes attacks more damaging", "A person who attacks systems", "A tool that scans code"], "The vulnerability is the flaw itself."),
    Q("Vulnerability vs exposure", "Which best defines an exposure?", "A condition that increases the likelihood or impact of exploiting a vulnerability", ["A programming bug only", "A completed attack", "A patch release"], "It may not be a flaw on its own but makes attacks easier."),
    Q("Vulnerability vs exposure", "Verbose error messages that reveal internal details are an example of:", "An exposure", ["A threat actor", "A patch", "A firewall rule"], "They help attackers learn how the system works."),
    Q("Vulnerability vs exposure", "A SQL injection flaw exists, and the app connects with a database account that has full admin rights. The admin rights are:", "An exposure that increases the impact of the vulnerability", ["The vulnerability itself", "A threat actor", "A countermeasure"], "A successful injection can do far more damage."),
    Q("Vulnerability vs exposure", "Missing server-side input validation is best classed as:", "A vulnerability", ["An exposure only", "A threat actor", "A trust boundary"], "It is a weakness in implementation."),
    Q("Vulnerability vs exposure", "In the lesson's analogies, an exposure is like:", "Publicly displaying the building's blueprints", ["A crack in the foundation", "A locked door", "A building inspector"], "The vulnerability is the crack. The blueprints show where to look."),
    Q("Vulnerability vs exposure", "What does the CVE programme provide?", "A standardised way to identify and track publicly known vulnerabilities", ["A free antivirus", "A list of secure passwords", "A certification exam"], "Each vulnerability gets a CVE ID."),
    Q("Threat modelling", "What is the first step of the lesson's threat modelling approach?", "Define the system: components, data flows and trust boundaries", ["Verify countermeasures", "Write the penetration test report", "Deploy to production"], "You need to understand the system before analysing threats."),
    Q("Threat modelling", "Which frameworks does the lesson name for identifying threats?", "STRIDE and DREAD", ["SMART and SOLID", "PDCA and ITIL", "CIA and PCI"], "They help structure attack scenarios."),
    Q("Threat modelling", "Which step comes after determining countermeasures?", "Verify countermeasures", ["Define the system", "Identify threats", "Retire the system"], "You check that controls are implemented correctly and work."),
    Q("Threat modelling", "In the task app diagram, where is a trust boundary?", "Between the client (browser) and the server", ["Between two comments in the code", "Between the keyboard and the screen", "Between two variables"], "Data crossing it must be treated as untrusted."),
    Q("Threat modelling", "Which is a benefit of threat modelling for implementation?", "It prioritises the most impactful risks", ["It removes the need for requirements", "It guarantees no vulnerabilities", "It replaces code review"], "Teams can focus on what matters most."),
    Q("Threat modelling", "Does threat modelling require specialised security roles or complex tooling?", "No. A short design discussion with a whiteboard or diagram can be enough", ["Yes, only certified specialists can do it", "Yes, it requires expensive tools", "Yes, it can only be done after release"], "The goal is to think like an attacker before writing code.")
  ],
  match: [
    M("Match the requirement area to an example", "Security requirement areas from the lesson.", [
      ["Confidentiality", "Passwords stored using a strong one-way hash with a unique salt"],
      ["Integrity", "All user input validated on the server side"],
      ["Availability", "Rate limiting and request size limits"],
      ["Authentication", "Multi-factor authentication for administrative users"],
      ["Permissions", "Only authenticated administrators can manage user accounts"],
      ["Session management", "Tokens invalidated on logout or after inactivity"],
      ["Error handling and logging", "Error messages do not reveal internal system details"]]),
    M("Is it a vulnerability or an exposure?", "Classify each condition.", [
      ["SQL query built by concatenating user input", "Vulnerability"],
      ["Verbose stack traces shown to users", "Exposure"],
      ["Missing server-side input validation", "Vulnerability"],
      ["Database port open to the internet", "Exposure"],
      ["Web app connects to the database as an administrator", "Exposure"],
      ["Logic flaw lets a user edit another user's task", "Vulnerability"]]),
    M("Match the threat modelling step to its purpose", "The five steps.", [
      ["Define the system", "Understand components, data flows and trust boundaries"],
      ["Identify threats", "Use STRIDE or DREAD to find attack scenarios"],
      ["Identify vulnerabilities", "Find where weaknesses would let threats succeed"],
      ["Determine countermeasures", "Choose controls to reduce or remove risks"],
      ["Verify countermeasures", "Check controls are implemented correctly and work"]]),
    M("Match the task app threat to its STRIDE category", "Apply STRIDE.", [
      ["Attacker steals a session token and acts as a Team Lead", "Spoofing"],
      ["User changes the assignee by editing a request", "Tampering"],
      ["A lead denies deleting a task and nothing was logged", "Repudiation"],
      ["SQL injection dumps the users table", "Information disclosure"],
      ["Flooding the API with task creation requests", "Denial of service"],
      ["A Team Member calls a Team Lead-only endpoint", "Elevation of privilege"]])
  ],
  order: [
    O("Put the threat modelling steps in order", "From first step to last.", [
      "Define the system",
      "Identify threats",
      "Identify vulnerabilities",
      "Determine countermeasures",
      "Verify countermeasures"])
  ],
  open: [
    E("Explain why planning is critical for secure software development.", [
      "Without a plan, security is reactive and inconsistent: issues are fixed only after they are in the code.",
      "Planning is cost effective, because early fixes are cheaper than late ones.",
      "It identifies threats and the attack surface before building, aligns developers, architects and security on expectations, and builds in compliance.",
      "Early decisions such as authentication in the API design and access rules before business logic directly prevent vulnerabilities."]),
    E("Exercise 1: for a Task Management Application, identify sensitive data and draft 3 to 5 SMART security requirements, each with the threat it mitigates.", [
      "Sensitive data: credentials, emails, session tokens, task contents, team membership and roles, assignments.",
      "Requirement 1: passwords stored as salted bcrypt or Argon2 hashes, verified by a unit test before first release. Threat: credential theft after a database leak.",
      "Requirement 2: every endpoint enforces Team Member and Team Lead permissions on the server and returns 403 on violation, covered by automated tests by the end of sprint 2. Threat: privilege escalation and unauthorised access to other teams' tasks.",
      "Requirement 3: all input validated on the server with whitelists and all database access through parameterised queries, with no critical or high injection findings from SAST at release. Threat: injection.",
      "Requirement 4: sessions expire after 30 minutes of inactivity and use Secure, HttpOnly cookies, verified in security tests before release. Threat: session hijacking.",
      "Requirement 5: task creation, assignment, deletion and failed logins are logged with user ID and timestamp, with no sensitive data. Threat: repudiation."],
      "Each requirement should name who, what, how it is checked and when. That is the SMART test."),
    E("Exercise 2: sketch a basic threat model for the Task Management Application and list at least 3 to 5 STRIDE threats.", [
      "Diagram: Browser to Frontend to Backend API to Database. Trust boundaries between the browser and the server, and between the API and the database. Data flows: login credentials, task create and update requests, session tokens.",
      "Spoofing: stolen session token used to act as a Team Lead.",
      "Tampering: a modified request changes the assignee or due date of another team's task.",
      "Repudiation: a lead denies reassigning a task and no audit log exists.",
      "Information disclosure: SQL injection or a verbose error exposes user data.",
      "Denial of service: flooding the task creation endpoint.",
      "Elevation of privilege: a Team Member calls a lead-only endpoint directly."]),
    E("Exercise 3: analyse a real CVE and explain the vulnerability and any exposures.", [
      "Example: CVE-2017-5638 (Apache Struts, the Equifax breach).",
      "Vulnerability: improper input validation in the Jakarta Multipart parser let attackers run arbitrary code with a crafted request header.",
      "Exposures that made it worse: the patch was available but not applied, the server was internet-facing, an over-privileged server account, weak network segmentation and poor monitoring.",
      "General pattern: the vulnerability is the specific flaw. Exposures are the conditions that make exploitation easier or the damage bigger."],
      "Pick any CVE from CVE.org. Describe the flaw first, then list the conditions around it."),
    E("Explain the difference between a vulnerability and an exposure, with an example of each.", [
      "A vulnerability is a weakness in design, implementation or configuration that can be exploited, for example missing input validation.",
      "An exposure is a condition that increases the likelihood or impact of exploitation, for example verbose error messages or a database account with excessive privileges.",
      "Analogy: a crack in the foundation versus publicly displaying the blueprints."]),
    E("How does threat modelling support secure planning and implementation?", [
      "It finds design-level security problems before code is written.",
      "It prioritises the most impactful risks.",
      "It covers all components and data flows.",
      "It gives developers concrete controls to implement, and gives technical and non-technical people a shared language."]),
    E("Rewrite this weak requirement as a SMART security requirement: 'The app should be secure.'", [
      "Pick a specific risk, for example weak authentication or injection.",
      "Example: 'By the end of sprint 3, all API endpoints except login and registration must return 401 for unauthenticated requests, and automated tests must cover each endpoint.'",
      "It is specific (which endpoints), measurable (401 and tests), achievable, relevant to authentication risk and time-bound (sprint 3)."])
  ]
};
