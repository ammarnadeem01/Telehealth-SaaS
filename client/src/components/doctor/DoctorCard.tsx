function DoctorCard({ doctor }: any) {
  return (
    <div>
      <div
        key={doctor.id}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
          <p className="text-gray-600 mb-2">{doctor.specialty}</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-yellow-500">★ {doctor.rating}</span>
            <span className="text-sm text-green-600 capitalize">
              {doctor.availability}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {doctor.languages.map((lang: any) => (
              <span
                key={lang}
                className="px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
              >
                {lang}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              ${doctor.consultationFee}/consultation
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Book Now
              </button>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
                Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
