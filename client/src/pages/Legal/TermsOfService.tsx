// TermsOfService.tsx
export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-500 text-sm">
            Effective Date: March 18, 2025 | Binding Arbitration Agreement
            Included
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 pl-4">
              By accessing or using the Services, you agree to be bound by these
              Terms and our Privacy Policy (incorporated by reference). If using
              on behalf of an entity, you represent authority to bind such
              entity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              2. Service Description
            </h2>
            <div className="space-y-4 pl-4">
              <p className="text-gray-600">
                • Telemedicine consultations
                <br />
                • Electronic health record management
                <br />
                • Prescription services
                <br />• Health analytics platform
              </p>
              <p className="text-red-600 text-sm">
                Note: Not for emergency medical situations. In case of
                emergency, contact 911 or visit nearest emergency room.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              3. User Obligations
            </h2>
            <div className="space-y-4 pl-4">
              <p className="text-gray-600">
                • Maintain accurate registration information
                <br />
                • Protect account credentials
                <br />
                • Comply with all applicable laws (including HIPAA and 21st
                Century Cures Act)
                <br />• Prohibit reverse engineering or unauthorized access
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              4. Intellectual Property
            </h2>
            <div className="space-y-4 pl-4">
              <p className="text-gray-600">
                All content and software are protected under:
                <br />
                • Copyright laws (17 U.S.C. § 101 et seq.)
                <br />
                • Patent pending technologies
                <br />• Trademark registrations
              </p>
              <p className="text-sm text-gray-500">
                Limited license granted for personal, non-commercial use only.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              5. Dispute Resolution
            </h2>
            <div className="space-y-4 pl-4">
              <h3 className="text-lg font-medium">5.1 Binding Arbitration</h3>
              <p className="text-gray-600">
                Any dispute arising under these Terms shall be resolved through
                final and binding arbitration administered by JAMS under its
                Comprehensive Arbitration Rules, conducted in [Jurisdiction].
              </p>
              <h3 className="text-lg font-medium">5.2 Class Action Waiver</h3>
              <p className="text-gray-600">
                Claims must be brought in individual capacity only, not as class
                member or in representative capacity.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              6. Limitation of Liability
            </h2>
            <div className="space-y-4 pl-4">
              <p className="text-gray-600">
                • Cap on damages: Fees paid in 12 months preceding claim
                <br />
                • Exclusion of consequential damages
                <br />• Medical disclaimer: Not liable for treatment outcomes
              </p>
            </div>
          </section>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Governing Law</h3>
            <p className="text-gray-600">
              These Terms shall be governed by the laws of the State of Pakistan
              without regard to conflict of law principles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
