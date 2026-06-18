import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

function SavedTrips() {
  const navigate =
    useNavigate();

  const [
    savedTrips,
    setSavedTrips,
  ] = useState([]);

  useEffect(() => {
    const user = JSON.parse(
  localStorage.getItem("user")
);

const tripKey =
  `indiaTourSavedTrips_${user?.email}`;

const trips =
  JSON.parse(
    localStorage.getItem(
      tripKey
    ) || "[]"
  );

setSavedTrips(trips);
  }, []);

  const deleteTrip = (
    tripId
  ) => {
    const updatedTrips =
      savedTrips.filter(
        (trip) =>
          trip.id !== tripId
      );

    const user = JSON.parse(
  localStorage.getItem("user")
);

const tripKey =
  `indiaTourSavedTrips_${user?.email}`;

localStorage.setItem(
  tripKey,
  JSON.stringify(
    updatedTrips
  )
);

    setSavedTrips(
      updatedTrips
    );
  };

  const editTrip = (
    trip
  ) => {
    localStorage.setItem(
      "indiaTourTrip",
      JSON.stringify({
        tripName:
          trip.tripName,
        selectedCities:
          trip.cities,
      })
    );

    navigate(
      "/itinerary"
    );
  };

  const viewTrip = (
    tripId
  ) => {
    navigate(
      `/trips/${tripId}`
    );
  };

  const totalCities =
    new Set(
      savedTrips.flatMap(
        (trip) =>
          trip.cities || []
      )
    ).size;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">

        <div className="max-w-7xl mx-auto px-8 py-10">

          <PageHeader
            title="Saved Trips"
            subtitle="Manage and revisit your travel plans."
          />

          
          {savedTrips.length ===
          0 ? (
            <div className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-3xl shadow-xl p-12 text-center">

              <h2 className="text-2xl font-bold mb-3">
                No Saved Trips
              </h2>

              <p className="text-slate-500 mb-6">
                Create your first
                itinerary and it will
                appear here.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/itinerary"
                  )
                }
                className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
              >
                Create Trip
              </button>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">

              {savedTrips.map(
                (trip) => (
                  <div
                    key={
                      trip.id
                    }
                    cclassName="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
                  >

                    <div className="flex items-start justify-between mb-4">

                      <div>

                        <h2 className="text-2xl font-bold text-orange-500">
                          {
                            trip.tripName
                          }
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                          Created{" "}
                          {trip.createdAt
                            ? new Date(
                                trip.createdAt
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "Recently"}
                        </p>

                      </div>

                    </div>

                    <div className="space-y-3 mb-6">

                      <p className="font-semibold text-slate-700">
                        {trip.cities.join(
                          " → "
                        )}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
  {trip.cities.map((city) => (
    <button
      key={city}
      onClick={() => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const favoriteCityKey =
    `favoriteCities_${user?.email}`;

  const currentFavorites =
    JSON.parse(
      localStorage.getItem(
        favoriteCityKey
      ) || "[]"
    );

  if (
    !currentFavorites.includes(
      city
    )
  ) {
    localStorage.setItem(
      favoriteCityKey,
      JSON.stringify([
        ...currentFavorites,
        city,
      ])
    );
  }
}}
      className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm hover:bg-orange-200 transition"
    >
      ❤️ {city}
    </button>
  ))}
</div>

                      <p className="text-slate-500">
                        {trip.startDate &&
                        trip.endDate
                          ? `${new Date(
                              trip.startDate
                            ).toLocaleDateString(
                              "en-IN"
                            )} - ${new Date(
                              trip.endDate
                            ).toLocaleDateString(
                              "en-IN"
                            )}`
                          : "Dates not available"}
                      </p>

                      <p className="text-slate-700 font-medium">
                        {
                          trip.distance
                        }{" "}
                        •{" "}
                        {
                          trip.duration
                        }
                      </p>

                    </div>

                    <div className="grid grid-cols-3 gap-3">

                      <button
                        onClick={() =>
                          viewTrip(
                            trip.id
                          )
                        }
                        className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          editTrip(
                            trip
                          )
                        }
                        className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteTrip(
                            trip.id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl shadow-md transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default SavedTrips;