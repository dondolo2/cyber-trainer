import { Q, M, E, O } from "../lib/helpers.js";

export default {
  id: 19, day: 19, short: "Policy as Code & IaC", title: "Policy as Code and Infrastructure Security",
  outcome: "Explain Policy as Code and its benefits, run a basic IaC scan to find misconfigurations, and describe who owns what in DevSecOps.",
  theory: [
    { h: "Securing the foundation", p: [
        "Applications run on servers, networks, databases and cloud services. More and more, that infrastructure is defined in code (**Infrastructure as Code, IaC**) with tools such as Terraform, CloudFormation and Ansible. That brings speed, version control and repeatability, but also a new attack surface: one misconfiguration in a template can expose an entire environment.",
        "**Policy as Code (PaC)** answers this by defining security, compliance and operational rules as executable code that is enforced automatically."],
      say: "Infrastructure is code now, so I secure it like code: scan it, review it and enforce policies on it automatically." },
    { h: "What Policy as Code is", p: [
        "Policy as Code defines policies in a machine-readable, version-controlled format, so they can be tested, automated and enforced consistently instead of relying on manual checks."],
      bullets: [
        "**Consistency and repeatability**: uniform application across environments, with no human error or drift.",
        "**Early detection**: policies are evaluated in CI/CD before infrastructure is provisioned.",
        "**Automated enforcement**: block non-compliant deployments or auto-remediate. Security becomes proactive.",
        "**Version control and auditability**: a trail of who changed which policy and when.",
        "**Collaboration**: security defines rules, developers understand and follow them.",
        "**Scalability**: works across thousands of resources."],
      say: "PaC makes the rules executable, repeatable and auditable, and it stops bad configuration before it exists." },
    { h: "How Policy as Code works", bullets: [
        "**Policy definition language**: for example **Rego** for Open Policy Agent (OPA) or **Sentinel** for HashiCorp products.",
        "**Policy engine**: evaluates configurations or requests against the policies.",
        "**Integration points**: pre-commit hooks, CI/CD pipelines (check templates before provisioning and verify deployed resources), and runtime enforcement such as Kubernetes admission controllers."],
      code: `package kubernetes.admission

import rego.v1

# Deny pods that run privileged containers
deny contains msg if {
  input.request.kind.kind == "Pod"
  some c in input.request.object.spec.containers
  c.securityContext.privileged == true
  msg := sprintf("container %v must not run privileged", [c.name])
}

# Deny public LoadBalancer services unless explicitly approved
deny contains msg if {
  input.request.kind.kind == "Service"
  input.request.object.spec.type == "LoadBalancer"
  not input.request.object.metadata.annotations["approved-public"]
  msg := "public LoadBalancer services need the approved-public annotation"
}`,
      beyond: "The lesson's Rego example was an image. This is my own version in the current Rego syntax (`import rego.v1`, `deny contains msg if`). Older tutorials use `deny[msg] { ... }`, which is the same idea in the older syntax. Both appear in the wild, so learn to read each.",
      say: "A policy is a rule plus an engine plus an enforcement point. Put together, insecure deployments are blocked automatically." },
    { h: "Running a basic IaC scan", p: [
        "IaC scanners parse your configuration files (`.tf`, YAML, JSON) and compare them with built-in rules, so you can fix problems before anything is provisioned."],
      bullets: [
        "**tfsec**: scans Terraform code for misconfigurations.",
        "**Checkov**: open-source static analysis for Terraform, CloudFormation, Kubernetes, ARM templates and more.",
        "**Kube-bench**: runs the checks of the CIS Kubernetes Benchmark against a cluster."],
      code: `# main.tf : an intentionally insecure S3 bucket
resource "aws_s3_bucket" "data" {
  bucket = "my-demo-data-bucket-12345"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Scan it
tfsec .
checkov -d .

# Fix: turn all four settings to true, then re-scan`,
      beyond: "Aqua Security, the maker of tfsec, has been folding tfsec's checks into **Trivy** (`trivy config .`), so tfsec is in maintenance mode. It still works and is what the course uses, but check which scanner your team uses. The Terraform file above is my own example, because the lesson's was an image. Newer Terraform AWS provider versions manage public access through `aws_s3_bucket_public_access_block`, as shown.",
      say: "I run tfsec or Checkov on infrastructure code, read the findings, fix the template and re-scan, all before anything is created." },
    { h: "Who owns what in DevSecOps", p: [
        "Shared responsibility does not mean no responsibility. Each role has specific accountabilities."],
      bullets: [
        "**Developers**: secure application code, secure coding standards, security unit tests, SAST and SCA in their workflow and CI/CD, and secure IaC for application-specific infrastructure that passes scans.",
        "**Operations and SRE**: secure the underlying infrastructure (cloud accounts, Kubernetes clusters, networks), monitoring, incident response, secure deployment, plus defining and enforcing organisation-wide IaC policies and managing shared templates.",
        "**Security team**: define security policies, threat modelling, penetration testing, training and advice, overall risk, and writing the Policy as Code rules and reviewing IaC scan results.",
        "**Collaboration is key**: developers must understand infrastructure choices, operations must understand application requirements, and security must give actionable guidance and tools."],
      beyond: "This is the same idea as the **cloud shared responsibility model** used by providers such as AWS and Azure. The provider secures the underlying cloud, and the customer secures what they put in it, including configuration, identities and data. Most cloud breaches come from customer-side misconfiguration, which is why IaC scanning and PaC matter.",
      say: "Developers prevent, operations run and monitor, security defines and verifies, and they all have to talk to each other." }
  ],
  qs: [
    Q("IaC", "What is Infrastructure as Code?", "Defining and managing infrastructure through version-controlled code", ["Writing infrastructure on paper", "Buying servers by email", "Painting network cables"], "Terraform, CloudFormation and Ansible are examples."),
    Q("IaC", "What new risk does IaC introduce?", "A single misconfigured template can expose an entire environment", ["Servers become slower", "Code cannot be reviewed", "Version control stops working"], "Mistakes are repeated at scale."),
    Q("IaC", "Which of these is an IaC tool?", "Terraform", ["Photoshop", "Excel", "Zoom"], "It defines infrastructure in code."),
    Q("PaC", "What is Policy as Code?", "Defining policies in machine-readable, version-controlled code that is enforced automatically", ["A paper policy manual", "A weekly meeting", "A type of password"], "Policies become testable and automatic."),
    Q("PaC", "Which is a benefit of Policy as Code?", "Consistent, automated enforcement across all environments", ["Slower deployments", "More manual checks", "Less auditability"], "It removes human error and drift."),
    Q("PaC", "How does PaC provide auditability?", "Policies live in version control, showing who changed what and when", ["It deletes history", "It hides policies", "It encrypts logs"], "Git history becomes an audit trail."),
    Q("PaC", "When can policies be evaluated to give the earliest detection?", "In CI/CD, before infrastructure is provisioned", ["After the breach", "Never", "A year later"], "Insecure configurations never get deployed."),
    Q("PaC", "How does PaC improve collaboration?", "Security defines the policies and developers can read and follow them", ["It removes developers", "It removes security", "It hides policy from developers"], "Everyone works from the same code."),
    Q("PaC", "Why does PaC scale well?", "The same policies can be applied automatically across thousands of resources", ["It needs one person per resource", "It only works on one server", "It requires paper forms"], "Manual enforcement does not scale."),
    Q("PaC", "Which language is used by Open Policy Agent to write policies?", "Rego", ["Python only", "SQL", "HTML"], "Rego is OPA's policy language."),
    Q("PaC", "Which is the policy language used with HashiCorp products?", "Sentinel", ["Rego", "Bash", "YAML"], "It integrates with Terraform Enterprise and Cloud."),
    Q("PaC", "What is a policy engine?", "A component that evaluates configurations or requests against policies", ["A web browser", "A database", "A text editor"], "It makes the allow or deny decision."),
    Q("PaC", "What does a Kubernetes admission controller with a Rego policy do?", "Blocks resources that violate the policy before they are created", ["Backs up the cluster", "Renames pods", "Shrinks images"], "It enforces policy at runtime of the API request."),
    Q("PaC", "A Rego policy denies pods with `privileged == true`. What does it prevent?", "Containers running with privileged access to the host", ["Slow images", "Large logs", "Duplicate names"], "Privileged containers weaken isolation."),
    Q("PaC", "Which are valid integration points for Policy as Code?", "Pre-commit hooks, CI/CD pipelines and runtime admission control", ["Only manual email approval", "Only the CEO's laptop", "Only printed forms"], "Policies can be enforced at several stages."),
    Q("Scanning", "What do IaC scanners analyse?", "Configuration files such as Terraform, YAML and JSON", ["Network traffic", "User passwords", "Source maps"], "They evaluate against security rules."),
    Q("Scanning", "Which tool scans Terraform for security misconfigurations?", "tfsec", ["ESLint", "Bandit", "TruffleHog"], "It is a Terraform scanner."),
    Q("Scanning", "Which tool supports Terraform, CloudFormation, Kubernetes and ARM templates?", "Checkov", ["tfsec only", "Bandit", "npm audit"], "It covers many IaC formats."),
    Q("Scanning", "What does Kube-bench check?", "Whether Kubernetes is deployed according to the CIS Kubernetes Benchmark", ["JavaScript syntax", "Python dependencies", "SQL queries"], "It audits cluster configuration."),
    Q("Scanning", "Which command runs Checkov on the current directory?", "checkov -d .", ["checkov --bake .", "npm checkov", "tfsec --checkov"], "-d points at the directory."),
    Q("Scanning", "Which command runs tfsec on the current directory?", "tfsec .", ["tfsec -install", "terraform scan", "npm tfsec"], "It scans the Terraform files there."),
    Q("Scanning", "Which Terraform configuration is a problem?", "An S3 bucket with all public access block settings set to false", ["A bucket with public access blocked", "A private bucket", "An encrypted bucket"], "It allows public exposure."),
    Q("Scanning", "A security group allows inbound 0.0.0.0/0 on port 22. What is wrong?", "SSH is open to the whole internet", ["Nothing, it is common", "It blocks all traffic", "It encrypts traffic"], "Restrict to trusted IP ranges."),
    Q("Scanning", "How do you fix an insecure Terraform finding?", "Edit the template to be secure and re-run the scanner to confirm", ["Delete the scanner", "Ignore the warning", "Add a comment"], "Fix, then verify."),
    Q("Scanning", "Why fix IaC issues before provisioning?", "Insecure infrastructure never gets created, which avoids exposure and costly clean-up", ["Cloud is free", "Scans only run before provisioning", "It is faster to guess"], "Prevention is cheaper than remediation."),
    Q("Ownership", "Who is primarily responsible for writing secure application code?", "Developers", ["Only the security team", "Only operations", "Only customers"], "They own the code they write."),
    Q("Ownership", "Who typically defines and enforces organisation-wide IaC policies and manages shared templates?", "Operations or SRE", ["Marketing", "The front-end designer only", "Customers"], "They run the shared infrastructure."),
    Q("Ownership", "Who typically defines the Policy as Code rules and reviews IaC scan results?", "The security team", ["Only a junior designer", "Only the product owner", "Nobody"], "They translate security requirements into policy."),
    Q("Ownership", "A developer provisions a public S3 bucket by mistake. Who has the main responsibility for preventing it?", "The developer, supported by IaC scans and policies from operations and security", ["Only the cloud provider", "Only the customer", "Nobody"], "Prevention starts with the author, and automation backs it up."),
    Q("Ownership", "What does 'shared responsibility' really mean?", "Each role has specific accountabilities, and it does not mean no responsibility", ["Nobody is responsible", "Only security is responsible", "Only developers are responsible"], "Clear roles with collaboration.")
  ],
  match: [
    M("Match the term to its meaning", "Policy as Code vocabulary.", [
      ["Policy as Code", "Policies defined as version-controlled, executable code"],
      ["Rego", "The policy language of Open Policy Agent"],
      ["Sentinel", "Policy language for HashiCorp products"],
      ["Policy engine", "Evaluates configurations against policies"],
      ["Admission controller", "Blocks non-compliant Kubernetes resources at creation time"],
      ["Infrastructure as Code", "Infrastructure defined and managed through code"]]),
    M("Match the tool to what it scans", "IaC and cluster tools.", [
      ["tfsec", "Terraform code"],
      ["Checkov", "Terraform, CloudFormation, Kubernetes and ARM templates"],
      ["Kube-bench", "Kubernetes clusters against the CIS Benchmark"],
      ["OPA", "Evaluates policies written in Rego"]]),
    M("Match the benefit to Policy as Code", "Why PaC matters.", [
      ["Consistency", "Same policies everywhere, no drift"],
      ["Early detection", "Evaluation before provisioning"],
      ["Automated enforcement", "Non-compliant deployments are blocked"],
      ["Auditability", "Policy changes tracked in version control"],
      ["Collaboration", "Security writes the rules and developers follow them"],
      ["Scalability", "Applies to thousands of resources"]]),
    M("Match the role to its responsibility", "Shared ownership.", [
      ["Developers", "Secure application code and application-specific IaC"],
      ["Operations or SRE", "Secure underlying infrastructure, monitoring and shared IaC policies"],
      ["Security team", "Define policies, threat model, pen test and review scan results"]])
  ],
  order: [
    O("Order the IaC scan and fix workflow", "From first step to last.", [
      "Write or modify the Terraform configuration",
      "Run tfsec or Checkov on the directory",
      "Read the findings and identify the misconfiguration",
      "Edit the template to apply the fix",
      "Re-run the scanner to confirm it passes before provisioning"])
  ],
  open: [
    E("Explain Policy as Code and its main benefits.", [
      "It defines security and compliance policies as executable, version-controlled code evaluated by a policy engine.",
      "Benefits: consistency, early detection before provisioning, automated enforcement, auditability, collaboration and scalability."]),
    E("Exercise 1: analyse a Rego policy that blocks an insecure configuration. Explain how it works.", [
      "The policy says what is not allowed, for example privileged containers or SSH open to 0.0.0.0/0.",
      "The input is the configuration being evaluated, such as a Kubernetes Pod or Service.",
      "The engine evaluates the input against the policy. If a rule matches, it produces a denial message and the request is blocked. A compliant input produces no denials.",
      "To fix a rejected input, change the config to meet the rule (for example restrict the CIDR). To allow an exception, add a narrow condition such as a trusted IP range.",
      "It supports continuous assurance because every change is checked the same way, automatically."],
      "The GRC Playground examples may change, so describe the pattern: policy, input, output."),
    E("Exercise 2: run tfsec or Checkov on an insecure Terraform file and describe the fix.", [
      "Create `main.tf` with a public S3 bucket or a security group open on port 22 to 0.0.0.0/0.",
      "Run `tfsec .` or `checkov -d .` and read the findings.",
      "Fix it: enable all four public access block settings, or restrict the ingress CIDR to a trusted range.",
      "Re-run to confirm the finding is gone."]),
    E("Exercise 3: who owns prevention and detection in the three DevSecOps scenarios?", [
      "Public S3 bucket: the developer owns preventing it in the IaC. The pipeline and policies (set by operations and security) detect and block it, and operations and security remediate if it slips through.",
      "Vulnerable library: the developer owns keeping dependencies updated. The CI pipeline's SCA scan detects it, and the security team sets the threshold and reviews.",
      "Weak database password: operations own the database configuration. Monitoring and policy checks detect it, and security defines the baseline. The developer must not hardcode default passwords in the first place.",
      "Communication and shared tooling prevent these issues in the first place."]),
    E("Why is IaC an attack surface in its own right?", [
      "Templates define the entire environment, so one mistake is replicated everywhere.",
      "Misconfigured storage, open ports and over-permissive roles come from templates.",
      "Scanning and policies catch them before they are deployed."]),
    E("What is the difference between an IaC scan and a Policy as Code rule?", [
      "An IaC scanner uses a built-in rule set to find known misconfigurations in templates.",
      "Policy as Code lets your organisation write its own rules, for example required tags or no public load balancers, and enforce them in the pipeline or at runtime.",
      "They complement each other."])
  ]
};
