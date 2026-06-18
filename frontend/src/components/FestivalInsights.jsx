function FestivalInsights({
  festivalsDuringTrip,
}) {
  const getCrowdColor = (
    crowdLevel
  ) => {
    switch (
      crowdLevel?.toLowerCase()
    ) {
      case "very high":
        return "bg-red-100 text-red-700";

      case "high":
        return "bg-orange-100 text-orange-700";

      case "medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6">

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-md">
            🎉
          </div>

          <div>

            <h2 className="text-2xl font-bold text-orange-500">
              Festivals Found
            </h2>

            <p className="text-slate-500 text-sm">
              Cultural experiences during your trip
            </p>

          </div>

        </div>

        <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-5 py-2 rounded-2xl font-bold shadow-md">
          {festivalsDuringTrip.length}
        </div>

      </div>

      {festivalsDuringTrip.length ===
      0 ? (

        <div className="bg-gradient-to-br from-orange-50 to-blue-50 border border-orange-100 rounded-3xl p-12 text-center">

          <div className="text-7xl mb-5">
            🎭
          </div>

          <h3 className="text-2xl font-bold text-orange-500 mb-3">
            No Festivals Found
          </h3>

          <p className="text-slate-600 max-w-md mx-auto">
            Select travel dates to discover India's vibrant festivals, celebrations and cultural events.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {festivalsDuringTrip.map(
            (festival) => (
              <div
                key={festival.name}
                className="bg-gradient-to-br from-orange-50 to-blue-50 border border-orange-100 rounded-3xl p-6 hover:shadow-xl transition-all duration-300"
              >

                <div className="flex justify-between items-start gap-4">

                  <div className="flex gap-4">

                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-orange-500 to-blue-600 text-white flex items-center justify-center text-4xl shadow-lg flex-shrink-0">
                      {festival.emoji}
                    </div>

                    <div>

                      <h3 className="text-2xl font-bold text-slate-800">
                        {festival.name}
                      </h3>

                      <p className="text-slate-600 mt-3 leading-relaxed">
                        {festival.description}
                      </p>

                    </div>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${getCrowdColor(
                      festival.crowdLevel
                    )}`}
                  >
                    {festival.crowdLevel}
                  </span>

                </div>

                <div className="mt-5">

                  <p className="text-sm font-semibold text-slate-500 mb-3">
                    BEST PLACES TO EXPERIENCE
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {festival.bestCities.map(
                      (city) => (
                        <span
                          key={city}
                          className="bg-white border border-orange-200 text-orange-600 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition"
                        >
                          📍 {city}
                        </span>
                      )
                    )}

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      )}

    </div>
  );
}

export default FestivalInsights;