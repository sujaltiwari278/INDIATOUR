import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

import CityRouteMap from "../components/CityRouteMap";
import WeatherCards from "../components/WeatherCards";
import AttractionsGallery from "../components/AttractionsGallery";
import RouteTimeline from "../components/RouteTimeline";

import festivals from "../data/festivals";

function JourneyExplorer() {
  const { id } = useParams();

  const [trip, setTrip] =
    useState(null);

  const [routeInfo, setRouteInfo] =
    useState(null);

  const [
    tripFestivals,
    setTripFestivals,
  ] = useState([]);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const tripKey =
      `indiaTourSavedTrips_${user?.email}`;

    const trips = JSON.parse(
      localStorage.getItem(
        tripKey
      ) || "[]"
    );

    const selectedTrip =
      trips.find(
        (trip) =>
          String(trip.id) ===
          String(id)
      );

    setTrip(selectedTrip);
  }, [id]);

  useEffect(() => {
    if (!trip) return;

    const start =
      new Date(
        trip.startDate
      );

    const end =
      new Date(
        trip.endDate
      );

    const matched =
      festivals.filter(
        (festival) => {
          const year =
            start.getFullYear();

          const festivalDate =
            new Date(
              year === 2027
                ? festival.date2027
                : festival.date2026
            );

          return (
            festivalDate >=
              start &&
            festivalDate <=
              end
          );
        }
      );

    setTripFestivals(
      matched
    );
  }, [trip]);

  if (!trip) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-blue-50">

          <div className="bg-white rounded-3xl p-10 shadow-xl text-center">

            <h2 className="text-3xl font-bold text-orange-500 mb-3">
              Journey Not Found
            </h2>

            <p className="text-slate-500">
              Unable to load this trip.
            </p>

          </div>

        </div>

        <Footer />
      </>
    );
  }

  const totalDays =
    Math.ceil(
      (new Date(
        trip.endDate
      ) -
        new Date(
          trip.startDate
        )) /
        (1000 *
          60 *
          60 *
          24)
    ) + 1;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">

        <div className="max-w-[1600px] mx-auto px-8 py-10">

          <PageHeader
            title="Journey Explorer"
            subtitle="Complete overview of your trip."
          />

          <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-blue-700 text-white rounded-[32px] p-10 shadow-2xl mb-8">

            <h1 className="text-5xl font-black mb-4">
              🧳 {trip.tripName}
            </h1>

            <p className="text-xl mb-3">
              📍 {trip.cities.join(" → ")}
            </p>

            <p className="text-lg text-orange-100">
              📅{" "}
              {new Date(
                trip.startDate
              ).toDateString()}
              {" - "}
              {new Date(
                trip.endDate
              ).toDateString()}
            </p>

          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">

            <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
              <p className="text-slate-500">
                Cities
              </p>

              <p className="text-4xl font-bold text-blue-600">
                {trip.cities.length}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
              <p className="text-slate-500">
                Distance
              </p>

              <p className="text-3xl font-bold text-purple-600">
                {trip.distance}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
              <p className="text-slate-500">
                Duration
              </p>

              <p className="text-3xl font-bold text-green-600">
                {trip.duration}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
              <p className="text-slate-500">
                Days
              </p>

              <p className="text-4xl font-bold text-orange-600">
                {totalDays}
              </p>
            </div>

          </div>

          <div className="space-y-8">

            <CityRouteMap
              selectedCities={
                trip.cities
              }
              setRouteInfo={
                setRouteInfo
              }
            />

            <WeatherCards
              selectedCities={
                trip.cities
              }
            />

            <AttractionsGallery
              selectedCities={
                trip.cities
              }
            />

            <div className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-3xl shadow-lg p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-md">
                  🎉
                </div>

                <div>

                  <h2 className="text-2xl font-bold text-orange-500">
                    Festivals During Journey
                  </h2>

                  <p className="text-slate-500 text-sm">
                    Cultural experiences during your trip
                  </p>

                </div>

              </div>

              {tripFestivals.length ===
              0 ? (

                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 text-slate-500">
                  No major festivals fall within your selected travel dates.
                </div>

              ) : (

                <div className="space-y-4">

                  {tripFestivals.map(
                    (
                      festival
                    ) => (
                      <div
                        key={
                          festival.name
                        }
                        className="bg-gradient-to-br from-orange-50 to-blue-50 border border-orange-100 rounded-3xl p-5"
                      >

                        <div className="flex items-center gap-4">

                          <div className="text-5xl">
                            {
                              festival.emoji
                            }
                          </div>

                          <div>

                            <h3 className="text-xl font-bold text-slate-800">
                              {
                                festival.name
                              }
                            </h3>

                            <p className="text-slate-600 mt-1">
                              {
                                festival.description
                              }
                            </p>

                            <p className="text-orange-600 font-medium mt-2">
                              Crowd Level:{" "}
                              {
                                festival.crowdLevel
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

            <RouteTimeline
              selectedCities={
                trip.cities
              }
            />

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default JourneyExplorer;
