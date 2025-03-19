// PrivacyPolicy.tsx
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm">
            Effective Date: February 17,2025 | Last Updated: March 17,2025
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              1. Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">1.1 Personal Data</h3>
                <p className="text-gray-600 pl-4">
                  • Identifiers: Name, email, phone number, physical address
                  <br />
                  • Protected Health Information (PHI): Medical history,
                  diagnoses, treatment records
                  <br />
                  • Commercial Information: Services purchased, payment details
                  <br />• Technical Data: IP address, device identifiers, usage
                  patterns
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  1.2 Collection Methods
                </h3>
                <p className="text-gray-600 pl-4">
                  • Direct interactions (forms, consultations)
                  <br />
                  • Automated technologies (cookies, analytics tools)
                  <br />• Third-party sources (healthcare providers, insurance
                  companies)
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              2. Legal Basis for Processing
            </h2>
            <div className="space-y-4 pl-4">
              <p className="text-gray-600">
                • Performance of Contract (Article 6(1)(b) GDPR)
                <br />
                • Legitimate Interests (Article 6(1)(f) GDPR)
                <br />
                • Legal Obligations (Article 6(1)(c) GDPR)
                <br />• Explicit Consent (Article 9(2)(a) GDPR for health data)
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              3. Data Sharing & Disclosures
            </h2>
            <div className="space-y-4 pl-4">
              <p className="text-gray-600">
                • Healthcare providers for treatment coordination
                <br />
                • Payment processors under PCI-DSS compliance
                <br />
                • Government agencies as required by HIPAA §164.512
                <br />• Business transfers under CCPA §1798.100 et seq.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              4. International Transfers
            </h2>
            <p className="text-gray-600 pl-4">
              Data transfers outside the EEA utilize Standard Contractual
              Clauses (SCCs) and comply with EU-US Data Privacy Framework
              requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              5. Your Rights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">GDPR Rights</h3>
                <p className="text-sm text-gray-600">
                  • Right to Access (Article 15)
                  <br />
                  • Right to Rectification (Article 16)
                  <br />• Right to Erasure (Article 17)
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">CCPA Rights</h3>
                <p className="text-sm text-gray-600">
                  • Right to Know (1798.100(a))
                  <br />
                  • Right to Delete (1798.105(a))
                  <br />• Right to Opt-Out (1798.120(a))
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              6. Security Measures
            </h2>
            <p className="text-gray-600 pl-4">
              • AES-256 encryption for data at rest
              <br />
              • TLS 1.3+ for data in transit
              <br />
              • Annual penetration testing
              <br />• SOC 2 Type II compliant infrastructure
            </p>
          </section>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Contact Information</h3>
            <p className="text-gray-600">
              Data Protection Officer:
              <br />
              Ammar Nadeem
              <br />
              nadeemammar04@gmail.com
              <br />
              0322-8696218
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
