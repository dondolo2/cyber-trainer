import { Q, M, E, O } from "../lib/helpers.js";

export default {
  id: 14, day: 14, short: "Dependencies", title: "Secure Dependencies and Package Management",
  outcome: "Explain the risks of third-party packages, scan dependencies for known vulnerabilities, and apply a checklist for choosing and maintaining them.",
  theory: [
    { h: "Why dependencies are a security risk", p: [
        "Modern applications are mostly other people's code. A typical project pulls in dozens of direct dependencies, and those pull in hundreds more (transitive dependencies). You inherit every vulnerability and every maintainer's security habits."],
      bullets: [
        "**Known vulnerabilities**: an outdated library with a published CVE is an open door. The Equifax breach came from an unpatched Apache Struts component.",
        "**Transitive dependencies**: you may never have chosen the vulnerable package. It came with something else.",
        "**Malicious packages**: typosquatting (a name close to a popular package), dependency confusion, and hijacked maintainer accounts.",
        "**Abandoned packages**: no maintainer means no security fixes.",
        "**Install scripts**: some packages run code at install time, for example `postinstall` in npm.",
        "**Supply chain attacks**: attackers compromise a trusted package so every downstream project is hit at once."],
      beyond: "In September 2025, attackers phished a maintainer and pushed malicious updates to 18 popular npm packages, including chalk and debug, with a payload aimed at stealing cryptocurrency. A week later, the Shai-Hulud worm harvested tokens and credentials and used them to publish infected versions of more packages, reaching 180+ packages within 24 hours. OWASP Top 10:2025 now lists **A03: Software Supply Chain Failures** because of incidents like these.",
      say: "I am responsible for the code I ship, including the code I did not write. Every dependency is part of my attack surface." },
    { h: "Choosing a dependency", p: ["Before adding a package, ask whether you need it at all, and then check its health."],
      bullets: [
        "**Do you need it?** A tiny function is cheaper to write than to depend on forever.",
        "**Maintenance**: recent releases, active issue handling, more than one maintainer.",
        "**Popularity and community**: downloads and stars are not proof of safety, but a package with almost no users gets almost no scrutiny.",
        "**Security history**: past CVEs and how quickly they were fixed. Does it have a security policy?",
        "**Licence**: make sure it is compatible with your use.",
        "**Name check**: confirm the exact spelling to avoid typosquatting.",
        "**Size of the tree**: how many transitive dependencies does it bring?"],
      say: "I vet a package before adding it: need, maintenance, security record, licence and exact name." },
    { h: "Managing versions and lock files", bullets: [
        "**Lock files** (`package-lock.json`, `requirements.txt` with exact versions, `poetry.lock`) record the exact versions used so builds are repeatable. Commit them.",
        "**Pin versions** for reproducibility, and update on purpose after review and tests.",
        "**Do not leave things on 'latest'**: an unreviewed new version could carry a new flaw or malicious change.",
        "**Update regularly**: security patches only help if you apply them. Automate update alerts (for example Dependabot or Renovate).",
        "**Use `npm ci`** in CI to install exactly what the lock file says.",
        "**Install from trusted registries** and verify integrity hashes where supported."],
      beyond: "A caret range such as `^1.2.3` in package.json is NOT pinning. It allows any compatible 1.x version at install time. Exact pinning means `1.2.3` with no range, and the lock file is what actually freezes your tree.",
      say: "I commit lock files, update deliberately and regularly, and I use alerts so I hear about vulnerable versions quickly." },
    { h: "Scanning tools", p: [
        "**Software Composition Analysis (SCA)** tools compare your dependency list with databases of known vulnerabilities."],
      bullets: [
        "**`npm audit`**: checks npm dependencies against the npm advisory database. `npm audit fix` applies safe updates.",
        "**`pip-audit`**: checks Python packages against known vulnerabilities (for example the PyPI advisory data).",
        "**OWASP Dependency-Check**: scans many ecosystems and reports known CVEs for the libraries it identifies.",
        "**Dependabot, Renovate, Snyk**: automate alerts and update pull requests."],
      code: `# JavaScript
npm audit
npm audit fix
npm ci          # install exactly what package-lock.json says

# Python
pip install pip-audit
pip-audit -r requirements.txt

# Multi-language
dependency-check --scan . --format HTML`,
      beyond: "A clean scan does not mean zero risk. Scanners only know about **published** vulnerabilities, so a brand-new malicious package or an undisclosed flaw will not show up. Also triage results: a vulnerable function you never call is lower priority than one on your main request path.",
      say: "I scan on every build, triage by severity and reachability, and I know scanners cover known issues only." },
    { h: "Dependency checklist for a junior developer", bullets: [
        "Is this dependency really needed?",
        "Is it actively maintained, and does it have a security policy?",
        "Does the exact name match the real package?",
        "Does the project have known unfixed CVEs?",
        "Is the version pinned and the lock file committed?",
        "Does CI run `npm audit` or `pip-audit` on every build?",
        "Is there a plan to update and to remove unused packages?",
        "Do install scripts or permissions look suspicious?"] }
  ],
  qs: [
    Q("Risk", "What is a transitive dependency?", "A dependency of one of your dependencies", ["A dependency you wrote yourself", "A dependency in a test file only", "A dependency that is deleted"], "You inherit them without choosing them."),
    Q("Risk", "Why are dependencies a security risk?", "You inherit their vulnerabilities and the security habits of their maintainers", ["They make code run slower", "They are always malicious", "They are only a licence issue"], "Your app is only as secure as its weakest component."),
    Q("Risk", "Which breach came from an unpatched third-party component?", "Equifax (Apache Struts)", ["A lost USB drive", "A weak Wi-Fi password", "A stolen laptop"], "A known flaw had a patch that was not applied."),
    Q("Risk", "What is typosquatting?", "Publishing a malicious package with a name very close to a popular one", ["Fast typing contests", "Encrypting package names", "Deleting packages"], "Developers install the wrong name by mistake."),
    Q("Risk", "What is a supply chain attack?", "Compromising a trusted component so that everything that depends on it is affected", ["Attacking a delivery truck", "Phishing one user", "Flooding a server"], "One compromise scales to many victims."),
    Q("Risk", "What did the September 2025 chalk and debug attack involve?", "A phished maintainer's account used to publish malicious versions of popular npm packages", ["A DNS outage", "A broken CSS rule", "A stolen server rack"], "The packages were trusted, so the damage spread."),
    Q("Risk", "What made the Shai-Hulud npm worm different?", "It stole tokens and credentials and used them to publish infected packages, spreading itself", ["It only changed colours", "It required users to click a link", "It only affected Python"], "It propagated automatically."),
    Q("Risk", "Why can npm install scripts such as postinstall be dangerous?", "They run code on your machine when the package is installed", ["They slow the registry", "They delete lock files", "They are always disabled"], "A malicious package can act during install."),
    Q("Risk", "Why are abandoned packages a risk?", "They no longer receive security fixes", ["They are too fast", "They cannot be installed", "They use less memory"], "Known flaws stay unpatched."),
    Q("Risk", "Which OWASP Top 10:2025 category covers compromised libraries and build systems?", "A03: Software Supply Chain Failures", ["A01: Broken Access Control", "A05: Injection", "A09: Security Logging and Alerting Failures"], "It was expanded in the 2025 list."),
    Q("Choosing", "What is the first question to ask before adding a dependency?", "Do I really need it?", ["Does it have a logo?", "Is it the newest?", "Is it the biggest?"], "Less code means a smaller attack surface."),
    Q("Choosing", "Which is a sign of a healthier dependency?", "Recent releases, active maintenance and a security policy", ["No updates for five years", "No documentation", "Anonymous single maintainer and no history"], "Maintenance means fixes arrive."),
    Q("Choosing", "Does a high download count prove a package is safe?", "No, it is only one signal and popular packages are attractive targets", ["Yes, always", "Yes, if over 1000 downloads", "Yes, if it has a nice website"], "chalk and debug were hugely popular and still compromised."),
    Q("Choosing", "Why check a package's licence?", "To make sure you are legally allowed to use it as intended", ["To make it faster", "To hide it from scanners", "To change its name"], "Licence compliance is part of dependency management."),
    Q("Choosing", "You mistype `reqeusts` and it installs successfully. What is the danger?", "It might be a typosquatted malicious package", ["Nothing, it is the same", "It will be faster", "It disables the lock file"], "Always verify exact names."),
    Q("Versions", "What does a lock file do?", "Records the exact versions installed so builds are repeatable", ["Encrypts the project", "Blocks all updates forever", "Deletes dev dependencies"], "It freezes the whole tree."),
    Q("Versions", "Should lock files be committed to version control?", "Yes", ["No, never", "Only for Python", "Only on Fridays"], "They make builds consistent for the whole team and CI."),
    Q("Versions", "What does `^1.2.3` in package.json mean?", "Any compatible 1.x version at or above 1.2.3 may be installed. It is not an exact pin", ["Exactly version 1.2.3", "Only version 2.0.0", "Never update"], "The lock file is what freezes the version."),
    Q("Versions", "What does `npm ci` do?", "Installs exactly what package-lock.json specifies, which suits CI builds", ["Cleans the internet", "Updates every package to latest", "Publishes the package"], "It makes builds reproducible."),
    Q("Versions", "Why not leave all dependencies on 'latest'?", "An unreviewed new version could carry a flaw or malicious change and breaks reproducibility", ["Latest is always the safest", "Latest is slower to install", "Latest is not allowed by Git"], "Update deliberately after review and tests."),
    Q("Versions", "Why update dependencies regularly?", "Security patches only protect you when applied", ["Updates change the colour scheme", "It reduces the file size only", "It removes the need for tests"], "Many breaches use flaws that already had fixes."),
    Q("Scanning", "What does `npm audit` do?", "Checks your npm dependencies against known vulnerability advisories", ["Formats your code", "Deploys your site", "Deletes unused files"], "It is an SCA check."),
    Q("Scanning", "Which tool audits Python dependencies for known vulnerabilities?", "pip-audit", ["npm audit", "eslint", "git blame"], "It scans installed or listed Python packages."),
    Q("Scanning", "What is OWASP Dependency-Check?", "A tool that identifies libraries in a project and reports known CVEs for them", ["A firewall", "A password manager", "A code formatter"], "It works across several ecosystems."),
    Q("Scanning", "What does SCA stand for?", "Software Composition Analysis", ["Secure Code Archive", "System Compliance Audit", "Static Code Alerting"], "It analyses the components you use."),
    Q("Scanning", "Your scan shows zero known vulnerabilities. What can you conclude?", "No known, published issues were found, but unknown or brand-new malicious packages are not covered", ["The app is perfectly secure", "No attacker can reach it", "You can stop updating"], "Scanners work from known data."),
    Q("Scanning", "How should you prioritise scan results?", "By severity and whether the vulnerable code is reachable in your application", ["Alphabetically", "By package size", "Ignore all of them"], "Triage keeps work focused."),
    Q("Scanning", "Which practice best catches vulnerable dependencies continuously?", "Running audits in CI on every build and enabling automated update alerts", ["Auditing once a year", "Only auditing before a demo", "Never auditing to save time"], "Automation prevents drift."),
    Q("Scanning", "What do Dependabot and Renovate provide?", "Automated alerts and pull requests for dependency updates", ["Code formatting", "Penetration tests", "Password hashing"], "They reduce the time to patch."),
    Q("Scanning", "`npm audit fix` is best described as:", "Applying safe updates that resolve known advisories, to be reviewed and tested", ["A guaranteed fix for every issue", "A way to ignore vulnerabilities", "A deployment command"], "Some fixes need manual major upgrades.")
  ],
  match: [
    M("Match the dependency threat to its description", "Dependency risks.", [
      ["Typosquatting", "A malicious package with a name close to a popular one"],
      ["Transitive dependency", "A dependency pulled in by one of your dependencies"],
      ["Abandoned package", "No maintainer, so no security fixes"],
      ["Install script abuse", "Malicious code runs at install time, such as postinstall"],
      ["Supply chain attack", "A trusted package is compromised and spreads to its users"],
      ["Known vulnerability", "A published CVE in an outdated version"]]),
    M("Match the tool to its job", "Scanning and management.", [
      ["npm audit", "Checks npm dependencies for known vulnerabilities"],
      ["pip-audit", "Checks Python packages for known vulnerabilities"],
      ["OWASP Dependency-Check", "Reports CVEs for libraries found in a project"],
      ["Dependabot or Renovate", "Opens automated pull requests to update dependencies"],
      ["npm ci", "Installs exactly what the lock file records"],
      ["Lock file", "Freezes the exact versions of the whole dependency tree"]]),
    M("Match the incident to what happened", "Dependency incidents.", [
      ["Equifax (2017)", "An unpatched Apache Struts component was exploited"],
      ["chalk and debug (Sept 2025)", "A phished maintainer's account published malicious npm versions"],
      ["Shai-Hulud (Sept 2025)", "A worm stole tokens and published infected packages automatically"],
      ["Log4Shell (2021)", "A flaw in a widely used logging library affected millions of systems"]])
  ],
  order: [
    O("Order a safe way to add a new dependency", "A sensible sequence.", [
      "Decide whether the dependency is really needed",
      "Check maintenance, security history, licence and the exact name",
      "Install it and commit the updated lock file",
      "Run npm audit or pip-audit and review the results",
      "Enable automated update alerts and re-scan in CI"])
  ],
  open: [
    E("Explain why third-party dependencies are a security risk.", [
      "You inherit their vulnerabilities, including from transitive dependencies you never chose.",
      "Packages can be malicious (typosquatting), abandoned, or compromised in a supply chain attack.",
      "Equifax, Log4Shell and the 2025 npm attacks show how one component can affect many systems."]),
    E("Exercise: write a dependency checklist for a junior developer.", [
      "Do I need this package at all?",
      "Is it maintained, with recent releases and a security policy?",
      "Is the name exact, and is the licence compatible?",
      "Are versions pinned and the lock file committed?",
      "Do audits run in CI, and are alerts enabled?",
      "Is there a plan to update and remove unused packages?"]),
    E("Explain how npm audit and pip-audit work and what their limits are.", [
      "They compare your dependency list with databases of known vulnerabilities and report matches with severity and fix versions.",
      "Limits: they only know published issues, can have false positives, and do not catch brand-new malicious packages.",
      "Use them in CI and combine them with reviewing and updating dependencies."]),
    E("What is the difference between a caret range and pinning?", [
      "`^1.2.3` allows any compatible 1.x version at install time. `1.2.3` is an exact version.",
      "The lock file records what was actually installed, so use it and `npm ci` for reproducible builds.",
      "Update deliberately and test."]),
    E("A scan finds a high-severity CVE in a transitive dependency. What do you do?", [
      "Check if the vulnerable code is reachable and how it could be exploited.",
      "Update the parent dependency or override the transitive version if a fix exists.",
      "If no fix exists, consider replacing the package or applying a mitigation, and re-scan after the change.",
      "Document the decision."]),
    E("Describe the Shai-Hulud worm and what developers can learn from it.", [
      "In September 2025 it stole tokens and credentials from infected environments and used them to publish more infected npm packages, spreading quickly.",
      "Lessons: limit and rotate tokens, use multi-factor authentication for maintainers, review install scripts, pin and lock versions and monitor for unusual package updates."])
  ]
};
