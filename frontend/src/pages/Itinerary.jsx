import {
  useState,
  useEffect,
} from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

import TripInfoCard from "../components/TripInfoCard";
import TripDatesCard from "../components/TripDatesCard";
import CitySelector from "../components/CitySelector";
import StatsBar from "../components/StatsBar";

import AttractionsGallery from "../components/AttractionsGallery";
import WeatherCards from "../components/WeatherCards";
import CityRouteMap from "../components/CityRouteMap";
import RouteTimeline from "../components/RouteTimeline";

import { optimizeRoute } from "../utils/routeOptimizer";

function Itinerary() {
  const savedTrip =
    JSON.parse(
      localStorage.getItem(
        "indiaTourTrip"
      ) || "{}"
    );

  const [tripName, setTripName] =
    useState(
      savedTrip.tripName || ""
    );

  const [
    selectedCities,
    setSelectedCities,
  ] = useState(
    savedTrip.selectedCities ||
      []
  );

  const [routeInfo, setRouteInfo] =
    useState(null);

  const [toast, setToast] =
    useState(null);

  useEffect(() => {
    localStorage.setItem(
      "indiaTourTrip",
      JSON.stringify({
        tripName,
        selectedCities,
      })
    );
  }, [
    tripName,
    selectedCities,
  ]);

  const optimizedCities =
    optimizeRoute(
      selectedCities
    );

  const showToast = (
    type,
    title,
    message
  ) => {
    setToast({
      type,
      title,
      message,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const saveTrip = () => {
    if (
      selectedCities.length === 0
    ) {
      showToast(
        "error",
        "Cannot Save Trip",
        "Please select at least one city."
      );

      return;
    }

    const tripDates =
      JSON.parse(
        localStorage.getItem(
          "indiaTourTripDates"
        ) || "{}"
      );

    if (
      !tripDates.startDate ||
      !tripDates.endDate
    ) {
      showToast(
        "error",
        "Dates Required",
        "Please select travel dates in Festival Explorer."
      );

      return;
    }

    const user = JSON.parse(
  localStorage.getItem("user")
);

const tripKey =
  `indiaTourSavedTrips_${user?.email}`;

const savedTrips =
  JSON.parse(
    localStorage.getItem(
      tripKey
    ) || "[]"
  );


      if (!routeInfo) {
  showToast(
    "error",
    "Route Still Loading",
    "Please wait for route calculation to complete."
  );

  return;
}

    const newTrip = {
      id: Date.now(),

      tripName:
        tripName ||
        "Untitled Trip",

      cities:
        optimizedCities,

      startDate:
        tripDates.startDate,

      endDate:
        tripDates.endDate,

      distance:
        routeInfo?.distance
          ? `${(
              routeInfo.distance /
              1000
            ).toFixed(0)} km`
          : "--",

      duration:
        routeInfo?.duration
          ? `${Math.floor(
              routeInfo.duration /
                3600
            )} hrs`
          : "--",

      createdAt:
        new Date().toISOString(),
    };

    localStorage.setItem(
  tripKey,
  JSON.stringify([
    newTrip,
    ...savedTrips,
  ])
);

    setTripName("");

    setSelectedCities([]);

    setRouteInfo(null);

    localStorage.removeItem(
      "indiaTourTrip"
    );

    localStorage.removeItem(
      "indiaTourTripDates"
    );

    showToast(
      "success",
      "Trip Saved Successfully",
      "View it anytime from Dashboard."
    );
  };

  return (
    <>
      <Navbar />

      {toast && (
        <div className="fixed top-24 right-6 z-[9999]">

          <div
  className={`bg-white/95 backdrop-blur-md shadow-2xl border rounded-3xl px-5 py-4 flex items-center gap-3 min-w-[340px]
            ${
              toast.type ===
              "success"
                ? "border-green-200"
                : "border-red-200"
            }`}
          >

            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
              ${
                toast.type ===
                "success"
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}
            >

              <span className="text-lg">
                {toast.type ===
                "success"
                  ? "✅"
                  : "❌"}
              </span>

            </div>

            <div>

              <p className="font-semibold text-slate-800">
                {toast.title}
              </p>

              <p className="text-sm text-slate-500">
                {toast.message}
              </p>

            </div>

          </div>

        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">

        <div className="max-w-[1600px] mx-auto px-8 py-10">

          <PageHeader
            title="Journey Builder"
            subtitle="Plan your trip across India's most exciting destinations."
          />

          <div className="grid md:grid-cols-3 gap-6 mb-6">

            <TripInfoCard
              tripName={tripName}
              setTripName={
                setTripName
              }
            />

            <CitySelector
              selectedCities={
                selectedCities
              }
              setSelectedCities={
                setSelectedCities
              }
            />

            <TripDatesCard />

          </div>

          <StatsBar
            selectedCities={
              optimizedCities
            }
            routeInfo={routeInfo}
          />

          <div className="grid lg:grid-cols-[33%_67%] gap-8">

            <div className="space-y-8">

              <WeatherCards
                selectedCities={
                  optimizedCities
                }
              />

              <AttractionsGallery
                selectedCities={
                  optimizedCities
                }
              />

            </div>

            <div className="space-y-8 sticky top-24 self-start">

              <CityRouteMap
                selectedCities={
                  optimizedCities
                }
                setRouteInfo={
                  setRouteInfo
                }
              />

              <RouteTimeline
                selectedCities={
                  optimizedCities
                }
              />

            </div>

          </div>

          <div className="mt-10">

            <div className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-[32px] shadow-xl p-8 text-center">

              <h3 className="text-3xl font-extrabold text-orange-500 mb-3">
                Ready to Save Your Journey?
              </h3>

              <p className="text-slate-500 mb-6">
                Save this itinerary and access it later from your dashboard.
              </p>

              <button
                onClick={saveTrip}
                disabled={
                  selectedCities.length ===
                  0
                }
                className="bg-gradient-to-r from-orange-500 to-blue-600 hover:scale-105 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl"
              >
             Save Trip
              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Itinerary;