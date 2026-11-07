import { Q, M, E } from "../lib/helpers.js";

export default { id:1, day:1, short:"Developers & Security", title:"Introduction to Cybersecurity for Software Developers",
  outcome:"Explain why security is a shared responsibility, name the developer's duties, and describe shift-left, DevSecOps and the main testing tools.",
  theory:[
   {h:"Why security is your job", p:[
     "Software sits under finance, health, communication and infrastructure, so a flaw you ship becomes someone else's loss. Every endpoint, API, dependency and integration you add widens the **attack surface**: the set of places an attacker can try to get in.",
     "Security used to be a final check by a separate team. The modern model is **shared responsibility**. Developers are the **first line of defence**, and the security team supports them."],
    bullets:[
     "**Bigger attack surface**: dependencies, APIs and integrations are all entry points.",
     "**Faster cycles** (Agile and DevOps): there is no time to bolt security on at the end.",
     "**Cost of late fixes**: fixing a flaw in production can cost **30 to 100 times** more than fixing it in design.",
     "**Regulation**: laws such as GDPR expect security built into the whole process."],
    say:"Security is a shared responsibility. Developers are the first line of defence because our design and coding decisions create or prevent vulnerabilities, and fixing them late costs 30 to 100 times more."},
   {h:"The five developer responsibilities", bullets:[
     "**Cybersecurity ambassador**: translate security requirements into developer tasks, promote good practice, mentor juniors.",
     "**Security-conscious development**: know SQL injection, XSS and authentication bypass, plus threats specific to your stack (prototype pollution in Node.js, IAM misconfiguration in the cloud), and understand the business impact.",
     "**Secure architecture and design**: security by design, secure API design (authentication, authorisation, validation), and data protection (encryption at rest and in transit, access control).",
     "**Secure coding implementation**: input validation, output encoding, safe error handling, dependency management.",
     "**Security testing integration**: security unit tests, SAST, DAST and dependency scanning in CI/CD, and security-focused code reviews."],
    say:"I treat security as part of the definition of done: validated input, encoded output, safe errors, scanned dependencies, and automated security tests in the pipeline."},
   {h:"Shift-left and DevSecOps", p:[
     "**Shift-left** means doing security work in the earliest phases of the SDLC (requirements, design, development) instead of at the end. Benefits: lower cost, faster time to market, better security outcomes and developer empowerment.",
     "**DevSecOps** extends DevOps so security is built into the whole CI/CD pipeline. It rests on three ideas."],
    bullets:[
     "**Automation**: SAST, DAST and dependency scans on every change, infrastructure-as-code scanning, automated compliance checks.",
     "**Continuous monitoring**: real-time vulnerability detection, dashboards and metrics, and developers included in incident response.",
     "**Cultural transformation**: shared responsibility, security policies treated as version-controlled code, continuous learning."],
    say:"Shift-left moves security to the start of the lifecycle, and DevSecOps makes it automatic in the pipeline, so we find issues when they are cheap to fix."},
   {h:"Building a security-first culture", bullets:[
     "**Proactive mindset**: think about security impact before building a feature, assess risk, learn from incidents and near-misses.",
     "**Open communication**: a blame-free environment where people can report mistakes, plus knowledge sharing and cross-team collaboration.",
     "**Education and training**: role-based, hands-on (labs, capture-the-flag), with support for certification.",
     "**How it is built**: visible leadership support and resources, recognition for good practice, security requirements in user stories, security in every code review, automated tests in CI/CD."],
    say:"Culture matters because tools only work when people report problems early. A blame-free team finds issues sooner."},
   {h:"The developer's security toolkit", p:["Four tool categories come up in interviews all the time. Know what each does and when it runs."],
    bullets:[
     "**SAST** (static): analyses source code, bytecode or binaries **without running** the app. Runs in the IDE and CI. Examples: SonarQube, Checkmarx, Veracode.",
     "**DAST** (dynamic): tests a **running** app by simulating external attacks. Finds runtime issues such as auth flaws and server misconfiguration. Examples: OWASP ZAP, Burp Suite.",
     "**SCA** (composition analysis): finds known vulnerabilities in **third-party and open-source dependencies**. Examples: Snyk, Mend, Black Duck.",
     "**IAST** (interactive): instruments the running app and reports from **inside** it, combining static and dynamic strengths with less noise. Examples: Contrast Security, Seeker."],
    say:"SAST reads the code, DAST attacks the running app, SCA checks the libraries I depend on, and IAST watches from inside the app while tests run."},
   {h:"Case study: the Base44 access bypass", p:[
     "Base44 is an AI app-building platform owned by Wix. In July 2025, Wiz researchers found that two authentication endpoints (user registration and OTP verification) could be used with nothing but a target app's **app_id**. That ID was not secret: it appeared in the app's URL and in the path to its manifest.json file.",
     "An attacker could register an account for a private app, verify an email address they controlled, then log in through the app's SSO page. That bypassed authentication, including SSO, and exposed private applications and their data. Wiz reported it on 9 July 2025 and Wix fixed it within about a day. The reporting reached the vendor first, which is responsible disclosure working well."],
    bullets:[
     "**Root cause**: sensitive endpoints were open and the only thing needed was an identifier that was never meant to be a secret.",
     "**Design decision at fault**: treating a public identifier as if it were a credential, and not enforcing access rules on every endpoint, including undocumented ones."],
    say:"An ID identifies, it does not authorise. Every endpoint needs its own authentication and authorisation checks."},
  ],
  qs:[
   Q("Shared responsibility","Which statement best describes the modern view of security in software development?","Security is a shared responsibility, with developers as the first line of defence",["Security belongs to a dedicated team that reviews the product at the end","Security only matters for applications that handle payments","Security is handled by the infrastructure team after deployment"],"The old siloed model no longer works. Developers make the decisions that create or prevent vulnerabilities, so they sit at the front."),
   Q("Shared responsibility","Roughly how much more can it cost to fix a vulnerability in production than in the design phase?","30 to 100 times more",["About the same","2 to 3 times more","Up to 10,000 times more"],"The course cites 30 to 100 times. This is the main economic argument for shift-left."),
   Q("Shared responsibility","Which of these is NOT a driver that expanded the developer's security role?","A decline in third-party libraries, APIs and integrations",["Increased attack surface","Faster development cycles","Stricter regulatory requirements"],"Dependencies, APIs and integrations are increasing, not declining. The four drivers are attack surface, faster cycles, cost of late fixes and regulation."),
   Q("Attack surface","What is the 'attack surface'?","All the points where an attacker could try to enter or extract data from a system",["The single most vulnerable server on the network","The list of known CVEs in your software","The set of users with admin permissions"],"Every endpoint, API, dependency, input field and integration adds to it."),
   Q("Secure coding","User input is echoed into an HTML page. Which practice stops it running as a script in the browser?","Output encoding",["Database indexing","Password hashing","Load balancing"],"Output encoding neutralises data before it is rendered, which prevents XSS. Input validation protects the server side, output encoding protects the browser."),
   Q("Secure coding","User input is concatenated into a SQL query. Which is the primary defence?","Validate and sanitise input, and use parameterised queries",["Add more server memory","Hide the database port","Hash the query text"],"Treat all external input as untrusted. Validation plus parameterised queries stops the input being interpreted as SQL."),
   Q("Secure coding","What is the right error handling for a production app?","Show users a generic message and log the detail internally",["Show the full stack trace so users can report bugs accurately","Hide all errors and never log them","Return the raw database error to help debugging"],"Errors should help developers but not reveal system details to attackers."),
   Q("Security tools","A tool scans your source code in the IDE and CI pipeline without running the application. Which type is it?","SAST",["DAST","SCA","IAST"],"Static testing analyses code without executing it, which allows very early feedback."),
   Q("Security tools","Which tool type tests a running application by simulating external attacks like a malicious user?","DAST",["SAST","SCA","A code review checklist"],"DAST sees the app from outside, so it finds runtime issues such as auth flaws and server misconfiguration."),
   Q("Security tools","Your project depends on an open-source library with a known CVE. Which tool category is built to find this?","SCA (Software Composition Analysis)",["SAST","DAST","Load testing"],"SCA covers the software supply chain: third-party and open-source dependencies."),
   Q("Security tools","Which approach instruments the running application and reports issues from inside, often with less noise than DAST?","IAST",["SAST","SCA","Manual code review"],"IAST is the hybrid: it observes the application as it executes."),
   Q("Security tools","Which pairing is correct?","OWASP ZAP and Burp Suite are DAST tools",["SonarQube is a DAST tool","Snyk is a SAST tool","Contrast Security is an SCA tool"],"SonarQube is SAST, Snyk is SCA, Contrast Security is IAST."),
   Q("Shift-left","What does 'shift-left' mean?","Moving security activities to the earliest phases of the SDLC",["Moving security testing to after release","Moving security work from developers to a separate team","Using only penetration tests at the end"],"Left is earlier on the timeline: requirements and design first."),
   Q("Shift-left","Which is NOT a stated benefit of shift-left?","It removes the need for any later security testing",["Reduced cost","Faster time to market","Developer empowerment"],"Shift-left adds early security work. It does not replace later testing and monitoring."),
   Q("DevSecOps","Which best describes DevSecOps?","Embedding security tools, processes and culture throughout the CI/CD pipeline",["A separate security phase after deployment","A certification for security engineers","A replacement for the SDLC"],"DevSecOps makes security part of continuous delivery instead of a separate stage."),
   Q("DevSecOps","Which belongs under 'continuous security monitoring'?","Real-time vulnerability detection and dashboards after deployment",["A single penetration test before launch","Writing the marketing plan","Archiving old source code"],"Monitoring continues after deployment, and developers take part in incident response."),
   Q("Security culture","A developer admits they committed an API key. In a strong security culture, the response is:","Thank them, rotate the key and treat it as a lesson, with no blame",["Discipline them publicly as a deterrent","Quietly ignore it to avoid panic","Keep it from the security team"],"Blame-free reporting gets problems fixed faster. Punishment makes people hide mistakes."),
   Q("Security culture","Which is a characteristic of strong security training?","Role-based and hands-on, such as labs and capture-the-flag events",["One generic annual slide deck","Training only for the security team","Training only after an incident"],"Training should fit the person's role and technology and include practice."),
   Q("Developer duties","Which responsibility is described as turning security requirements into concrete developer tasks?","Acting as a cybersecurity ambassador",["Security testing integration","Secure coding implementation","Data protection"],"Ambassadors bridge security and development, advocate good practice and mentor juniors."),
   Q("Developer duties","A Node.js developer who knows about prototype pollution is showing:","Technology-specific threat awareness",["Network segmentation knowledge","Compliance knowledge","Physical security awareness"],"Security-conscious developers know the threats tied to their own stack."),
   Q("Base44 case","What did an attacker do with the exposed app_id in the Base44 incident?","Registered and verified an account on a private app, then logged in through SSO",["Brute-forced the admin password","Injected SQL through a search box","Intercepted traffic on the office Wi-Fi"],"The registration and OTP verification endpoints accepted the app_id alone, which let the attacker create a verified user for a private app."),
   Q("Base44 case","Why was the app_id a poor thing to rely on?","It was visible in the app URL and manifest path, so it was never a secret",["It was too short to remember","It was encrypted with a weak algorithm","It changed on every request"],"Identifiers are for identifying. Access must be enforced by authentication and authorisation checks."),
   Q("Base44 case","Which principle would most directly have prevented the bypass?","Enforce authentication and authorisation on every endpoint, and never treat an identifier as a secret",["Encrypt the database at rest","Add a CAPTCHA to the homepage","Buy a larger server"],"The failure was in access control on the endpoints, not in storage or capacity."),
  ],
  match:[
   M("Match the tool to its job","Pick what each tool category does.",[["SAST","Analyses source or bytecode without running the app"],["DAST","Attacks a running app from the outside"],["SCA","Finds known vulnerabilities in third-party libraries"],["IAST","Instruments the running app and reports from inside"]]),
   M("Match the responsibility to an activity","Each of the five developer responsibilities has typical activities.",[["Cybersecurity ambassador","Turning security requirements into developer tasks"],["Security-conscious development","Knowing how SQL injection and XSS work and how to prevent them"],["Secure architecture and design","Choosing encryption for data at rest and in transit and designing authenticated APIs"],["Secure coding implementation","Validating input and encoding output"],["Security testing integration","Running SAST and DAST in the CI/CD pipeline"]]),
   M("Match the term to its meaning","Core vocabulary from the lesson.",[["Attack surface","Every place an attacker could try to get in"],["Shift-left","Doing security work in the earliest SDLC phases"],["DevSecOps","Security embedded across the CI/CD pipeline"],["Security by design","Making security part of architecture decisions from the start"]]),
  ],
  open:[
   E("In 30 seconds: why is security a developer's responsibility and not only the security team's?",[
     "Developers make the design and coding decisions that create or prevent vulnerabilities.",
     "Modern apps have a large attack surface (dependencies, APIs, integrations) and ship fast, so security cannot wait for a final review.",
     "Late fixes cost 30 to 100 times more, and regulation expects security through the whole process.",
     "So security is shared, and developers are the first line of defence."],"Structure: who decides, why it is bigger now, what it costs, conclusion."),
   E("Explain shift-left and why it saves money.",[
     "Shift-left moves security work (requirements, threat modelling, secure design, SAST, code review) to the earliest phases.",
     "A flaw found in design or development needs a small change. The same flaw in production needs an emergency patch, redeploy, possibly breach response and reputational repair.",
     "It also avoids last-minute delays, so time to market improves."]),
   E("What is DevSecOps, and what does it automate or embed?",[
     "DevSecOps builds security into every stage of the CI/CD pipeline instead of treating it as a separate step.",
     "Automation: SAST, DAST and dependency scanning on each change, infrastructure configuration scanning, compliance checks.",
     "Continuous monitoring: real-time detection, dashboards, developers in incident response.",
     "Culture: shared responsibility, policies as version-controlled code, continuous learning."]),
   E("When would you use SAST, DAST, SCA and IAST? One sentence each.",[
     "SAST: early, in the IDE or CI, to find code-level flaws without running the app.",
     "DAST: against a running test or staging environment to find runtime and configuration issues.",
     "SCA: on every build, to catch vulnerable third-party dependencies.",
     "IAST: during functional or integration tests, for accurate findings from inside the running app."]),
   E("Base44, part 1: trace the root cause.",[
     "Registration and OTP verification endpoints were reachable with only the app_id as the key input.",
     "The app_id was public (in the URL and manifest.json path), so it was not a secret and gave no proof of authorisation.",
     "Design decision: an identifier was effectively used as an access control, and endpoints did not enforce that the caller was allowed into a private, SSO-protected app.",
     "Result: an attacker could create and verify an account for a private app and log in via SSO, bypassing authentication."],"The key phrase is 'an identifier is not a credential'."),
   E("Base44, part 2: list the secure practices that would have prevented it.",[
     "Authenticate and authorise every endpoint, including undocumented ones, with checks tied to the app's access settings.",
     "Never treat IDs as secrets. Use unguessable tokens and server-side access checks.",
     "Secure API design: restrict who can register on private or SSO-only apps, rate-limit registration and OTP attempts.",
     "Threat model the sign-up and verification flow with STRIDE (spoofing and elevation of privilege).",
     "Security-focused code review and penetration testing of the authentication paths, plus DAST in CI/CD.",
     "Logging and alerting for unusual registrations, and a vulnerability disclosure channel (which worked well here)."]),
   E("Base44, part 3: how does developer accountability shape an organisation's security posture?",[
     "Every design and coding decision either narrows or widens the attack surface, so the sum of developer decisions is the security posture.",
     "Operationally: one overlooked endpoint exposed private apps and data for every customer, which hits trust, contracts and reputation.",
     "Ethically: customers trust developers with their data and have no way to verify the code. That trust creates a duty of care.",
     "Accountable does not mean blamed. Teams need blame-free reporting, reviews and training so mistakes are caught early and owned openly."]),
  ]
};
