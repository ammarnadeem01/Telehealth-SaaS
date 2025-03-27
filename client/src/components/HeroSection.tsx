export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            AI-Powered Telehealth Care
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Connect with certified doctors instantly, get AI-driven health
            insights, and manage your medical records securely from anywhere.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Book Appointment
            </button>
            <button className="mt-3 sm:mt-0 sm:ml-3 px-8 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
