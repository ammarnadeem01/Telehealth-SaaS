export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "1 AI Symptom Check",
        "Basic EHR Access",
        "Email Support",
        "3 Doctor Messages/Month",
      ],
    },
    {
      name: "Pro",
      price: "$29",
      features: [
        "Unlimited AI Checks",
        "Advanced EHR Access",
        "Priority Support",
        "Unlimited Messages",
        "Video Consultations",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "All Pro Features",
        "Team Management",
        "Custom Workflows",
        "Dedicated Support",
        "SLA Agreements",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pricing Plans
          </h1>
          <p className="text-xl text-gray-600">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`bg-white p-8 rounded-xl shadow-sm ${
                index === 1 ? "border-2 border-blue-600" : ""
              }`}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h2>
              <div className="text-4xl font-bold text-blue-600 mb-6">
                {plan.price}
                <span className="text-lg text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-md ${
                  index === 1
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
