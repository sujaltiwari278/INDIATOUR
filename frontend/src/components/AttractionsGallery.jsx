import { cityAttractions } from "../data/cityAttractions";

function AttractionsGallery({
  selectedCities,
}) {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-md">
          🏛️
        </div>

        <div>

          <h2 className="text-2xl font-bold text-orange-500">
            Top Attractions
          </h2>

          <p className="text-slate-500 text-sm">
            Must-visit places across your journey
          </p>

        </div>

      </div>

      {selectedCities.length === 0 ? (

        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 text-slate-500">
          Select cities to discover their top attractions.
        </div>

      ) : (

        <div className="space-y-5">

          {selectedCities.map(
            (city) => {
              const attractions =
                cityAttractions[
                  city
                ] || [];

              return (
                <div
                  key={city}
                  className="bg-gradient-to-br from-orange-50 to-blue-50 border border-orange-100 rounded-3xl p-5 hover:shadow-lg transition-all duration-300"
                >

                  <div className="flex items-center gap-3 mb-4">

                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-blue-600 text-white flex items-center justify-center shadow-md">
                      📍
                    </div>

                    <div>

                      <h3 className="font-bold text-xl text-slate-800">
                        {city}
                      </h3>

                      <p className="text-sm text-slate-500">
                        Popular tourist attractions
                      </p>

                    </div>

                  </div>

                  {attractions.length === 0 ? (

                    <div className="bg-white rounded-2xl border border-orange-100 p-4 text-slate-500">
                      Attractions will be added soon.
                    </div>

                  ) : (

                    <div className="space-y-3">

                      {attractions.map(
                        (
                          attraction
                        ) => (
                          <div
                            key={
                              attraction.name
                            }
                            className="bg-white border border-orange-100 rounded-2xl p-4 hover:border-orange-300 hover:shadow-md transition-all duration-300"
                          >

                            <div className="flex items-start gap-3">

                              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-lg">
                                🏛️
                              </div>

                              <div className="flex-1">

                                <h4 className="font-semibold text-orange-600 text-lg">
                                  {
                                    attraction.name
                                  }
                                </h4>

                                <p className="text-slate-600 mt-2 leading-relaxed">
                                  {
                                    attraction.description
                                  }
                                </p>

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
          )}

        </div>

      )}

    </div>
  );
}

export default AttractionsGallery;