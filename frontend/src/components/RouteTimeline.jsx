function RouteTimeline({
  selectedCities,
}) {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-md">
          🛣️
        </div>

        <div>

          <h2 className="text-2xl font-bold text-orange-500">
            Recommended Route
          </h2>

          <p className="text-slate-500 text-sm">
            Optimized travel sequence
          </p>

        </div>

      </div>

      {selectedCities.length ===
      0 ? (

        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 text-slate-500">
          Select cities to generate an optimized route.
        </div>

      ) : (

        <div className="overflow-x-auto">

          <div className="flex items-center gap-4 min-w-max py-2">

            {selectedCities.map(
              (
                city,
                index
              ) => (
                <div
                  key={city}
                  className="flex items-center gap-4"
                >

                  <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded-2xl px-5 py-3 font-semibold shadow-md hover:scale-105 transition-all duration-300 whitespace-nowrap">

                    {city}

                  </div>

                  {index !==
                    selectedCities.length - 1 && (

                    <div className="flex items-center gap-2">

                      <div className="w-8 h-1 rounded-full bg-orange-400"></div>

                      <div className="text-blue-600 text-xl font-bold">
                        ➜
                      </div>

                      <div className="w-8 h-1 rounded-full bg-blue-500"></div>

                    </div>

                  )}

                </div>
              )
            )}

          </div>

        </div>

      )}

      {selectedCities.length >
        1 && (

        <div className="mt-6 bg-gradient-to-r from-orange-50 to-blue-50 border border-orange-100 rounded-2xl p-4">

          <p className="text-sm text-slate-600">

            <span className="font-semibold text-orange-500">
              Travel Flow:
            </span>{" "}

            Start from{" "}
            <span className="font-semibold">
              {selectedCities[0]}
            </span>{" "}
            and continue through all selected destinations in the optimized sequence.

          </p>

        </div>

      )}

    </div>
  );
}

export default RouteTimeline;