import { Q, M, E } from "../lib/helpers.js";

export default {
  id: 6, day: 6, short: "Why Secure Coding Matters", title: "Why Secure Coding Matters",
  outcome: "Explain why secure coding matters, and use four real breaches (Equifax, Capital One, SolarWinds, Log4Shell) to show the financial, regulatory and reputational cost of insecure code.",
  theory: [
    { h: "Why secure coding is a requirement", p: [
        "Secure coding means writing code so that it prevents vulnerabilities, resists attack, and protects the confidentiality, integrity and availability of data and systems. The lesson cites a survey in which **74% of companies admitted that insecure code had caused a security breach**, so this is a common problem and not a rare one."],
      bullets: [
        "**Protecting sensitive data**: apps hold PII, financial records and intellectual property. Missing input validation can give an attacker SQL injection and a whole database.",
        "**System integrity and availability**: buffer overflows and denial-of-service flaws crash applications, corrupt data and cause outages.",
        "**Preventing financial loss**: theft, incident response, forensics, legal fees, fines and remediation. Prevention is cheaper than a breach.",
        "**Reputation and trust**: breach news spreads fast, and trust is slow to rebuild.",
        "**Regulatory compliance**: GDPR, HIPAA, PCI DSS and national cybersecurity laws expect secure development and handling.",
        "**Less technical debt and rework**: flaws found late need emergency patches and rework. Shift-left avoids that."],
      say: "Secure coding is not polish. It protects data, keeps systems running, avoids fines and keeps customer trust, and it is much cheaper to do early than to repair after a breach." },
    { h: "What insecure code costs a business", bullets: [
        "**Direct costs**: stolen money, incident response, forensic investigation, legal fees, regulatory fines, remediation.",
        "**Reputation and trust**: customer loyalty, market share and investor confidence all suffer.",
        "**Regulatory penalties**: fines, legal penalties and operational restrictions for non-compliance.",
        "**Operational disruption**: outages and emergency work while the team fixes things under pressure.",
        "**Technical debt from a security view**: every vulnerability found late forces rework, patches and workarounds. That makes future development more complex and expensive, and the debt keeps growing until it is repaid."],
      beyond: "The lesson names GDPR, HIPAA and PCI DSS. For South African work, also know POPIA (Protection of Personal Information Act), which expects organisations to protect personal information with reasonable technical and organisational measures and to report breaches. Read the current text before you quote details in an interview.",
      say: "Insecure code creates a bill with several lines on it: fines, forensics, lawsuits, lost customers and rework. Secure coding is how I keep that bill small." },
    { h: "Case study 1: Equifax (2017)", p: [
        "**Cause**: a critical flaw in Apache Struts (CVE-2017-5638). It was a remote code execution bug caused by improper input validation in the Jakarta Multipart parser, so attackers could run arbitrary code on the server. A patch had been available for months, but Equifax did not apply it in time."],
      bullets: [
        "**Impact**: personal data of about **147 million** Americans, including names, Social Security numbers, birth dates, addresses and sometimes driver's licence numbers.",
        "**Money**: a global settlement of up to **$700 million** with the FTC, the CFPB and 50 US states and territories.",
        "**Reputation and leadership**: public backlash, a falling share price, and resignation of the CEO and other executives.",
        "**Scrutiny**: pressure for stronger data security laws.",
        "**Lesson**: failing to patch a known flaw in a component is as dangerous as writing the flaw yourself. Maps to OWASP A06 Vulnerable and Outdated Components."],
      say: "Equifax shows that a known, patchable flaw in a framework can expose 147 million people. Dependency scanning and fast patching are part of secure coding." },
    { h: "Case study 2: Capital One (2019)", p: [
        "**Cause**: an attacker exploited a **server-side request forgery (SSRF)** weakness through a **misconfigured web application firewall**. The WAF could be tricked into relaying requests to the AWS metadata service, which exposed credentials and let the attacker read data in S3 buckets. The attacker was a former AWS employee."],
      bullets: [
        "**Impact**: over 100 million customers in the US and about 6 million in Canada. Exposed data included names, addresses, phone numbers, email addresses, dates of birth and self-reported income, plus credit scores, payment history and transaction data for some customers.",
        "**Money and legal**: an **$80 million** fine from the OCC for weak risk management, plus class-action lawsuits.",
        "**Reputation**: a blow to public image and customer trust.",
        "**Lesson**: secure coding extends to secure configuration and understanding the cloud environment you deploy into. Maps to OWASP A10 SSRF and A05 Security Misconfiguration."],
      beyond: "Public reports on this breach also pointed to an over-privileged role attached to the firewall, which is a least privilege failure. AWS later introduced IMDSv2, which makes stealing credentials from the metadata service through SSRF much harder. Both are good talking points.",
      say: "Capital One shows that a configuration mistake plus SSRF can be as damaging as a code bug, and that least privilege on cloud roles limits how far an attacker can go." },
    { h: "Case study 3: SolarWinds (2020)", p: [
        "**Cause**: a supply chain attack. Attackers compromised SolarWinds' build environment and inserted malicious code (called **SUNBURST**) into legitimate updates for the Orion IT management software. Customers who installed the update installed the backdoor themselves."],
      bullets: [
        "**Impact**: thousands of organisations, including several US government agencies (Treasury, Commerce, Homeland Security).",
        "**Espionage**: attackers could reach sensitive data for months before detection.",
        "**National security**: widespread investigations and a rethink of cyber defences.",
        "**Industry effect**: unprecedented attention on software supply chain security.",
        "**Lesson**: protect the build pipeline and verify integrity of what you ship (secure build processes, code signing and integrity checks). Maps to OWASP A08 Software and Data Integrity Failures."],
      beyond: "After SolarWinds, the US government's 2021 executive order on cybersecurity pushed secure software requirements for suppliers. NIST's SSDF (SP 800-218, from Lesson 4) and software bills of materials (SBOMs) became part of that response.",
      say: "SolarWinds shows that attackers can target the build pipeline instead of the app, so I treat the pipeline as part of the attack surface." },
    { h: "Case study 4: Log4Shell (2021)", p: [
        "**Cause**: CVE-2021-44228, a critical remote code execution flaw in Apache Log4j, a logging library used in countless Java applications. A feature allowed lookups through JNDI (Java Naming and Directory Interface), so simply logging a crafted string could make the server load and run attacker-controlled code. It was present in the default configuration of versions 2.0-beta9 to 2.14.1."],
      bullets: [
        "**Widespread impact**: cloud providers, enterprise software and consumer apps were all affected.",
        "**Immediate exploitation**: attackers scanned for and exploited it within hours.",
        "**Urgent patching**: teams worked around the clock, during the holiday season, just to find where Log4j was used.",
        "**Supply chain risk**: it showed the risk of widely used open-source components and the difficulty of tracking them.",
        "**Lesson**: a dangerous feature that is on by default breaks the secure defaults principle. Know your dependencies, use SCA, and treat logged data as untrusted. Maps to OWASP A06 and A03 Injection."],
      say: "Log4Shell shows that libraries are part of my code. I need an inventory of my dependencies so I can find and patch fast." },
    { h: "Comparing the four cases", bullets: [
        "**Equifax**: unpatched vulnerable component. Failure type: patch and dependency management.",
        "**Capital One**: SSRF plus misconfiguration in the cloud. Failure type: configuration and least privilege.",
        "**SolarWinds**: tampering with the build and update process. Failure type: supply chain and integrity.",
        "**Log4Shell**: dangerous default feature in a ubiquitous library. Failure type: component risk and secure defaults.",
        "**Common thread**: each started small (one missed patch, one setting, one compromised build, one feature) and became a huge business problem. None was only a technical problem."] },
    { h: "Making the business case for secure coding", p: [
        "Developers who can explain security in business terms are more influential, and this is the skill the lesson ends on: security advocacy."],
      bullets: [
        "**Use real numbers and cases**: fines, settlements, executives who resigned. Equifax and Capital One make strong examples.",
        "**Frame it as risk**: likelihood times impact, with a business owner for each risk.",
        "**Compare costs**: prevention (training, tools, review time) is small next to fines, forensics, lawsuits and lost customers.",
        "**Link to business continuity**: secure code means fewer outages, less emergency patching and faster recovery, so the business keeps running.",
        "**Show that it does not have to slow delivery**: automation in CI/CD finds issues early with fast feedback.",
        "**Propose concrete steps**: dependency scanning, security in code review, threat modelling for new features."],
      say: "To justify secure coding to management, I compare the small cost of prevention with the very large cost of one breach, and I use real cases." }
  ],
  qs: [
    Q("Imperative", "Which statement best explains why secure coding is more than a 'best practice'?", "It is a fundamental requirement for software that is reliable, trustworthy and compliant", ["It is optional polish added after launch", "It only matters for banks", "It only matters after a company has been breached"], "Secure coding protects data, keeps systems running, supports compliance and preserves trust."),
    Q("Imperative", "What did the survey cited in the lesson report?", "74% of companies admitted insecure code had caused a security breach", ["7.4% of companies had ever had a breach", "Most companies never found insecure code", "Only startups had breaches from insecure code"], "The figure shows that breaches from insecure code are common."),
    Q("Imperative", "Missing input validation lets an attacker extract a whole database with SQL injection. Which reason for secure coding does this show?", "Protecting sensitive data", ["Improving page speed", "Reducing licence costs", "Scaling infrastructure"], "Insecure code exposes sensitive data to unauthorised access."),
    Q("Imperative", "Which pair of flaws can crash applications or make a service unavailable?", "Buffer overflows and denial-of-service flaws", ["Missing comments and long functions", "Weak colour contrast and slow fonts", "Unused imports and dead code"], "These threaten integrity and availability."),
    Q("Costs", "Which is NOT a typical cost of a breach caused by insecure code?", "Savings because patching is no longer needed", ["Incident response and forensics", "Legal fees and regulatory fines", "Remediation effort"], "A breach creates more work and cost, not less."),
    Q("Technical debt", "From a security view, how does a late-found vulnerability add technical debt?", "It forces emergency patches and rework that make later development more complex and costly", ["It reduces the size of the codebase", "It removes the need for future testing", "It only affects the security team's budget"], "Rework and workarounds pile up and slow future work."),
    Q("Technical debt", "Which approach best reduces security-related rework?", "Integrate secure coding from the start (shift-left)", ["Fix everything after deployment", "Skip security reviews to ship faster", "Rely on a yearly penetration test alone"], "Fixing early is cheaper than patching in production."),
    Q("Regulations", "Which group names regulations or standards that expect secure development and data handling?", "GDPR, HIPAA and PCI DSS", ["SOLID, DRY and KISS", "REST, SOAP and GraphQL", "Agile, Scrum and Kanban"], "These are the regulatory examples in the lesson."),
    Q("Regulations", "PCI DSS is mainly about protecting:", "Payment card data", ["Patient health records", "Open-source licence compliance", "Children's school records only"], "HIPAA covers health information. PCI DSS covers payment cards."),
    Q("Regulations", "HIPAA mainly covers:", "Health information in the US", ["Payment card data", "EU personal data", "Software licences"], "GDPR covers personal data in the EU."),
    Q("Beyond the course", "POPIA is a South African law about:", "The protection and processing of personal information", ["Payment card security only", "Open-source licensing", "Internet speed regulation"], "It is the national data protection law, relevant for local developers."),
    Q("Reputation", "Which long-term effect of a breach is usually the hardest to reverse quickly?", "Loss of customer trust and investor confidence", ["The size of the log files", "The number of support tickets", "The cost of the forensic report"], "Trust takes a long time to rebuild."),
    Q("Reputation", "Why do breaches damage market share and loyalty?", "News spreads fast and customers doubt their data is safe", ["Customers prefer slower software", "Regulators remove the brand", "Competitors are always breached too"], "Perceived carelessness drives customers away."),
    Q("Equifax", "What was the technical root cause of the Equifax breach?", "An unpatched Apache Struts remote code execution flaw (CVE-2017-5638)", ["A misconfigured WAF relaying requests to a metadata service", "Malicious code inserted into a build system", "A JNDI lookup in a logging library"], "Improper input validation in the Jakarta Multipart parser allowed arbitrary code execution."),
    Q("Equifax", "What made the Equifax breach especially avoidable?", "A patch had been available for months before the attack", ["Nobody knew the flaw existed", "It needed physical access to the data centre", "It only affected test servers"], "The failure was not applying a known fix in time."),
    Q("Equifax", "Roughly how many people's data was exposed in the Equifax breach?", "About 147 million", ["About 147 thousand", "About 14 million", "About 1.5 billion"], "Names, SSNs, birth dates and addresses of about 147 million Americans."),
    Q("Equifax", "Which was a consequence of the Equifax breach?", "A settlement of up to $700 million and senior executives resigning", ["No regulatory action at all", "A small donation and no leadership changes", "Only a software upgrade"], "Financial, reputational and leadership consequences followed."),
    Q("Capital One", "How did the Capital One attacker reach the data?", "SSRF through a misconfigured WAF to the AWS metadata service, then S3 data", ["A phishing email to the CEO", "A poisoned software update", "A default password on a printer"], "The firewall was tricked into relaying requests to internal services."),
    Q("Capital One", "Which OWASP 2021 categories best describe the Capital One incident?", "SSRF and Security Misconfiguration", ["Cryptographic Failures and Vulnerable Components", "Injection and Authentication Failures", "Insecure Design and Logging Failures only"], "A10 SSRF plus A05 Security Misconfiguration."),
    Q("Capital One", "What fine did the OCC impose on Capital One?", "$80 million", ["$8 million", "$800 million", "$80 thousand"], "It was for failing to establish effective risk management practices."),
    Q("Capital One", "The Capital One case shows that secure coding also covers:", "Secure configuration and understanding the underlying cloud infrastructure", ["Only business logic", "Only front-end styling", "Only password length rules"], "Misconfiguration can be exploited just like a code bug."),
    Q("SolarWinds", "What happened in the SolarWinds attack?", "Attackers inserted malicious SUNBURST code into legitimate Orion updates via the build environment", ["Attackers guessed an admin password", "A DDoS took Orion offline", "An insider sold the source code"], "Customers installed the backdoor by applying a trusted update."),
    Q("SolarWinds", "Which OWASP 2021 category covers untrusted updates and compromised build pipelines?", "Software and Data Integrity Failures", ["Injection", "Broken Access Control", "SSRF"], "A08 covers integrity of updates, critical data and CI/CD pipelines."),
    Q("SolarWinds", "Which control would best help against a poisoned build?", "Secure build processes and code integrity checks such as signing and verification", ["Larger fonts on the login page", "More CSS linting", "A faster load balancer"], "You need to be able to trust and verify what you ship."),
    Q("SolarWinds", "Why was SolarWinds treated as a national security incident?", "Several US government agencies were compromised and attackers had access for months", ["It only affected one small company", "It was found within an hour", "It involved no data theft"], "Espionage over a long period raised the stakes."),
    Q("Log4Shell", "What made Log4Shell exploitable?", "A JNDI lookup feature that could load and run attacker-controlled code when a crafted string was logged", ["A weak password policy in Log4j", "An open S3 bucket", "A missing HTTPS certificate"], "Merely logging a string could trigger remote code execution."),
    Q("Log4Shell", "What is the CVE number of Log4Shell?", "CVE-2021-44228", ["CVE-2017-5638", "CVE-2019-0001", "CVE-2020-9999"], "CVE-2017-5638 is the Struts flaw behind Equifax."),
    Q("Log4Shell", "Which tool category would most directly show whether you use a vulnerable Log4j version?", "SCA (software composition analysis)", ["DAST", "Load testing", "Code formatting"], "SCA inventories third-party components and flags known flaws."),
    Q("Log4Shell", "Which risk did Log4Shell highlight most?", "Vulnerabilities in widely used open-source components in the software supply chain", ["Weak office Wi-Fi", "Lost laptops", "Poor password reuse"], "Libraries are part of your attack surface."),
    Q("Comparing cases", "In which case did attackers tamper with a trusted vendor's update mechanism?", "SolarWinds", ["Equifax", "Capital One", "Log4Shell"], "SUNBURST was delivered inside legitimate Orion updates."),
    Q("Advocacy", "A manager says security slows delivery. Which argument is strongest?", "Fixing flaws early is far cheaper than breach costs such as fines, forensics, lawsuits and lost trust, and automation keeps delivery fast", ["Security is a legal requirement everywhere, so there is nothing to discuss", "Developers should just work faster", "Breaches only happen to large companies"], "Business arguments use cost, risk and real cases."),
    Q("Business continuity", "How does secure coding support business continuity?", "It reduces outages, data loss and emergency fixes, so services keep running and recover faster", ["It removes the need for backups", "It guarantees zero downtime", "It makes recovery planning unnecessary"], "Resilient code and fewer incidents keep the business operating.")
  ],
  match: [
    M("Match the breach to its root cause", "One technical cause per incident.", [
      ["Equifax (2017)", "Unpatched Apache Struts flaw (CVE-2017-5638)"],
      ["Capital One (2019)", "SSRF through a misconfigured WAF to the AWS metadata service"],
      ["SolarWinds (2020)", "Malicious code inserted into Orion updates via the build environment"],
      ["Log4Shell (2021)", "JNDI lookup in Log4j allowing remote code execution (CVE-2021-44228)"]]),
    M("Match the breach to a headline consequence", "Think about scale and cost.", [
      ["Equifax (2017)", "About 147 million people exposed and a settlement of up to $700 million"],
      ["Capital One (2019)", "$80 million OCC fine and class-action lawsuits"],
      ["SolarWinds (2020)", "Thousands of organisations, including US government agencies, compromised"],
      ["Log4Shell (2021)", "Global emergency patching across cloud, enterprise and consumer software"]]),
    M("Match the breach to the main lesson", "What should developers take away?", [
      ["Equifax (2017)", "Patch known vulnerabilities in components quickly"],
      ["Capital One (2019)", "Secure configuration and least privilege matter in the cloud"],
      ["SolarWinds (2020)", "Protect the build pipeline and verify integrity of releases"],
      ["Log4Shell (2021)", "Know your dependencies and avoid dangerous defaults"]]),
    M("Match the secure coding practice to its business benefit", "Link engineering work to business outcomes.", [
      ["Prompt patching and dependency scanning", "Avoids breaches from known flaws, and the fines that follow"],
      ["Input validation", "Prevents data theft and downtime from injection attacks"],
      ["Shift-left security work", "Lower cost of fixes and less rework"],
      ["Compliance-aligned development", "Avoids penalties and shows due diligence"],
      ["Resilient design and safe error handling", "Keeps services available, supporting business continuity"],
      ["A strong, visible security record", "Preserves customer trust and brand reputation"]]),
    M("Match the regulation to what it protects", "Know the main regulations.", [
      ["GDPR", "Personal data of people in the EU"],
      ["HIPAA", "Health information in the US"],
      ["PCI DSS", "Payment card data"],
      ["POPIA (beyond the course)", "Personal information processed in South Africa"]])
  ],
  open: [
    E("Group discussion: which common coding or deployment vulnerabilities led to the major incidents (Equifax, Capital One, SolarWinds, Log4Shell)?", [
      "Equifax: improper input validation in Apache Struts, plus failure to patch. Vulnerable and outdated components.",
      "Capital One: SSRF and a misconfigured WAF. Security misconfiguration and weak least privilege in the cloud.",
      "SolarWinds: compromised build environment and untrusted updates. Software and data integrity failure.",
      "Log4Shell: unsafe JNDI lookups enabled by default in a ubiquitous library. Vulnerable component and injection via logged data.",
      "Pattern: validation, patching, configuration, integrity and dependency management."]),
    E("Which regulations mandate secure coding practices, and what are the consequences of ignoring them?", [
      "GDPR (EU personal data), HIPAA (US health data), PCI DSS (payment cards), plus national laws such as POPIA in South Africa.",
      "They expect security to be built into development and data handling.",
      "Consequences: fines, legal penalties, operational restrictions, lawsuits and loss of trust.",
      "Secure coding helps show due diligence and meet the obligations."]),
    E("Pick one of the four case studies and examine its long-term business consequences.", [
      "Example (Equifax): about 147 million people affected, up to $700 million settlement, CEO and executives resigned.",
      "Long term: sustained loss of trust, higher regulatory scrutiny, calls for stronger data laws, years of legal and remediation work.",
      "Business lesson: one unpatched component damaged brand, leadership, finances and customer relationships far beyond the original technical issue.",
      "You can answer the same way for any case: money, regulators, reputation, leadership, industry change."],
      "Pick the case you remember best and rehearse it until you can say it in under a minute."),
    E("Link three specific secure coding practices to business benefits.", [
      "Input validation: prevents injection attacks, so avoids data theft, downtime and fines.",
      "Dependency scanning and patching: prevents Equifax-style breaches, protecting reputation and cost.",
      "Shift-left design and review: finds flaws when they are cheap, reducing rework and speeding delivery."]),
    E("Explain how secure coding supports business continuity.", [
      "Fewer exploitable flaws mean fewer outages, data loss events and emergency fixes.",
      "Resilient design (error handling, graceful degradation, safe defaults) lets services keep running under attack.",
      "Good logging and clean, patchable code speed up recovery after an incident.",
      "Outcome: the business keeps serving customers, which protects revenue and trust."]),
    E("Security advocacy: make a compelling argument to your manager for investing in secure coding.", [
      "Start with a real case: Equifax paid up to $700 million for one unpatched component.",
      "Compare costs: a few hours of dependency scanning, review and training versus fines, forensics, lawsuits and lost customers.",
      "Show it is compatible with speed: automated checks in CI/CD give fast feedback and reduce late rework.",
      "Propose a small, concrete first step (for example, add SCA and security checks to code review) and a way to measure results."]),
    E("Explain technical debt from a security perspective.", [
      "Security debt is the accumulated cost of vulnerabilities, shortcuts and outdated components that have not been fixed.",
      "It grows because later work has to build around the flaws, and because fixing in production needs rework and emergency patches.",
      "Reduce it by shift-left practices, keeping dependencies current and fixing findings promptly."])
  ]
};
