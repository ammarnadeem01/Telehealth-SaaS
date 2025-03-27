export default function Features() {
  const features = [
    {
      title: "AI Symptom Checker",
      description:
        "Get instant preliminary diagnosis using our advanced AI system",
      icon: "🤖",
    },
    {
      title: "Video Consultations",
      description: "HD video calls with certified doctors in real-time",
      icon: "📹",
    },
    {
      title: "EHR Management",
      description: "Secure access to your complete medical history",
      icon: "📁",
    },
    {
      title: "Smart Reminders",
      description: "Never miss an appointment with our AI-powered reminders",
      icon: "⏰",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose TeleCure?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 hover:bg-gray-50 rounded-lg"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
