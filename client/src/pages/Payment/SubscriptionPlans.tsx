import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const BASE_URL = import.meta.env.VITE_API_URL;

// Plans for
const patientPlans = [
  {
    name: "Basic Care",
    price: "$20/month",
    features: [
      "One virtual consultation per month",
      "Access to general practitioners",
      "Basic follow-up support",
    ],
    buttonText: "Get Started",
    priceId: "price_basic_care",
  },
  {
    name: "Standard Care",
    price: "$50/month",
    features: [
      "Up to 4 virtual consultations per month",
      "Access to specialists",
      "Priority appointment scheduling",
      "Online prescription refills",
    ],
    buttonText: "Subscribe Now",
    priceId: "price_standard_care",
  },
  {
    name: "Premium Care",
    price: "$99/month",
    features: [
      "Unlimited virtual consultations",
      "24/7 telehealth support",
      "Personalized care plans",
      "Direct access to top specialists",
      "Priority emergency support",
    ],
    buttonText: "Subscribe Now",
    priceId: "price_premium_care",
  },
];

// Plans for doctors/providers
const doctorPlans = [
  {
    name: "Basic Provider",
    price: "$19.99/month",
    features: [
      "Access to 10 patient appointments per month",
      "Basic appointment management",
      "Platform promotion & analytics",
    ],
    buttonText: "Join Now",
    priceId: "price_doctor_basic",
  },
  {
    name: "Pro Provider",
    price: "$39.99/month",
    features: [
      "Access to 30 patient appointments per month",
      "Advanced appointment management",
      "Enhanced platform promotion",
      "Detailed analytics dashboard",
    ],
    buttonText: "Join Now",
    priceId: "price_doctor_pro",
  },
  {
    name: "Premium Provider",
    price: "$79.99/month",
    features: [
      "Unlimited patient appointments",
      "Priority scheduling",
      "Dedicated account manager",
      "Custom marketing support",
    ],
    buttonText: "Join Now",
    priceId: "price_doctor_premium",
  },
];

export default function SubscriptionPlans() {
  //   const { user } = useAuthStore();
  // Toggle state for role ("patient" or "doctor")
  const [role, setRole] = useState("patient");

  const handleSubscribe = async (priceId: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/payment/v1/create-checkout-session`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priceId }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.url) window.location.href = data.url; // Redirect to Stripe
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Choose the plans based on selected role
  const plans = role === "patient" ? patientPlans : doctorPlans;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Toggle Switch for Patient/Doctor */}
      <div className="flex items-center justify-center mb-6">
        <button
          onClick={() => setRole("patient")}
          className={`px-4 py-2 border border-gray-300 ${
            role === "patient"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          } rounded-l`}
        >
          Patient
        </button>
        <button
          onClick={() => setRole("doctor")}
          className={`px-4 py-2 border-t border-b border-r border-gray-300 ${
            role === "doctor"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          } rounded-r`}
        >
          Doctor
        </button>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {role === "patient"
          ? "Choose Your TeleCure Plan"
          : "Choose Your Provider Plan"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className="p-6 bg-white shadow-xl rounded-2xl text-center flex flex-col justify-between"
          >
            <div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {plan.name}
                </CardTitle>
                <p className="text-lg text-gray-600 font-medium">
                  {plan.price}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4 text-gray-700">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-green-500 w-5 h-5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </div>
            <div className="flex justify-center mt-4">
              <Button
                className="text-white bg-blue-600 hover:bg-blue-700"
                onClick={() => handleSubscribe(plan.priceId)}
              >
                {plan.buttonText}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
