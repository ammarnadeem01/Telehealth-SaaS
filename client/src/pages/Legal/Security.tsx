// Security.tsx
export default function Security() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Security Standards
          </h1>
          <p className="text-gray-500 text-sm">
            ISO 27001:2022 Certified | HIPAA Compliant | SOC 2 Type II Audited
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              1. Technical Safeguards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Encryption</h3>
                <p className="text-sm text-gray-600">
                  • AES-256 for data at rest
                  <br />
                  • TLS 1.3 with PFS
                  <br />• FIPS 140-2 validated modules
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Access Controls</h3>
                <p className="text-sm text-gray-600">
                  • RBAC with least privilege
                  <br />
                  • Biometric MFA enforcement
                  <br />• JIT access provisioning
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              2. Organizational Measures
            </h2>
            <div className="space-y-4 pl-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Security Training</h3>
                <p className="text-sm text-gray-600">
                  • Annual HIPAA certification
                  <br />
                  • Phishing simulation exercises
                  <br />• Secure coding practices training
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Vendor Management</h3>
                <p className="text-sm text-gray-600">
                  • Third-party risk assessments
                  <br />
                  • BAA agreements with all subprocessors
                  <br />• Continuous monitoring
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              3. Compliance Framework
            </h2>
            <div className="space-y-4 pl-4">
              <p className="text-gray-600">
                • Annual independent audits for:
                <br />
                &nbsp;&nbsp;- HIPAA (45 CFR Part 160 and Subparts A and C of
                Part 164)
                <br />
                &nbsp;&nbsp;- GDPR Article 32 requirements
                <br />
                &nbsp;&nbsp;- CCPA (1798.100-1798.199)
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              4. Incident Response
            </h2>
            <div className="space-y-4 pl-4">
              <p className="text-gray-600">
                • 24/7 Security Operations Center (SOC) monitoring
                <br />
                • Breach notification within 72 hours of determination
                <br />• Full forensic investigation workflow
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              5. Architecture Overview
            </h2>
            <div className="pl-4">
              <img
                src="/security-architecture.png"
                alt="Security Architecture"
                className="mb-4 rounded-lg"
              />
              <p className="text-gray-600 text-sm">
                Zero-trust architecture with microsegmentation and continuous
                verification
              </p>
            </div>
          </section>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Certifications</h3>
            <div className="flex flex-wrap gap-4">
              <img
                src="/iso-27001-badge.png"
                className="h-12"
                alt="ISO 27001"
              />
              <img
                src="/hipaa-compliant-badge.png"
                className="h-12"
                alt="HIPAA"
              />
              <img src="/soc2-badge.png" className="h-12" alt="SOC 2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
