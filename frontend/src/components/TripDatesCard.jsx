function TripDatesCard() {
  const savedTrip =
    JSON.parse(
      localStorage.getItem(
        "indiaTourTripDates"
      )
    );

  if (
    !savedTrip ||
    !savedTrip.startDate ||
    !savedTrip.endDate
  ) {
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
            📅
          </div>

          <div>

            <h2 className="text-xl font-bold text-orange-500">
              Trip Dates
            </h2>

            <p className="text-slate-500 text-sm">
              Travel schedule
            </p>

          </div>

        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 text-slate-600">
          Select trip dates in
          Festival Explorer.
        </div>

      </div>
    );
  }

  const startDate =
    new Date(
      savedTrip.startDate
    );

  const endDate =
    new Date(
      savedTrip.endDate
    );

  const days =
    Math.ceil(
      (endDate - startDate) /
        (1000 *
          60 *
          60 *
          24)
    ) + 1;

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
      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-md">
          📅
        </div>

        <div>

          <h2 className="text-xl font-bold text-orange-500">
            Trip Dates
          </h2>

          <p className="text-slate-500 text-sm">
            Travel schedule
          </p>

        </div>

      </div>

      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 rounded-3xl p-5">

        <p className="font-bold text-lg text-slate-800">
          {startDate.toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          )}
        </p>

        <div className="text-3xl py-3">
          ✈️
        </div>

        <p className="font-bold text-lg text-slate-800">
          {endDate.toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          )}
        </p>

        <div className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-blue-600 text-white text-sm font-semibold shadow-md">
          {days} Day Trip
        </div>

      </div>

    </div>
  );
}

export default TripDatesCard;