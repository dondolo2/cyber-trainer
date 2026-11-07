import { Q, M, E, O } from "../lib/helpers.js";

export default {
  id: 7, day: 7, short: "DevSecOps Evolution", title: "DevSecOps Evolution",
  outcome: "Understand how security moved from an end-of-cycle gate to shift-left and DevSecOps, which security checks belong at each CI/CD stage, and what makes a modern secure workflow and culture.",
  theory: [
    { h: "From security gate to DevSecOps", p: [
        "In the traditional SDLC, security was an afterthought checked at the very end, just before deployment. This 'security gate' caused problems: flaws found late were expensive and slow to fix, release cycles stretched, and security teams were seen as blockers instead of enablers.",
        "Agile and DevOps made delivery much faster, which made the late gate even less workable. **DevSecOps** emerged to integrate security through the whole SDLC, from inception to operation."],
      bullets: [
        "**Stage 1**: traditional SDLC with a security review at the end.",
        "**Stage 2**: Agile and DevOps speed delivery, but security lags behind.",
        "**Stage 3**: the late gate becomes a bottleneck.",
        "**Stage 4**: DevSecOps builds security into every stage, automated and shared."],
      say: "DevOps unified development and operations to move fast. DevSecOps adds security as a built-in part of that pipeline instead of a gate at the end." },
    { h: "Shift-left security", p: [
        "Picture the SDLC as a timeline. The left side is planning, design and coding. The right side is testing, deployment and operations. **Shift-left** moves security activities toward the left, where problems are easiest and cheapest to fix."],
      bullets: [
        "**Cost reduction**: a bug found in requirements is far cheaper than one found in production.",
        "**Faster development cycles**: no costly rework or delays just before release.",
        "**Improved software quality**: security built in produces better software from the start.",
        "**Shared responsibility**: developers, QA and operations all own security.",
        "**Proactive security**: continuous, not reactive gate-keeping."],
      beyond: "The lesson says the cost of a fix rises 'exponentially', and Lesson 1 quotes 30 to 100 times. These multipliers are repeated everywhere, but the original studies behind them are debated. In an interview, say 'it is consistently cheaper to fix early' and treat the figures as a rule of thumb.",
      say: "Shift-left means finding security problems early, when they are cheapest to fix, and making security a shared responsibility instead of a final gate." },
    { h: "Key shift-left practices", bullets: [
        "**Threat modelling** in design, before code exists.",
        "**Secure design principles**: least privilege, defence in depth, secure defaults.",
        "**SAST** in the IDE or version control to analyse code while it is written.",
        "**DAST** against running apps in test environments.",
        "**SCA** for known vulnerabilities in third-party and open-source components.",
        "**Developer security training** on secure coding and common vulnerabilities.",
        "**Security as code**: policies, configurations and tests automated, repeatable and version controlled.",
        "**Automated security gates**: pipeline checks that fail the build when thresholds are not met."] },
    { h: "Security in the CI/CD pipeline", p: [
        "CI/CD is what makes rapid, frequent releases possible. DevSecOps puts security checks into that same automation so they run on every change.",
        "**Why integrate**: early detection (checks run on every commit or build), consistency (same checks every time), speed (faster than manual review), scalability (grows with the team), and developer empowerment (instant feedback and learning)."],
      bullets: [
        "**Commit and pre-commit**: SAST, **secrets detection** (hardcoded keys and credentials), linting and code quality checks.",
        "**Build**: **SCA** for vulnerable dependencies and **container image scanning**.",
        "**Test**: **DAST**, **IAST**, API security testing and penetration testing (automated or scheduled manual).",
        "**Deploy**: **Infrastructure as Code scanning** (Terraform, CloudFormation), **RASP** for runtime protection, and automated **compliance checks**.",
        "**Monitor and operate**: **SIEM** integration for continuous monitoring and APM with security features to spot anomalies."],
      say: "At commit I scan code and secrets, at build I scan dependencies and containers, in test I attack the running app, at deploy I scan infrastructure and compliance, and in production I monitor." },
    { h: "Modern secure workflows", p: [
        "DevSecOps is as much culture as tooling. Modern secure workflows combine tight integration of security, automation, and a security-first mindset."],
      bullets: [
        "**Security as code**: version-controlled and automated, so it is consistent and repeatable.",
        "**Automation everywhere**: static analysis, dependency scanning, dynamic testing and compliance checks give rapid feedback at scale.",
        "**Shared responsibility and collaboration**: developers, QA and operations are all expected to contribute, supported by cross-functional training.",
        "**Continuous feedback and learning**: quick feedback to developers, post-incident reviews and threat intelligence to refine practice.",
        "**Proactive threat modelling** from the earliest design.",
        "**Immutable infrastructure**: deployed infrastructure is not edited in place. Changes trigger a new build and deployment, so security configuration is applied consistently.",
        "**Least privilege and zero trust**: grant minimal access, and 'never trust, always verify'.",
        "**Observability and monitoring**: comprehensive logging and alerting for real-time detection and forensics."] },
    { h: "The developer's role", bullets: [
        "**Write secure code** that follows guidelines for your language and framework.",
        "**Understand security risks** and how to prevent them.",
        "**Use security tools** (SAST, SCA and others) in daily work.",
        "**Take part in threat modelling** during design.",
        "**Respond quickly to security feedback** from tools and reviews.",
        "**Keep learning** about new threats and techniques."],
      say: "In DevSecOps I am not only writing features. I run the security tools in my pipeline, fix what they find quickly, and help threat model new designs." },
    { h: "What a successful DevSecOps culture looks like", bullets: [
        "**Shared ownership**: security is everyone's job, not only the security team's.",
        "**Collaboration**: development, security and operations work together with clear communication channels.",
        "**Blame-free learning**: mistakes are reported openly and become improvements.",
        "**Automation first**: manual, repetitive security tasks are minimised.",
        "**Continuous improvement**: feedback loops, post-incident reviews and ongoing training.",
        "**Why collaborative workflows matter**: issues get caught and fixed faster when teams share context, tools and responsibility, and security stops being a bottleneck."],
      beyond: "The lesson also mentions measuring effectiveness. Common measures include time to fix vulnerabilities, how many reach production, and the share of builds passing security checks. Many organisations also appoint security champions inside each team. These are standard industry practices rather than details from the lesson.",
      say: "A good DevSecOps culture has shared ownership, blame-free learning and automation, so security becomes an accelerator instead of a bottleneck." }
  ],
  qs: [
    Q("Evolution", "In the traditional SDLC, when was security usually addressed?", "At the very end, just before deployment (the 'security gate')", ["During requirements only", "Continuously during every commit", "Only after customers complained"], "That late timing caused expensive fixes and delays."),
    Q("Evolution", "Why did the 'security gate' approach cause problems?", "Late findings were costly to fix, slowed releases and made security teams look like blockers", ["It made code too secure", "It removed the need for testing", "It forced developers to do all security work"], "Late discovery meant big, slow, expensive fixes."),
    Q("Evolution", "What drove the emergence of DevSecOps?", "Fast Agile and DevOps delivery made end-of-cycle security reviews impractical", ["The retirement of DevOps", "A ban on automation", "A drop in cyber threats"], "Security had to keep pace with rapid delivery."),
    Q("Evolution", "How does DevSecOps differ from DevOps?", "It builds security into every stage of the DevOps pipeline", ["It removes operations teams", "It replaces CI/CD", "It adds security only at release"], "DevSecOps extends DevOps by making security integral."),
    Q("Shift-left", "On an SDLC timeline, what does 'left' represent?", "Early phases such as planning, design and coding", ["Deployment and operations", "Only testing", "Retirement of the software"], "Shift-left moves security earlier."),
    Q("Shift-left", "Which is NOT a stated benefit of shift-left?", "It guarantees that no vulnerability ever reaches production", ["Cost reduction", "Faster development cycles", "Shared responsibility"], "Shift-left reduces risk but does not guarantee zero vulnerabilities."),
    Q("Shift-left", "Doing threat modelling in design, before code is written, is an example of:", "Shift-left security", ["A security gate", "Reactive patching", "Incident response"], "Security work is moved earlier."),
    Q("Shift-left", "Shift-left promotes which cultural change?", "Security becomes a shared responsibility across developers, QA and operations", ["Only the security team owns security", "Developers stop caring about security", "Security reviews move to after release"], "It turns security from a gate into a team habit."),
    Q("Shift-left", "According to the lesson, what happens to the cost of fixing a vulnerability the later it is found?", "It rises significantly", ["It stays the same", "It falls as more people see it", "It disappears after release"], "That is the core economic argument."),
    Q("Practices", "What does 'security as code' mean?", "Security policies, configurations and tests are defined as code, making them repeatable and version controlled", ["Security staff must learn to code", "Source code is encrypted", "Security rules are written on paper"], "It brings consistency and automation."),
    Q("Practices", "What does an automated security gate do?", "Fails the build when security thresholds are not met", ["Locks the office door", "Deletes failing code", "Sends all builds to production"], "It turns security rules into enforced pipeline checks."),
    Q("Practices", "Which check finds hardcoded API keys before they reach the repository?", "Secrets detection", ["DAST", "Container image scanning", "Load testing"], "It runs at commit or pre-commit."),
    Q("Practices", "Where is SAST most effective according to the lesson?", "Early, in the IDE or at commit and version control stage", ["Only in production", "Only after release", "Only during penetration tests"], "Early feedback is its main benefit."),
    Q("Pipeline", "Which pair of checks belongs to the build stage?", "SCA and container image scanning", ["DAST and IAST", "RASP and SIEM", "Pre-commit hooks and manual pen tests"], "Build checks inspect dependencies and images."),
    Q("Pipeline", "Which test runs against the running application and simulates attacks from outside?", "DAST", ["SAST", "SCA", "Linting"], "It finds runtime issues such as authentication flaws."),
    Q("Pipeline", "Which approach analyses code from inside the running application, combining SAST and DAST ideas?", "IAST", ["SCA", "SIEM", "RASP"], "IAST gives more accurate results with less noise."),
    Q("Pipeline", "Scanning Terraform or CloudFormation files for misconfigurations before provisioning is called:", "Infrastructure as Code (IaC) scanning", ["Container hardening", "Penetration testing", "Secrets rotation"], "It catches misconfiguration before infrastructure exists."),
    Q("Pipeline", "Which technology is deployed with the application to detect and block attacks in real time?", "RASP", ["SAST", "SCA", "Linting"], "Runtime Application Self-Protection."),
    Q("Pipeline", "Feeding application and infrastructure logs into a system for continuous monitoring and threat detection is the role of:", "SIEM", ["SAST", "IaC scanning", "Pre-commit hooks"], "Security Information and Event Management."),
    Q("Pipeline", "Which is a benefit of automated security checks in CI/CD?", "Consistent checks on every build with fast feedback to developers", ["They remove the need for developers to know security", "They only run once a year", "They always slow builds beyond usefulness"], "Automation is consistent, fast and scalable."),
    Q("Pipeline", "Why does automation scale better than manual security reviews?", "Automated checks keep pace as teams and codebases grow without proportional extra effort", ["Automation never has false positives", "Manual reviews are illegal", "Automation replaces developers"], "Scalability is a stated benefit."),
    Q("Workflows", "What is immutable infrastructure?", "Infrastructure that is not changed in place. Changes trigger a new build and deployment", ["Infrastructure that cannot be deployed", "Servers that never get patched", "Hardware that is bolted down"], "It keeps security configuration consistent."),
    Q("Workflows", "Zero trust means:", "Never trust, always verify", ["Trust all internal users", "Trust anything inside the firewall", "Verify only once per year"], "Every request is verified regardless of where it comes from."),
    Q("Workflows", "Why does observability matter for security?", "Comprehensive logging and alerting detect incidents in real time and support forensics", ["It makes code shorter", "It replaces testing", "It removes the need for incident response"], "You cannot defend what you cannot see."),
    Q("Workflows", "What does 'continuous feedback and learning' mean in a secure workflow?", "Issues are reported to developers quickly and post-incident reviews feed improvements", ["Feedback is given once a year", "Only security staff learn", "Incidents are kept secret"], "Fast feedback helps developers learn on the job."),
    Q("Culture", "Which best describes a successful DevSecOps culture?", "Shared responsibility, collaboration, automation and continuous improvement", ["A single security hero who reviews everything", "Blame and punishment for mistakes", "Security work only before major releases"], "Culture is the foundation, tools support it."),
    Q("Culture", "Why design collaborative workflows between development, security and operations?", "Issues are caught and fixed faster when teams share context, tools and responsibility", ["It removes the need for security staff", "It lets developers skip testing", "It reduces the number of teams to one"], "Collaboration stops security becoming a bottleneck."),
    Q("Developer role", "In DevSecOps, a developer's role expands to include:", "Writing secure code, using security tools, threat modelling and acting on security feedback", ["Only writing features", "Only reviewing firewall logs", "Approving all security budgets"], "Developers become active participants in security."),
    Q("Compare", "Which row correctly contrasts traditional security with DevSecOps?", "Traditional: end-of-cycle, manual, separate team. DevSecOps: continuous, automated, shared", ["Traditional: continuous and shared. DevSecOps: end-of-cycle and manual", "Both are identical", "Traditional: automated. DevSecOps: manual"], "That contrast is a standard interview answer.")
  ],
  match: [
    M("Match the pipeline stage to its security checks", "Where does each check belong?", [
      ["Commit / pre-commit", "SAST, secrets detection and linting"],
      ["Build", "SCA and container image scanning"],
      ["Test", "DAST, IAST, API security testing and penetration testing"],
      ["Deploy", "IaC scanning, RASP and compliance checks"],
      ["Monitor / operate", "SIEM integration and APM with security features"]]),
    M("Match the shift-left practice to its purpose", "What does each practice do?", [
      ["Threat modelling", "Finds threats before any code is written"],
      ["Secure design principles", "Builds in least privilege, defence in depth and secure defaults"],
      ["SAST in the IDE", "Analyses source code while it is being written"],
      ["SCA", "Finds known vulnerabilities in third-party components"],
      ["Developer security training", "Teaches secure coding and common vulnerabilities"],
      ["Security as code", "Automates policies and tests as version-controlled code"],
      ["Automated security gates", "Fail builds that miss security thresholds"]]),
    M("Match the workflow characteristic to its meaning", "Modern secure workflows.", [
      ["Immutable infrastructure", "Changes trigger new deployments instead of in-place edits"],
      ["Zero trust", "Never trust, always verify"],
      ["Observability and monitoring", "Comprehensive logging and alerting for real-time detection"],
      ["Continuous feedback and learning", "Fast feedback to developers and lessons from incidents"],
      ["Shared responsibility", "Developers, QA and operations all contribute to security"],
      ["Proactive threat modelling", "Risks identified in design before code is written"]]),
    M("Traditional security versus DevSecOps", "Compare the two approaches.", [
      ["Traditional: when security happens", "At the end, just before release"],
      ["DevSecOps: when security happens", "Continuously, from planning to operations"],
      ["Traditional: who owns security", "A separate security team"],
      ["DevSecOps: who owns security", "Everyone on the team"],
      ["Traditional: testing style", "Mostly manual reviews"],
      ["DevSecOps: testing style", "Automated checks in the pipeline"]])
  ],
  order: [
    O("Put the CI/CD pipeline stages in order", "Order the stages a change passes through from first to last.", [
      "Code commit and pre-commit checks",
      "Build",
      "Test",
      "Deploy",
      "Monitor and operate"]),
    O("Trace the evolution to DevSecOps", "Order the steps in how security practice evolved.", [
      "Traditional SDLC with a security gate at the end",
      "Agile and DevOps speed up delivery",
      "End-of-cycle security becomes a bottleneck",
      "Shift-left moves security earlier",
      "DevSecOps integrates security through the whole pipeline"])
  ],
  open: [
    E("Explain the evolution from DevOps to DevSecOps.", [
      "Traditional SDLC: security was a gate at the end, which led to late, costly fixes and blocked releases.",
      "Agile and DevOps accelerated delivery, so late security reviews could not keep up.",
      "Shift-left moved security earlier, and DevSecOps embedded it throughout the CI/CD pipeline.",
      "Result: security becomes automated, continuous and shared instead of a separate final step."]),
    E("Compare traditional security approaches with DevSecOps.", [
      "Timing: end of lifecycle versus continuous from planning to operations.",
      "Ownership: separate security team versus shared responsibility.",
      "Method: manual reviews versus automated tools in the pipeline.",
      "Outcomes: slow, expensive late fixes versus early detection, faster delivery and better quality."]),
    E("Define shift-left security and its core principles.", [
      "Moving security activities to the earliest phases of the SDLC (planning, design, coding).",
      "Principles: threat modelling early, secure design principles, automated checks (SAST, SCA, DAST), security as code, developer training and shared responsibility.",
      "Benefits: lower cost, faster cycles, better quality, proactive security."]),
    E("Which security processes are suitable for automation, and which still need people?", [
      "Automate: SAST, SCA, secrets detection, container and IaC scanning, DAST scans, compliance checks and dependency update checks, because they are repetitive and need consistency.",
      "Keep human: threat modelling and design review, business logic and manual penetration testing, deciding which risks to accept, and incident response judgement.",
      "Best results come from automation for the routine and people for the judgement."]),
    E("Why is it important to design collaborative workflows between development, security and operations?", [
      "Shared context catches issues earlier and fixes them faster.",
      "Security stops being a bottleneck and becomes part of delivery.",
      "Clear communication channels and cross-functional training align everyone on the same goals.",
      "Shared ownership avoids blame games when incidents happen."]),
    E("Define the characteristics of a successful DevSecOps culture.", [
      "Shared responsibility for security across all roles.",
      "Collaboration and clear communication between development, security and operations.",
      "Blame-free reporting and learning from incidents.",
      "Automation first, security as code and continuous improvement through feedback and training."]),
    E("Walk me through the security checks in a CI/CD pipeline from commit to production.", [
      "Commit: SAST, secrets detection, linting.",
      "Build: SCA for dependencies and container image scanning.",
      "Test: DAST and IAST on the running app, API security tests and penetration tests.",
      "Deploy: IaC scanning, RASP and compliance checks.",
      "Operate: SIEM and monitoring, with feedback into the backlog."])
  ]
};
