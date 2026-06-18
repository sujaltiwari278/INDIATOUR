import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingButtons from "../components/FloatingButtons";


function Dashboard() {
  const navigate =
    useNavigate();

  const [savedTrips, setSavedTrips] =
    useState([]);

  const [stats, setStats] =
    useState({
      trips: 0,
      cities: 0,
      distance: 0,
      days: 0,
    });

    const [userName, setUserName] =
  useState("Explorer");

  const messages = [
  " Every journey begins with a single step. Where will India take you today?",
  " New day, new destination, new memories waiting to be created.",
  " India's wonders are calling. Start planning your next adventure.",
  " The mountains, beaches and festivals await your arrival.",
  " Travel is the only thing you buy that makes you richer.",
  " Discover hidden gems and unforgettable experiences across India.",
  " Adventure, culture and memories are just a journey away."
];

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

    const uniqueCities =
      new Set();

    let totalDistance = 0;
    let totalDays = 0;

    trips.forEach((trip) => {
      trip.cities?.forEach(
        (city) =>
          uniqueCities.add(city)
      );

      const distance =
        parseInt(
          trip.distance
        ) || 0;

      totalDistance +=
        distance;

      if (
        trip.startDate &&
        trip.endDate
      ) {
        const start =
          new Date(
            trip.startDate
          );

        const end =
          new Date(
            trip.endDate
          );

        const days =
          Math.ceil(
            (end - start) /
              (1000 *
                60 *
                60 *
                24)
          ) + 1;

        totalDays += days;
      }
    });

    setStats({
      trips: trips.length,
      cities:
        uniqueCities.size,
      distance:
        totalDistance,
      days: totalDays,
    });

if (user?.name) {
  setUserName(user.name);
}
  }, []);

  

  const recentTrips =
    savedTrips.slice(0, 3);

 const user = JSON.parse(
  localStorage.getItem("user")
);

const favoriteCities =
  JSON.parse(
    localStorage.getItem(
      `favoriteCities_${user?.email}`
    ) || "[]"
  );

  const longestTrip = () => {
  if (
    savedTrips.length === 0
  ) {
    return "--";
  }

  const tripWithMostDays =
    savedTrips.reduce(
      (longest, trip) => {
        if (
          !trip.startDate ||
          !trip.endDate
        ) {
          return longest;
        }

        const start =
          new Date(
            trip.startDate
          );

        const end =
          new Date(
            trip.endDate
          );

        const days =
          Math.ceil(
            (end - start) /
              (1000 *
                60 *
                60 *
                24)
          ) + 1;

        const longestDays =
          longest.days || 0;

        return days >
          longestDays
          ? {
              tripName:
                trip.tripName,
              days,
            }
          : longest;
      },
      {
        tripName: "--",
        days: 0,
      }
    );

  return `${tripWithMostDays.tripName} (${tripWithMostDays.days} Days)`;
};

  const todaysMessage =
  messages[
    new Date().getDate() %
      messages.length
  ];

  const firstName =
  userName
    .split(" ")[0]
    .charAt(0)
    .toUpperCase() +
  userName
    .split(" ")[0]
    .slice(1)
    .toLowerCase();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">

        <div className="max-w-7xl mx-auto px-8 py-10">

          {/* HERO */}

          <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-400 to-blue-700 text-white rounded-[32px] p-12 shadow-2xl mb-10">

          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

<div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl pointer-events-none"></div>

            <h1 className="text-5xl md:text-6xl font-black mb-4">
  Welcome {firstName}
</h1>

<p className="text-xl text-orange-100 mb-3 max-w-3xl">
  {todaysMessage}
</p>

<p className="text-blue-100 text-lg max-w-3xl">
  Discover festivals, build smart routes,
  save journeys and explore India's most
  exciting destinations.
</p>

            <div className="relative z-20 flex flex-wrap gap-4">

              <button
                onClick={() =>
                  navigate(
                    "/itinerary"
                  )
                }
                className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                🧳 Start Planning
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/festivals"
                  )
                }
                className="bg-blue-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                🎉 Explore Festivals
              </button>

            </div>

          </div>

          {/* TRAVEL SNAPSHOT */}

          <h2 className="text-2xl font-bold text-orange-500 mb-5">
            Travel Snapshot
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            <div className="
bg-white/90
backdrop-blur-sm
border border-orange-100
rounded-[32px]
shadow-xl
p-6
text-center
">

              <p className="text-slate-500">
                Trips
              </p>

              <p className="text-4xl font-bold text-blue-600">
                {stats.trips}
              </p>

            </div>

            <div className="
bg-white/90
backdrop-blur-sm
border border-orange-100
rounded-[32px]
shadow-xl
p-6
text-center
">

              <p className="text-slate-500">
                Cities
              </p>

              <p className="text-4xl font-bold text-green-600">
                {stats.cities}
              </p>

            </div>

            <div className="
bg-white/90
backdrop-blur-sm
border border-orange-100
rounded-[32px]
shadow-xl
p-6
text-center
">

              <p className="text-slate-500">
                Distance
              </p>

              <p className="text-4xl font-bold text-purple-600">
                {stats.distance}
                km
              </p>

            </div>

            <div className="
bg-white/90
backdrop-blur-sm
border border-orange-100
rounded-[32px]
shadow-xl
p-6
text-center
">

              <p className="text-slate-500">
                Days
              </p>

              <p className="text-4xl font-bold text-orange-600">
                {stats.days}
              </p>

            </div>

          </div>


          {/* RECENT TRIPS */}

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl font-bold text-orange-500 mb-5">
              Recent Trips
            </h2>

            <Link
              to="/trips"
              className="text-blue-600 font-semibold"
            >
              View All →
            </Link>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            {recentTrips.length >
            0 ? (
              recentTrips.map(
                (trip) => (
                  <div
                    key={trip.id}
                    className="
bg-white/90
backdrop-blur-sm
border border-orange-100
rounded-[32px]
shadow-xl
p-6
"
                  >

                    <h3 className="text-xl font-bold mb-3">
                      🧳{" "}
                      {
                        trip.tripName
                      }
                    </h3>

                    <p className="text-slate-600 mb-2">
                      📍{" "}
                      {trip.cities.join(
                        " → "
                      )}
                    </p>

                    <p className="text-slate-600 mb-2">
                      🚗{" "}
                      {
                        trip.distance
                      }{" "}
                      •{" "}
                      {
                        trip.duration
                      }
                    </p>

                    <button
                      onClick={() =>
                        navigate(
                          `/trips/${trip.id}`
                        )
                      }
                      className="
mt-5
bg-gradient-to-r
from-orange-500
to-blue-600
text-white
px-5
py-2.5
rounded-xl
font-semibold
shadow-md
hover:scale-105
transition-all
duration-300
"
                    >
                      View Trip
                    </button>

                  </div>
                )
              )
            ) : (
              <div className="
col-span-full
bg-white/90
backdrop-blur-sm
border border-orange-100
rounded-[32px]
shadow-xl
p-10
text-center
">

                <p className="text-slate-500">
                  No saved trips yet.
                </p>

              </div>
            )}

          </div>

          {/* INSIGHTS */}

          <h2 className="text-2xl font-bold text-orange-500 mb-5">
            Travel Insights
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="
bg-white/90
backdrop-blur-sm
border border-orange-100
rounded-[32px]
shadow-xl
p-6
">

  <h3 className="font-semibold text-slate-500 mb-3">
    Favorite Destinations
  </h3>

  {favoriteCities.length > 0 ? (
    <div className="flex flex-wrap gap-2">
      {favoriteCities.map((city) => (
        <span
          key={city}
          className="
          px-3
          py-1
          bg-orange-100
          text-orange-600
          rounded-full
          text-sm
          font-medium
          "
        >
          ❤️ {city}
        </span>
      ))}
    </div>
  ) : (
    <p className="text-slate-400">
      No favorites yet
    </p>
  )}

</div>

            <div className="
bg-white/90
backdrop-blur-sm
border border-orange-100
rounded-[32px]
shadow-xl
p-6
">

              <h3 className="font-semibold text-slate-500 mb-2">
                Longest Journey
              </h3>

              <p className="text-2xl font-bold">
                {longestTrip()}
              </p>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Dashboard;