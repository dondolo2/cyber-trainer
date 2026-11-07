import { Q, M, E, O } from "../lib/helpers.js";

export default { id:5, day:5, short:"Ethical Responsibility", title:"Ethical Responsibility",
  outcome:"Explain responsible disclosure, the ethical principles that apply to developers, and how to handle whistleblowing and security culture.",
  theory:[
   {h:"Why ethics belongs in cybersecurity", p:["Developers are custodians of digital trust. The systems you build can affect millions of people, so ethics is part of the job and not an add-on."],
    bullets:[
     "**Impact on users**: breaches, fraud, identity theft, even physical harm in critical systems.",
     "**Trust and reputation**: trust in digital systems is fragile.",
     "**Legal and regulatory**: many ethical duties are written into law (GDPR, HIPAA).",
     "**Professional integrity**: the profession's reputation depends on it."]},
   {h:"Six principles", bullets:[
     "**Public interest**: put people's wellbeing first.",
     "**Competence**: keep your skills current. Incompetence creates vulnerabilities.",
     "**Honesty and transparency**: truthful about risks and incidents, where appropriate and responsible.",
     "**Confidentiality**: respect privacy and protect sensitive data.",
     "**Fairness and non-discrimination**: apply security measures fairly.",
     "**Accountability**: take responsibility for the security consequences of your work."],
    say:"My ethics checklist for a security decision: who could be harmed, am I competent to judge this, am I being honest, am I protecting private data, and will I own the outcome."},
   {h:"Responsible disclosure", p:["When you find a vulnerability, the aim is to get it fixed before attackers can use it, without hiding it forever."],
    bullets:[
     "**1. Private notification**: tell the vendor or owner privately, with enough detail to reproduce the issue.",
     "**2. Vendor acknowledgement and remediation**: the vendor confirms and works on a fix. You communicate, clarify, maybe test the patch and agree a timeline.",
     "**3. Coordinated public disclosure**: once a patch or mitigation exists, and usually after an agreed period (often 30, 60 or 90 days), details are published so users can protect themselves."],
    p:["**Why it matters**: it reduces the window for exploitation, encourages collaboration, builds trust and improves overall security. Many organisations run **vulnerability disclosure programmes (VDPs)** or **bug bounty programmes** to give researchers a clear and safe channel."],
    say:"Report privately, give the vendor time to fix, then disclose together. Dumping details publicly before a patch helps attackers more than users."},
   {h:"Irresponsible disclosure and legal limits", bullets:[
     "**Zero-day window**: publishing before a patch exists lets attackers exploit immediately while users are defenceless.",
     "**Harm to everyone**: reputational damage for the vendor, loss of credibility for the reporter, and less willingness from vendors to engage.",
     "**Legal consequences**: lawsuits or criminal charges are possible, depending on the jurisdiction and what you did.",
     "**Good intentions do not make unauthorised access legal.** Use official channels, and stay inside any programme's stated scope."],
    beyond:"For a South African job market, be aware of POPIA (data protection) and the Cybercrimes Act of 2020, which covers unlawful access to systems and data. Read the current text before relying on it, but knowing both exist impresses interviewers.",
    say:"I would never test a system I have no permission for. If I find something by accident, I stop, document it and report it through the proper channel."},
   {h:"Whistleblowing and ethical culture", bullets:[
     "**Internal first**: report through the proper internal channel, in writing, with facts and impact.",
     "**When internal reporting is not enough**: it is ignored or suppressed, management pressures you to hide a serious risk, users remain at ongoing risk, or there is retaliation.",
     "**Before escalating externally**: document your attempts, keep to facts, understand the legal protections and duties, and consider independent advice.",
     "**Promoting an ethical culture**: blame-free reporting, clear disclosure channels, leadership that rewards honesty, training with real scenarios."],
    say:"I would raise it internally in writing first. If it is ignored and people are at serious risk, I would escalate to the appropriate authority, with documentation and advice."},
  ],
  qs:[
   Q("Ethics","Why are developers described as custodians of digital trust?","Their code protects data and systems that affect many people",["They own all user data","They replace the legal team","They decide company strategy"],"Trust is fragile and developers' work can affect millions."),
   Q("Principles","Which is NOT one of the key ethical principles listed?","Maximising profit for the vendor",["Public interest","Competence","Accountability"],"The listed principles are public interest, competence, honesty and transparency, confidentiality, fairness and accountability."),
   Q("Principles","Hiding a known breach from affected users violates which principle?","Honesty and transparency",["Competence","Fairness","Scalability"],"Users need truthful information so they can protect themselves."),
   Q("Principles","Protecting sensitive user data from unnecessary exposure is which principle?","Confidentiality",["Competence","Accountability","Public interest only"],"Confidentiality means respecting privacy and protecting sensitive information."),
   Q("Principles","Which principle means staying up to date on threats and best practices?","Competence",["Fairness","Confidentiality","Transparency"],"Incompetence can cause vulnerabilities."),
   Q("Responsible disclosure","Responsible disclosure is:","Privately reporting a vulnerability and allowing time for a fix before going public",["Publishing the flaw immediately","Selling the flaw to the highest bidder","Keeping the flaw secret forever"],"It balances the public's right to know with the need to prevent exploitation."),
   Q("Responsible disclosure","What is the first step in responsible disclosure?","Private notification to the vendor or owner",["Public announcement","Posting a proof of concept online","Waiting for the vendor to find it"],"Include enough detail to reproduce the issue."),
   Q("Responsible disclosure","What typically happens in step two?","The vendor acknowledges the report and works on a fix, communicating with the reporter",["The reporter publishes details","The vendor deletes the report","The regulator fines the vendor"],"Timelines for disclosure are agreed here."),
   Q("Responsible disclosure","When does coordinated public disclosure normally happen?","After a patch or mitigation exists, often after an agreed period such as 30, 60 or 90 days",["Immediately after discovery","Only after a breach","Never"],"Users can then protect themselves."),
   Q("Responsible disclosure","What is a 'zero-day window'?","The time a vulnerability is public and exploitable before a patch exists",["The day a patch is released","A scheduled maintenance period","The time a vendor takes to reply"],"This is what irresponsible disclosure creates."),
   Q("Responsible disclosure","Why is uncoordinated public disclosure dangerous?","Attackers can exploit it immediately while users have no fix",["It makes the fix more expensive","It always results in a bug bounty","It cancels the vendor's liability"],"Harm outweighs the benefits of speed."),
   Q("Responsible disclosure","Which programme gives researchers a clear channel to report issues, sometimes with rewards?","A bug bounty or vulnerability disclosure programme",["A bring-your-own-device policy","A penetration test report","An end-user licence agreement"],"These formalise responsible disclosure."),
   Q("Responsible disclosure","Which pair of ethical ideas supports the duty to report responsibly?","Beneficence (do good) and non-maleficence (do no harm)",["Profit and speed","Secrecy and speed","Competition and ownership"],"The course ties disclosure to beneficence, non-maleficence and public interest."),
   Q("Scenarios","You find a vulnerability in your employer's application. What first?","Report it through the proper internal channel with enough detail to reproduce",["Post it online to pressure the team","Exploit it to prove it is serious","Ignore it"],"Use official channels, and document what you found."),
   Q("Scenarios","You notice a flaw on a stranger's website. Best action?","Report it privately through their security contact or disclosure programme, without exploiting or publishing it",["Download data to prove the flaw","Post it on social media","Sell the details"],"Do no harm, and do not go further than needed."),
   Q("Scenarios","A vendor ignores your report for months. What is the most responsible next step?","Follow up and escalate through the agreed process or a coordinator before considering any public step",["Immediately publish full exploit code","Delete your notes","Exploit the flaw to get attention"],"Coordinated disclosure is about persistence and minimising harm."),
   Q("Scenarios","A manager says to ship with a known critical flaw and patch later. Best first move?","Raise it formally in writing with the risk and impact, and escalate if ignored",["Quietly ship and say nothing","Leak it to the press","Resign without telling anyone"],"Document, be factual, use internal channels, then escalate if needed."),
   Q("Scenarios","Testing someone else's system without permission to prove a flaw:","Can be illegal even with good intentions",["Is always legal if reported","Is required by responsible disclosure","Is encouraged by all vendors"],"Authorisation matters. Stay in scope."),
   Q("Whistleblowing","Whistleblowing may become appropriate when:","Internal reporting is ignored or suppressed and users remain at serious risk",["You are annoyed with your manager","You want publicity","A bug is purely cosmetic"],"It is a last resort, not a first move."),
   Q("Whistleblowing","Before escalating externally, you should:","Document your internal attempts and the facts, and understand your legal protections",["Delete evidence","Post speculation online","Wait for a promotion"],"Evidence and legal awareness protect you and the public."),
   Q("Culture","Which practice best supports a culture of responsible reporting?","A blame-free environment with clear reporting channels",["Punishing every reported mistake","Hiding incidents from the team","Only reporting to outside media"],"People report when it is safe to do so."),
   Q("Culture","Which is a benefit of coordinated disclosure?","It builds collaboration and trust between researchers and vendors",["It guarantees a reward","It removes all legal risk","It keeps flaws secret forever"],"Both sides share the goal of improving security."),
  ],
  match:[
   M("Match the responsible disclosure step","Put the steps in order by matching.",[["Step 1","Private notification to the vendor"],["Step 2","Vendor acknowledges and works on a fix"],["Step 3","Coordinated public disclosure after a fix"]]),
   M("Match the ethical principle to its meaning","The six principles.",[["Public interest","Put the wellbeing of the public first"],["Competence","Maintain professional skill and keep up to date"],["Honesty and transparency","Be truthful about risks and incidents"],["Confidentiality","Protect private and sensitive information"],["Fairness and non-discrimination","Apply security measures fairly to everyone"],["Accountability","Own the consequences of your work"]]),
   M("Match the action to its likely result","Responsible versus irresponsible.",[["Privately report and wait for a patch","Users are protected before attackers learn details"],["Publish a flaw before any patch exists","A zero-day window opens for attackers"],["Raise a concern in writing internally","Creates a record and gives the organisation a chance to fix it"],["Ignore a discovered flaw","Risk remains and users stay exposed"]]),
  ],
  open:[
   E("Explain the ethical obligations of software professionals regarding security.",[
     "Protect users and the public (public interest), and be honest about risks.",
     "Stay competent and keep learning, since incompetence creates vulnerabilities.",
     "Protect confidentiality of user data and apply security fairly.",
     "Take accountability for the security consequences of your work, including reporting problems responsibly."]),
   E("Describe responsible disclosure and why it matters.",[
     "Report privately, let the vendor fix, then disclose publicly once a fix exists, usually after an agreed time such as 90 days.",
     "It shrinks the window attackers can exploit, builds trust and collaboration, and improves the ecosystem.",
     "VDPs and bug bounties give a clear and safe route."]),
   E("When is internal reporting insufficient, and what should you do?",[
     "When reports are ignored or suppressed, you are pressured to hide serious risk, users remain at ongoing risk or retaliation occurs.",
     "Document everything factually, understand legal protections, get advice, and escalate to the appropriate authority or regulator as a last resort."]),
   E("How would you create an environment that supports responsible security reporting?",[
     "Blame-free culture so mistakes are reported fast.",
     "A clear internal channel and a public vulnerability disclosure policy, possibly a bug bounty.",
     "Leadership that rewards honest reporting, and training with real scenarios.",
     "Fast feedback to reporters so people see that reports lead to action."]),
   E("Scenario: you find a SQL injection flaw in your employer's customer portal. Walk through what you do.",[
     "Stop testing beyond what is necessary, do not access or copy data, and document what you saw.",
     "Report through the internal security channel with steps to reproduce, impact and evidence.",
     "Follow up, support the fix, and verify it if asked.",
     "If it is ignored and customers remain at serious risk, escalate within the company, and as a last resort externally, with documentation and advice."]),
  ],
  order: [
    O("Put the responsible disclosure steps in order", "From first step to last.", [
      "Private notification to the vendor or owner",
      "Vendor acknowledges the report and works on a fix",
      "Coordinated public disclosure after a patch or mitigation exists"])
  ]
};
