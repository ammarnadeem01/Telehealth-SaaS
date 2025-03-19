export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About HealthAI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Revolutionizing healthcare through AI-powered solutions and
            compassionate care
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4">
              To make quality healthcare accessible, affordable, and convenient
              for everyone through technology innovation. We combine artificial
              intelligence with human expertise to deliver personalized medical
              care.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                Core Values
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Patient-first approach</li>
                <li>Medical excellence</li>
                <li>Technological innovation</li>
                <li>Data security & privacy</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="text-center p-4 hover:bg-gray-50 rounded-lg"
                >
                  <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-4" />
                  <h3 className="font-semibold">Dr. Example Name</h3>
                  <p className="text-sm text-gray-600">Cardiologist</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">24/7 Medical Support</h2>
          <p className="mb-6">
            Connect with certified doctors anytime, anywhere
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100">
            Find a Doctor
          </button>
        </div>
      </div>
    </div>
  );
}
