import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

import FestivalCalendar from "../components/FestivalCalendar";
import FestivalInsights from "../components/FestivalInsights";

import { festivals } from "../data/festivals";

function FestivalExplorer() {
  const [startDate, setStartDate] =
    useState(null);

  const [endDate, setEndDate] =
    useState(null);

  const [
    festivalsDuringTrip,
    setFestivalsDuringTrip,
  ] = useState([]);

  useEffect(() => {
    if (!startDate || !endDate) {
      setFestivalsDuringTrip([]);

      localStorage.removeItem(
        "indiaTourTripDates"
      );

      return;
    }

    localStorage.setItem(
      "indiaTourTripDates",
      JSON.stringify({
        startDate:
          startDate.toISOString(),
        endDate:
          endDate.toISOString(),
      })
    );
  }, [startDate, endDate]);

  useEffect(() => {
    if (!startDate || !endDate) {
      setFestivalsDuringTrip([]);
      return;
    }

    const matchedFestivals =
      festivals.filter(
        (festival) => {
          const year =
            startDate.getFullYear();

          const festivalDate =
            new Date(
              year === 2027
                ? festival.date2027
                : festival.date2026
            );

          return (
            festivalDate >=
              startDate &&
            festivalDate <=
              endDate
          );
        }
      );

    setFestivalsDuringTrip(
      matchedFestivals
    );
  }, [startDate, endDate]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">

        <div className="max-w-[1600px] mx-auto px-8 py-10">

          <PageHeader
            title="Festival Explorer"
            subtitle="Discover India's biggest festivals, celebrations and cultural experiences."
          />

          <div className="grid lg:grid-cols-[45%_55%] gap-8 items-start">

            <div className="lg:sticky top-24">

              <FestivalCalendar
                startDate={
                  startDate
                }
                setStartDate={
                  setStartDate
                }
                endDate={endDate}
                setEndDate={
                  setEndDate
                }
                holidays={[]}
              />

            </div>

            <div>

              <FestivalInsights
                festivalsDuringTrip={
                  festivalsDuringTrip
                }
              />

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default FestivalExplorer;