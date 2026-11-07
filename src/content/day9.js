import { Q, M, E, O } from "../lib/helpers.js";

export default {
  id: 9, day: 9, short: "Planning & Analysis", title: "Secure SDLC: Planning and Analysis",
  outcome: "Define security requirements, perform a risk analysis, set security objectives and success criteria, and do early threat modelling before any code is written.",
  theory: [
    { h: "Why planning is where security starts", p: [
        "Before a single line of code is written, security has to be anticipated. A strong foundation matters for a building, and planning and analysis matter just as much for secure software. Doing this early reduces the vulnerabilities that appear later in the lifecycle."] },
    { h: "Security requirements: eight types", p: [
        "Functional requirements describe what a system does. **Security requirements describe what the system must be** to protect its assets and functions."],
      bullets: [
        "**Confidentiality**: protect sensitive data. Examples: encryption at rest and in transit, RBAC, data masking.",
        "**Integrity**: keep data accurate and protected from unauthorised change. Examples: data validation, digital signatures, checksums.",
        "**Availability**: keep the system accessible. Examples: redundancy, fault tolerance, DoS prevention.",
        "**Authentication**: verify identity. Examples: MFA, strong password policies, secure identity management.",
        "**Authorisation**: decide what an authenticated party may do. Examples: granular access controls, privilege management.",
        "**Non-repudiation**: nobody can deny an action. Examples: digital signatures, audit trails.",
        "**Accountability**: track and audit actions. Examples: comprehensive logging and monitoring.",
        "**Privacy**: control how personal data is collected, used, stored and disclosed, in line with laws such as GDPR and CCPA."],
      say: "Security requirements describe what the system must be, and I group them as confidentiality, integrity, availability, authentication, authorisation, non-repudiation, accountability and privacy." },
    { h: "How to define and document security requirements", p: [
        "Defining requirements is iterative and involves business analysts, security architects, developers and compliance officers."],
      bullets: [
        "**Asset identification**: find what needs protection (sensitive data, intellectual property, critical functions).",
        "**Stakeholder interviews**: understand concerns, regulatory obligations and risk tolerance.",
        "**Use and misuse cases**: besides legitimate use, describe how an attacker might abuse the system. Misuse cases reveal **negative requirements**, which say what the system must not do.",
        "**Standards and regulations**: use OWASP, NIST SP 800-53 and relevant laws to cover gaps.",
        "**Prioritisation**: rank by asset criticality and the likelihood and impact of threats.",
        "**Documentation**: clear, unambiguous and **testable**, integrated into the overall requirements.",
        "**Developer contributions**: technical feasibility input, spotting implicit requirements, asking clarifying questions, and contributing to misuse cases."],
      beyond: "Example of a weak versus a testable requirement. Weak: 'The system must be secure.' Testable: 'Passwords are stored with a salted bcrypt or Argon2 hash, and an account locks for 15 minutes after 5 failed logins.' The second can be checked in a test. This example is not from the lesson text.",
      say: "Good security requirements are specific and testable, and I use misuse cases to find what the system must not allow." },
    { h: "Performing a risk analysis", p: [
        "Risk analysis systematically identifies, assesses and prioritises security risks so that effort goes where it matters. Follow these steps in order."],
      bullets: [
        "**1. Asset identification**: data, software, hardware and services, with their criticality and sensitivity.",
        "**2. Threat identification**: malicious (attackers, insiders) and non-malicious (disasters, failures). Threat modelling helps.",
        "**3. Vulnerability identification**: technical flaws, process weaknesses and human factors.",
        "**4. Likelihood assessment**: how probable is exploitation, considering attacker capability, existing controls and history. Qualitative (low, medium, high) or quantitative.",
        "**5. Impact assessment**: financial, reputational, operational, legal or loss of life.",
        "**6. Risk calculation and prioritisation**: combine likelihood and impact, often in a **risk matrix**. **Risk = Likelihood × Impact**.",
        "**7. Control identification and recommendation**: technical (encryption, firewalls), administrative (policies, training) or physical (data centre access) controls."],
      say: "I identify assets, threats and vulnerabilities, rate likelihood and impact, rank the risks on a matrix, and then recommend controls for the highest ones." },
    { h: "Risk treatment strategies", bullets: [
        "**Risk acceptance**: acknowledge the risk and take no action, usually because mitigation costs more than the impact or the likelihood is very low.",
        "**Risk avoidance**: remove the activity that creates the risk, for example do not build a feature that adds large risk.",
        "**Risk mitigation**: reduce likelihood or impact with controls such as secure coding and security tools.",
        "**Risk transfer (or sharing)**: shift the financial burden to another party, typically through insurance.",
        "**Developer's role in risk analysis**: identify technical vulnerabilities, estimate likelihood and technical impact realistically, propose mitigations and understand the business context of each risk."] },
    { h: "Security objectives and success criteria", p: [
        "Security objectives state what the project must achieve in security terms, and success criteria say how you will know. The lesson names these ideas, and ties them to business and technical needs, but does not detail them."],
      bullets: [
        "**Objectives** come from the requirements and risk analysis (for example, protect customer payment data and keep the service available).",
        "**Success or acceptance criteria** make objectives measurable and testable.",
        "**Testing requirements** say which checks must pass before release."],
      beyond: "Examples of measurable acceptance criteria: 'All API endpoints require authentication', 'No critical or high findings from SAST and SCA at release', 'Failed logins are logged and alerted on'. These are typical examples and not from the lesson text.",
      say: "I turn objectives into acceptance criteria that can be tested, so security is part of the definition of done." },
    { h: "Threat modelling in the planning phase", p: [
        "Do threat modelling early, using the requirements and a first data flow diagram, so that findings can shape architecture and design before code exists. Apply **STRIDE** to each component and data flow, as in Lesson 3."],
      bullets: [
        "**Identify assumptions and constraints**: for example 'the internal network is trusted' or 'users only use managed devices'. Wrong assumptions create blind spots, so write them down and challenge them.",
        "**Document findings**: asset, threat (STRIDE category), vulnerability, likelihood, impact, risk rating, mitigation, owner and status.",
        "**Document mitigations** and link them to security requirements and test cases."],
      say: "In planning I apply STRIDE to the first design, write down my assumptions, and record each threat with a risk rating and a mitigation." },
    { h: "Planning security architecture and testing strategy", bullets: [
        "**Security architecture and design planning**: decide trust boundaries, where controls will sit and which secure design principles to apply, using threat model results.",
        "**Security testing strategy**: decide early which tests will run (SAST, DAST, SCA, penetration testing, security unit tests) and which requirements each test verifies.",
        "**Value of planning testing early**: requirements stay testable, time, tools and budget are reserved, and gaps in coverage show up before the build.",
        "**Align success criteria** with both business needs and technical needs."],
      beyond: "The exercise suggests adding your scenario to GitHub. A repository containing your asset list, STRIDE table, risk matrix and mitigations makes a strong portfolio piece that shows you can think like a security-aware developer.",
      say: "I plan the test strategy in the same phase as the requirements, so every security requirement has a way to be verified." }
  ],
  qs: [
    Q("Requirements", "How do security requirements differ from functional requirements?", "They describe what the system must be to protect its assets, not what it does", ["They are optional extras", "They only apply to the database", "They are written after testing"], "Functional requirements describe behaviour. Security requirements describe protection."),
    Q("Requirement types", "Requiring MFA for all admin logins is mainly which type of requirement?", "Authentication", ["Availability", "Privacy", "Non-repudiation"], "Authentication verifies identity."),
    Q("Requirement types", "Granular access controls and privilege management are which type?", "Authorisation", ["Authentication", "Integrity", "Availability"], "Authorisation decides what a verified user may do."),
    Q("Requirement types", "Audit trails and digital signatures that prevent someone denying an action are which type?", "Non-repudiation", ["Availability", "Confidentiality", "Privacy"], "They provide proof of who did what."),
    Q("Requirement types", "Comprehensive logging and monitoring of actions is mainly:", "Accountability", ["Availability", "Authentication", "Confidentiality"], "It lets you track and audit actions."),
    Q("Requirement types", "Rules on collecting, storing and disclosing personal data under GDPR or CCPA are:", "Privacy requirements", ["Availability requirements", "Integrity requirements", "Performance requirements"], "Privacy covers the lifecycle of personal data."),
    Q("Requirement types", "Redundancy, fault tolerance and DoS prevention are which type?", "Availability", ["Integrity", "Authorisation", "Privacy"], "They keep the system accessible when needed."),
    Q("Requirement types", "Checksums, digital signatures and data validation are mainly which type?", "Integrity", ["Availability", "Privacy", "Accountability"], "They protect data from unauthorised change."),
    Q("Defining requirements", "What is a misuse case?", "A scenario describing how an attacker might abuse the system, used to find negative requirements", ["A test case that always passes", "A user story about billing", "A list of unused features"], "Misuse cases help discover what the system must not do."),
    Q("Defining requirements", "Negative security requirements describe:", "What the system must not do", ["What the system looks like", "Who pays for the system", "Which language to use"], "They block abuse paths."),
    Q("Defining requirements", "Which is the first key activity when defining security requirements?", "Asset identification", ["Penetration testing", "Patch management", "Deployment"], "You must know what needs protecting."),
    Q("Defining requirements", "Which sources can guide security requirements?", "OWASP, NIST SP 800-53 and relevant laws and regulations", ["Social media trends", "Competitor adverts", "Team preferences only"], "Standards and regulations give broad coverage."),
    Q("Defining requirements", "How should security requirements be documented?", "Clearly, unambiguously and in a testable format", ["Vaguely, so they stay flexible", "Only verbally", "Only in the test plan"], "If it cannot be tested, it cannot be verified."),
    Q("Defining requirements", "Which is a developer contribution to security requirements?", "Advising on technical feasibility and spotting implicit requirements", ["Setting the legal budget", "Choosing the logo", "Signing contracts"], "Developers know what is feasible and what is missing."),
    Q("Risk analysis", "Which is the correct order of the first three risk analysis steps?", "Asset identification, threat identification, vulnerability identification", ["Impact assessment, asset identification, control identification", "Control identification, asset identification, threat identification", "Vulnerability identification, risk calculation, asset identification"], "You must know the asset before you can think about its threats and weaknesses."),
    Q("Risk analysis", "Risk is conceptually calculated as:", "Likelihood × Impact", ["Threat + Asset", "Cost ÷ Time", "Impact − Likelihood"], "It combines how probable and how severe."),
    Q("Risk analysis", "On a risk matrix, which risk needs immediate attention?", "High likelihood and high impact", ["Low likelihood and low impact", "High likelihood and negligible impact", "Low likelihood and low cost"], "Highest combined score first."),
    Q("Risk analysis", "Likelihood assessment considers which factors?", "Attacker capabilities, existing controls and historical data", ["Office size and furniture", "Number of developers only", "The colour scheme"], "These affect how probable exploitation is."),
    Q("Risk analysis", "Which is NOT an impact category named in the lesson?", "Developer job satisfaction", ["Financial loss", "Reputational damage", "Legal penalties"], "Impact categories include financial loss, reputational damage, operational disruption, legal penalties and loss of life."),
    Q("Risk analysis", "What is a developer's role in risk analysis?", "Identifying technical vulnerabilities and estimating likelihood and impact realistically", ["Approving the financial budget", "Deciding the company's insurance", "Negotiating contracts"], "Developers know the codebase and architecture."),
    Q("Treatment", "A team removes a risky feature instead of securing it. Which treatment is this?", "Risk avoidance", ["Risk acceptance", "Risk transfer", "Risk mitigation"], "The activity that creates the risk is eliminated."),
    Q("Treatment", "Buying cyber insurance to cover financial loss is:", "Risk transfer", ["Risk avoidance", "Risk acceptance", "Risk mitigation"], "The financial burden shifts to another party."),
    Q("Treatment", "Deciding to take no action because mitigation costs more than the likely impact is:", "Risk acceptance", ["Risk avoidance", "Risk transfer", "Risk mitigation"], "It is a deliberate decision and should be recorded."),
    Q("Treatment", "Applying secure coding practices and deploying security tools to lower likelihood or impact is:", "Risk mitigation", ["Risk acceptance", "Risk transfer", "Risk avoidance"], "Controls reduce the risk."),
    Q("Objectives", "Which is a well-formed security acceptance criterion?", "All API endpoints must require authentication, and the build fails on any critical SAST finding", ["The system should be very secure", "Developers will try their best", "Security will be reviewed if time permits"], "Measurable and testable criteria can be verified."),
    Q("Threat modelling", "Why threat model in the planning phase?", "It identifies attack vectors that inform architecture and design before code exists", ["It replaces security testing", "It satisfies a formality only", "It is only for compliance audits"], "Early findings are cheap to act on."),
    Q("Threat modelling", "A threat model document typically records:", "Assets, threats, vulnerabilities, risk ratings, mitigations and assumptions", ["Only the team's names", "Only the budget", "Only code snippets"], "It captures the reasoning behind security decisions."),
    Q("Threat modelling", "Why record security assumptions and constraints?", "Wrong assumptions such as 'the internal network is trusted' create gaps, so they must be visible and challenged", ["Assumptions are always correct", "They make the document longer", "Regulators require long documents"], "Hidden assumptions are a common source of design flaws."),
    Q("Testing strategy", "What is the value of planning a security testing strategy early?", "Requirements stay testable and time, tools and budget are planned for testing", ["It removes the need for testing later", "It guarantees no vulnerabilities", "It lets the team skip requirements"], "Planning early closes coverage gaps before building.")
  ],
  match: [
    M("Match the security requirement to its type", "Scenario to requirement type.", [
      ["All users log in with a password and a one-time code", "Authentication"],
      ["Only HR staff can see salary fields", "Authorisation"],
      ["Every payment approval records who did it and when", "Accountability"],
      ["Approvals cannot be denied later because they are digitally signed", "Non-repudiation"],
      ["Customer addresses are deleted when a user withdraws consent", "Privacy"],
      ["The service keeps running if one server fails", "Availability"],
      ["Uploaded files are checked for tampering using checksums", "Integrity"],
      ["Card numbers are encrypted in the database", "Confidentiality"]]),
    M("Match the risk analysis step to what it does", "The seven steps.", [
      ["Asset identification", "Find and rate what needs protection"],
      ["Threat identification", "List who or what could cause harm"],
      ["Vulnerability identification", "Find weaknesses that threats could exploit"],
      ["Likelihood assessment", "Estimate how probable exploitation is"],
      ["Impact assessment", "Estimate the harm if it succeeds"],
      ["Risk calculation and prioritisation", "Combine likelihood and impact and rank the risks"],
      ["Control identification and recommendation", "Choose technical, administrative or physical controls"]]),
    M("Match the risk treatment strategy to an example", "Four strategies.", [
      ["Risk acceptance", "Recording and accepting a low-likelihood cosmetic issue"],
      ["Risk avoidance", "Dropping a feature that adds large unmanageable risk"],
      ["Risk mitigation", "Adding input validation and a WAF"],
      ["Risk transfer", "Buying cyber insurance"]]),
    M("Match the threat model field to what it records", "Documenting findings.", [
      ["Asset", "What needs protecting"],
      ["Threat", "Who or what could cause harm, ideally labelled with a STRIDE category"],
      ["Vulnerability", "The weakness that lets the threat succeed"],
      ["Likelihood × impact", "The risk rating used to prioritise"],
      ["Mitigation", "The control chosen to reduce the risk"],
      ["Assumption", "Something taken as true that must be checked"]])
  ],
  order: [
    O("Put the risk analysis steps in order", "From first step to last.", [
      "Asset identification",
      "Threat identification",
      "Vulnerability identification",
      "Likelihood assessment",
      "Impact assessment",
      "Risk calculation and prioritisation",
      "Control identification and recommendation"])
  ],
  open: [
    E("How should security requirements be gathered and documented?", [
      "Gather: identify assets, interview stakeholders, write use and misuse cases, refer to standards and regulations, and prioritise by risk.",
      "Document: clearly, unambiguously and in a testable format, inside the main requirements document.",
      "Cover all types: confidentiality, integrity, availability, authentication, authorisation, non-repudiation, accountability and privacy."]),
    E("Scenario: a student-built online clothing store keeps customer names, emails and addresses and takes card payments through a third-party gateway. Perform a security risk analysis.", [
      "Assets: customer personal data, order history, admin accounts, payment gateway integration, the availability of the store.",
      "Threats: cybercriminals (data theft, card fraud), script kiddies (defacement, DoS), an insider mistake, a vulnerable dependency.",
      "Vulnerabilities: weak admin login, missing input validation, outdated libraries, misconfigured storage.",
      "Rate likelihood and impact for each pair, for example SQL injection exposing customer data: likelihood medium, impact high, so risk high.",
      "Treatment: mitigate (parameterised queries, MFA for admins, dependency scanning, HTTPS), transfer part to the payment gateway (do not store card data), accept low risks, avoid features you cannot secure.",
      "Put the table in a GitHub README as a portfolio piece."]),
    E("Define security acceptance criteria and testing requirements for a login feature.", [
      "Passwords are stored with a salted bcrypt or Argon2 hash.",
      "Accounts lock temporarily after repeated failed logins, and attempts are rate limited.",
      "Error messages are generic, and failed logins are logged.",
      "MFA is available for sensitive roles.",
      "Testing: security unit tests for hashing and lockout, SAST with no critical findings, DAST scan for authentication and session issues, and a review of session handling."]),
    E("Case study: early threat modelling for a telehealth appointment booking app. Walk through it.", [
      "Decompose: patient, web app, API, database, notification service, payment provider. Draw a data flow diagram.",
      "Apply STRIDE: spoofing (fake patient or doctor logins), tampering (changing appointment or record data), repudiation (denying a booking), information disclosure (health records leak), denial of service (booking system down), elevation of privilege (patient reaching clinician functions).",
      "Mitigations: MFA, access control and least privilege, audit logging, encryption in transit and at rest, rate limiting, and privacy controls for health data.",
      "Record likelihood, impact, owner and status for each threat."]),
    E("Identify security assumptions and constraints for a mobile banking app.", [
      "Assumptions: users' phones may be lost or compromised, networks are untrusted, third-party SDKs may have flaws, backend services trust only authenticated requests.",
      "Constraints: regulations (for example PCI DSS and data protection law), performance and usability limits, support for older devices, budget and deadline.",
      "Write each down, test the risky ones, and update the threat model when they change."]),
    E("What should be documented in a threat model, and why?", [
      "Scope and data flow diagram, assets, assumptions and constraints.",
      "Threats by STRIDE category, vulnerabilities, likelihood, impact and risk rating.",
      "Mitigations, owners and status, linked to security requirements and tests.",
      "Why: it shows reasoning, supports review and audit, and lets the team update it as the design changes."]),
    E("Explain the value of planning a security testing strategy during planning and analysis.", [
      "Requirements are written so they can be tested.",
      "Time, tools and budget are reserved for security testing.",
      "Gaps in coverage appear before the build, when they are cheap to fix.",
      "Developers know what will be checked and can build to pass."]),
    E("Explain the four risk treatment strategies with an example each.", [
      "Acceptance: accept a low-likelihood, low-impact issue because fixing costs more.",
      "Avoidance: drop a feature that creates risk you cannot control.",
      "Mitigation: add controls such as validation, encryption or MFA.",
      "Transfer: use insurance or a third party to carry the financial burden."])
  ]
};
