import { Q, M, E, O } from "../lib/helpers.js";

export default {
  id: 8, day: 8, short: "Secure SDLC & Responsibilities", title: "Secure SDLC and Developer Responsibilities",
  outcome: "Map security activities and developer responsibilities to each phase of the secure SDLC, and know where developers collaborate with security teams.",
  theory: [
    { h: "What a Secure SDLC is", p: [
        "A **Secure SDLC (SSDLC)** integrates security activities into every phase of development instead of adding them at the end. It aims to find and fix vulnerabilities early, which lowers cost and effort, and it makes developers active participants in building secure-by-design software.",
        "The lesson uses five phases: **Requirements and analysis**, **Design and architecture**, **Implementation and coding**, **Testing and verification**, and **Deployment and operations**. The course exercise lists six phases because it separates Maintenance, which the lesson includes under Deployment and operations."],
      say: "A secure SDLC takes the normal lifecycle and adds a security activity and a developer responsibility to every phase, so problems are found when they are cheap to fix." },
    { h: "Phase 1: Requirements and analysis", p: [
        "Security requirements are written down next to functional requirements."],
      bullets: [
        "**Security activities**: define clear, measurable, testable security requirements (authentication, authorisation, privacy, input validation, error handling); an initial high-level risk assessment; **compliance mapping** to GDPR, HIPAA, PCI DSS and similar.",
        "**Developer responsibilities**: understand the requirements and their implications, take part in requirements review (feasibility), and ask questions about ambiguous or missing security requirements."] },
    { h: "Phase 2: Design and architecture", p: [
        "Security is designed in, not bolted on later."],
      bullets: [
        "**Security activities**: **threat modelling** (assets, attackers, attack vectors, using STRIDE or DREAD), **security architecture review**, defining security controls (encryption, access control, secure protocols), and applying secure design principles (least privilege, defence in depth, secure defaults, separation of duties).",
        "**Developer responsibilities**: contribute to threat modelling using knowledge of how the system really works, use secure design patterns, review designs for weaknesses, and document security decisions and their reasons."] },
    { h: "Phase 3: Implementation and coding", p: [
        "This is where secure coding practices stop vulnerabilities being introduced."],
      bullets: [
        "**Security activities**: secure coding guidelines (for example OWASP and CERT standards), **SAST** in the IDE and CI/CD, **secrets management** (no hardcoded credentials), **SCA** for dependencies, and peer code reviews with a security focus.",
        "**Developer responsibilities**: write secure code, validate and sanitise all input, handle errors securely, manage sessions securely, use security-hardened APIs and libraries, keep dependencies updated, take part in security code reviews, and fix SAST findings promptly."] },
    { h: "Phase 4: Testing and verification", p: [
        "Here the team checks that the software meets its security requirements."],
      bullets: [
        "**Security activities**: **DAST** from an attacker's perspective, **penetration testing** by ethical hackers, vulnerability scanning, **security regression testing** (fixes do not introduce new flaws and old flaws stay fixed), and security-focused acceptance testing.",
        "**Developer responsibilities**: support testers with access and documentation, reproduce and fix vulnerabilities, write security-focused unit and integration tests, and review security test plans."] },
    { h: "Phase 5: Deployment and operations", p: [
        "Security continues after release. This phase includes maintenance."],
      bullets: [
        "**Security activities**: secure configuration management and hardening, **vulnerability management** with timely patching, security monitoring and logging, incident response planning and testing, and regular security audits.",
        "**Developer responsibilities**: document secure deployment procedures, support incident response, monitor application security alerts, take part in post-incident reviews, and develop patches for production vulnerabilities."] },
    { h: "How responsibilities evolve and where you work with security", bullets: [
        "**How they evolve**: early on you clarify requirements and design securely. During coding you write and review code and fix tool findings. In testing you support testers and write security tests. After release you support incidents and patches.",
        "**Collaboration points with the security team**: requirements review, threat modelling sessions, security architecture review, security code reviews, penetration test triage and fixing, incident response, and post-incident reviews.",
        "**Why integrate throughout**: late security is expensive, slow and incomplete. Early and continuous security is cheaper, faster and builds a culture of proactive security."],
      say: "My security job changes by phase: I ask questions in requirements, threat model in design, write and review secure code, support testing and fixes, then help with incidents and patches after release." },
    { h: "Comparing secure SDLC models", p: [
        "The exercise asks you to compare models such as Microsoft SDL and OWASP SAMM. The lesson itself does not describe them, so here is a short summary."],
      bullets: [
        "**Microsoft SDL**: a security process originated by Microsoft that adds security activities through development. Its classic phases run from training and requirements through design, implementation and verification to release and response.",
        "**OWASP SAMM**: an open maturity model used to assess and improve a security practice. It has five business functions (Governance, Design, Implementation, Verification, Operations), each with three security practices and maturity levels.",
        "**NIST SSDF (SP 800-218)**: practices in four groups: Prepare the Organization, Protect the Software, Produce Well-Secured Software, Respond to Vulnerabilities.",
        "**BSIMM**: describes what real organisations actually do, measured across many firms, instead of prescribing what to do.",
        "**Key difference**: SDL is a process, SAMM is a way to measure and plan improvement, SSDF is a set of practices and outcomes."],
      beyond: "This comparison is not in the lesson text. Microsoft has updated how it describes the SDL over time, so check Microsoft's current wording before you quote details in an interview.",
      say: "SDL tells a team what activities to run, SAMM lets an organisation measure how mature its practice is, and SSDF gives a common set of secure development practices." }
  ],
  qs: [
    Q("SSDLC", "What is a Secure SDLC (SSDLC)?", "An SDLC that integrates security activities into every phase", ["A security review added after release", "A separate lifecycle only for security teams", "A testing tool"], "Security is part of each phase, not an add-on."),
    Q("SSDLC", "Why is the SSDLC described as proactive?", "It finds and mitigates vulnerabilities early, reducing cost and effort", ["It waits for attackers to report flaws", "It replaces testing", "It only applies after incidents"], "Early detection is cheaper than late repair."),
    Q("Requirements", "Which is a security activity in the requirements phase?", "Defining clear, measurable and testable security requirements", ["Running DAST against production", "Patching live servers", "Penetration testing the release"], "Requirements are written down alongside functional ones."),
    Q("Requirements", "What does compliance mapping mean?", "Mapping requirements to regulations and standards such as GDPR, HIPAA and PCI DSS", ["Mapping servers to data centres", "Drawing the network diagram", "Counting lines of code"], "It ensures compliance from the start."),
    Q("Requirements", "Which is a developer responsibility during requirements?", "Asking questions about ambiguous or missing security requirements", ["Deploying patches", "Running penetration tests", "Writing incident reports"], "Developers clarify what the requirement means for implementation."),
    Q("Design", "Which activity identifies assets, attackers and attack vectors during design?", "Threat modelling", ["Penetration testing", "Vulnerability scanning", "Regression testing"], "STRIDE or DREAD are typical methods."),
    Q("Design", "STRIDE and DREAD are examples of:", "Threat modelling methodologies", ["Encryption algorithms", "CI/CD tools", "Logging formats"], "They help identify and analyse threats."),
    Q("Design", "Which set of principles should be applied in design?", "Least privilege, defence in depth, secure defaults and separation of duties", ["Speed, size, style and syntax", "Fast delivery, low cost and short names", "Open ports, shared accounts and default passwords"], "These shape secure architecture."),
    Q("Design", "Which is a developer responsibility in the design phase?", "Participating in threat modelling and documenting security decisions", ["Executing penetration tests", "Rotating production credentials", "Training end users"], "Developers know how the system really works."),
    Q("Implementation", "Which tools analyse source code in the IDE and CI during implementation?", "SAST", ["DAST", "SIEM", "Load balancers"], "Static analysis runs without executing the program."),
    Q("Implementation", "Why must secrets such as API keys not be hardcoded?", "Credentials in source code leak through repositories, so they need secrets management", ["They make the build slower", "Compilers reject them", "They break unit tests"], "Secrets belong in a managed store, not in code."),
    Q("Implementation", "Which implementation task helps prevent injection attacks?", "Input validation and sanitisation for all user input", ["Choosing a bigger server", "Adding more logging only", "Longer password policies only"], "Treat all external input as untrusted."),
    Q("Implementation", "Which is part of secure session management?", "Generating unpredictable session IDs and invalidating them on logout", ["Using sequential session IDs", "Keeping sessions valid forever", "Putting session IDs in URLs"], "Predictable or long-lived sessions are easy to hijack."),
    Q("Implementation", "Secure error handling should:", "Avoid leaking sensitive information in error messages", ["Show full stack traces to users", "Hide all errors from developers", "Return database errors to the browser"], "Log detail internally, show generic messages externally."),
    Q("Implementation", "What is a developer's responsibility for dependencies?", "Regularly update third-party libraries to reduce known vulnerabilities", ["Never update them", "Copy libraries into the repo and forget them", "Only update when the app breaks"], "Outdated components are a top OWASP risk."),
    Q("Implementation", "Peer code reviews with a security focus aim to:", "Find security flaws and check adherence to secure coding guidelines", ["Rewrite the architecture", "Approve every pull request quickly", "Replace automated tools"], "Human review complements tools."),
    Q("Testing", "Which activity tests the running application from an attacker's perspective?", "DAST", ["SAST", "Code formatting", "Unit test linting"], "It can find authentication bypass and broken access control."),
    Q("Testing", "What is security regression testing?", "Checking that fixes do not introduce new flaws and fixed flaws stay fixed", ["Testing only brand new features", "Reverting the code to an older version", "Removing old tests"], "It protects previous security improvements."),
    Q("Testing", "Which is a developer responsibility in testing?", "Writing security-focused unit and integration tests", ["Choosing the company's insurance", "Approving penetration test budgets", "Designing the network layout"], "Developers test that security controls work."),
    Q("Testing", "Security-focused acceptance testing verifies:", "That implemented controls meet the defined security requirements", ["That the UI colours match the design", "That the team met its velocity target", "That the code compiles"], "It closes the loop with the requirements phase."),
    Q("Testing", "Penetration testing belongs mainly to which phase?", "Testing and verification", ["Requirements", "Design", "Implementation"], "Ethical hackers simulate attacks on the built software."),
    Q("Deployment", "Which activity belongs to deployment and operations?", "Secure configuration management and vulnerability management", ["Writing user stories", "Drawing the first architecture", "Choosing programming language"], "Security continues after release."),
    Q("Deployment", "After an incident, developers should:", "Support the response, take part in post-incident reviews and contribute patches", ["Leave it to others entirely", "Delete the logs", "Blame the testers"], "Learning from incidents improves future work."),
    Q("Deployment", "Which provides ongoing detection of incidents in production?", "Security monitoring and logging", ["Unit tests", "Wireframes", "Code comments"], "You need visibility to detect incidents."),
    Q("Mapping", "Threat modelling belongs mainly to which phase?", "Design and architecture", ["Deployment and operations", "Testing", "Maintenance only"], "It informs architectural decisions before code exists."),
    Q("Responsibilities", "How do developer security responsibilities evolve through a project?", "From clarifying requirements and designing securely, to writing secure code, supporting testing, then supporting incidents and patches", ["They stay the same throughout", "They only matter at the end", "They only matter in design"], "Each phase asks for different security work."),
    Q("Collaboration", "Which is a typical collaboration point between developers and the security team?", "Threat modelling sessions and security architecture reviews", ["Choosing office furniture", "Writing marketing copy", "Setting sales targets"], "Other points: security code reviews, pen test triage and incident response."),
    Q("Models", "OWASP SAMM is best described as:", "A maturity model for measuring and improving an organisation's software security practice", ["A list of web vulnerabilities", "A penetration testing tool", "A certifiable ISO standard"], "It helps assess where you are and plan improvement."),
    Q("Models", "Which statement about NIST SSDF is correct?", "It is a set of secure software development practices (SP 800-218)", ["It is a web vulnerability list", "It is a penetration test tool", "It replaces the SDLC"], "It can be used alongside the NIST CSF.")
  ],
  match: [
    M("Match the SDLC phase to a security activity", "One typical activity per phase.", [
      ["Requirements", "Define testable security requirements and map to compliance"],
      ["Design", "Threat modelling and security architecture review"],
      ["Implementation", "SAST, secrets management and security-focused code review"],
      ["Testing", "DAST, penetration testing and security regression testing"],
      ["Deployment and operations", "Secure configuration, vulnerability management and monitoring"]]),
    M("Match the SDLC phase to a developer responsibility", "What does the developer do at each phase?", [
      ["Requirements", "Ask security questions about ambiguous requirements"],
      ["Design", "Participate in threat modelling and document security decisions"],
      ["Implementation", "Validate input, handle errors securely and update dependencies"],
      ["Testing", "Write security tests and fix reproduced vulnerabilities"],
      ["Deployment and operations", "Support incident response and contribute patches"]]),
    M("Match the term to its definition", "Core vocabulary from the lesson.", [
      ["Compliance mapping", "Mapping requirements to regulations and standards"],
      ["Secrets management", "Handling API keys and passwords without hardcoding them"],
      ["Security regression testing", "Confirming fixes hold and introduce no new flaws"],
      ["Vulnerability management", "Continuously monitoring for new vulnerabilities and patching on time"],
      ["Threat modelling", "Identifying assets, attackers and attack vectors in design"]]),
    M("Match the secure SDLC model to its description (beyond the course)", "Compare the models.", [
      ["Microsoft SDL", "A security process with activities running from training to response"],
      ["OWASP SAMM", "A maturity model across five business functions"],
      ["NIST SSDF", "A set of practices in four groups, from preparing the organisation to responding to vulnerabilities"],
      ["BSIMM", "A descriptive study of what real organisations do"]])
  ],
  order: [
    O("Put the secure SDLC phases in order", "From first phase to last.", [
      "Requirements and analysis",
      "Design and architecture",
      "Implementation and coding",
      "Testing and verification",
      "Deployment and operations"])
  ],
  open: [
    E("Identify the security activities for each SDLC phase.", [
      "Requirements: security requirements, initial risk assessment, compliance mapping.",
      "Design: threat modelling, architecture review, security controls, secure design principles.",
      "Implementation: secure coding guidelines, SAST, secrets management, SCA, security code reviews.",
      "Testing: DAST, penetration testing, vulnerability scanning, regression and acceptance testing.",
      "Deployment and operations: secure configuration, vulnerability management, monitoring and logging, incident response planning, audits."]),
    E("Explain the importance of integrating security throughout the SDLC.", [
      "Early security finds flaws when they are cheapest to fix.",
      "It avoids last-minute delays and emergency patches.",
      "Every phase creates different risks, so each needs its own security work.",
      "It builds a culture where developers own security instead of leaving it to a final gate."]),
    E("Compare secure SDLC models such as Microsoft SDL and OWASP SAMM.", [
      "Microsoft SDL: a process that adds security activities through development.",
      "OWASP SAMM: a maturity model for assessing and improving a security practice across five business functions.",
      "NIST SSDF: a set of practices (prepare, protect, produce, respond) that suppliers can follow.",
      "Choice depends on need: SDL for process, SAMM for measurement and roadmap, SSDF for a common baseline."],
      "This content goes beyond the lesson text, so confirm details on the official sites."),
    E("Explain how developer responsibilities evolve through the project lifecycle.", [
      "Requirements: understand and question security requirements.",
      "Design: contribute to threat modelling and secure design.",
      "Implementation: write secure code, validate input, manage dependencies, fix tool findings.",
      "Testing: support testers, reproduce and fix issues, write security tests.",
      "Operations: support incidents, monitor and patch."]),
    E("Identify collaboration points with security teams.", [
      "Requirements review and compliance mapping.",
      "Threat modelling sessions and security architecture review.",
      "Security-focused code reviews and tool tuning.",
      "Penetration test triage and remediation.",
      "Incident response and post-incident reviews."]),
    E("Scenario: your team is adding profile picture uploads. What security activities do you do in each phase?", [
      "Requirements: define allowed file types and sizes, who can upload, privacy requirements.",
      "Design: threat model with STRIDE (malicious files, tampering, denial of service with huge files, information disclosure). Plan to store files outside the web root with random names.",
      "Implementation: validate type and size on the server, scan files, avoid trusting file names, use SAST and review.",
      "Testing: security tests and DAST for upload attacks, regression tests.",
      "Operations: least privilege storage, monitoring of unusual uploads, patch plan."])
  ]
};
