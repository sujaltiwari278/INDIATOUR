function TripInfoCard({
  tripName,
  setTripName,
}) {
  return (
    <div
      className="
      bg-white/90
      backdrop-blur-sm
      border
      border-orange-100
      rounded-3xl
      shadow-lg
      hover:shadow-2xl
      transition-all
      duration-300
      p-6
      h-full
    "
    >
      <div className="flex items-center gap-3 mb-4">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-md">
          ✈️
        </div>

        <div>
          <h2 className="text-xl font-bold text-orange-500">
            Trip Info
          </h2>

          <p className="text-slate-500 text-sm">
            Name your adventure
          </p>
        </div>

      </div>

      <p className="text-slate-500 text-sm mb-4">
        Give your journey a memorable name and make it easy to find later.
      </p>

      <input
        type="text"
        placeholder="My Amazing India Trip"
        value={tripName}
        onChange={(e) =>
          setTripName(
            e.target.value
          )
        }
        className="
          w-full
          border
          border-orange-200
          rounded-2xl
          p-4
          bg-white
          focus:outline-none
          focus:ring-2
          focus:ring-orange-300
          focus:border-orange-400
          transition
        "
      />

    </div>
  );
}

export default TripInfoCard;