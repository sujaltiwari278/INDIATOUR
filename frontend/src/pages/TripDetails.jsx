import {
  useMemo,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

function TripDetails() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const trip =
    useMemo(() => {
      const trips =
        JSON.parse(
          localStorage.getItem(
            "indiaTourSavedTrips"
          ) || "[]"
        );

      return trips.find(
        (trip) =>
          String(
            trip.id
          ) === String(id)
      );
    }, [id]);

  if (!trip) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

          <div className="bg-white p-10 rounded-3xl shadow-md text-center">

            <h2 className="text-2xl font-bold mb-3">
              Trip Not Found
            </h2>

            <button
              onClick={() =>
                navigate(
                  "/trips"
                )
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Back to Trips
            </button>

          </div>

        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">

        <div className="max-w-5xl mx-auto px-8 py-10">

          <PageHeader
            title={
              trip.tripName
            }
            subtitle="Trip Details"
          />

          <div className="bg-white rounded-3xl shadow-md p-8">

            <div className="space-y-5">

              <p className="text-lg">
                <span className="font-semibold">
                  📍 Cities:
                </span>{" "}
                {trip.cities.join(
                  " → "
                )}
              </p>

              <p className="text-lg">
                <span className="font-semibold">
                  📅 Travel Dates:
                </span>{" "}
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
                  : "Not Available"}
              </p>

              <p className="text-lg">
                <span className="font-semibold">
                  🚗 Distance:
                </span>{" "}
                {
                  trip.distance
                }
              </p>

              <p className="text-lg">
                <span className="font-semibold">
                  ⏱ Duration:
                </span>{" "}
                {
                  trip.duration
                }
              </p>

              <p className="text-lg">
                <span className="font-semibold">
                  🕒 Created:
                </span>{" "}
                {new Date(
                  trip.createdAt
                ).toLocaleString(
                  "en-IN"
                )}
              </p>

            </div>

            <button
              onClick={() =>
                navigate(
                  "/trips"
                )
              }
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Back to Saved Trips
            </button>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default TripDetails;