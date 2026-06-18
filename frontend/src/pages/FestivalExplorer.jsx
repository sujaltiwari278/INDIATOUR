import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

import FestivalCalendar from "../components/FestivalCalendar";
import FestivalInsights from "../components/FestivalInsights";

import { getHolidays } from "../services/holidayService";
import { festivals } from "../data/festivals";

function FestivalExplorer() {
  const [startDate, setStartDate] =
    useState(null);

  const [endDate, setEndDate] =
    useState(null);

  const [holidays, setHolidays] =
    useState([]);

  const [
    festivalsDuringTrip,
    setFestivalsDuringTrip,
  ] = useState([]);

  useEffect(() => {
  const fetchHolidays =
    async () => {

      try {

        const currentYear =
          new Date().getFullYear();

        const years = Array.from(
  { length: 10 },
  (_, i) => currentYear + i
);

        const results =
          await Promise.all(
            years.map((year) =>
              getHolidays(year)
            )
          );

        const allHolidays =
          results.flatMap(
            (result) =>
              result.holidays || []
          );

        setHolidays(
          allHolidays
        );

      } catch (error) {
        console.log(error);
      }
    };

  fetchHolidays();
}, []);

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
      holidays
        .filter((holiday) => {
          const holidayDate =
            new Date(
              holiday.date.iso
            );

          return (
            holidayDate >=
              startDate &&
            holidayDate <= endDate
          );
        })
        .map((holiday) =>
          festivals.find(
            (festival) =>
              festival.holidayApiNames.some(
                (apiName) =>
                  holiday.name
                    .toLowerCase()
                    .includes(
                      apiName.toLowerCase()
                    )
              )
          )
        )
        .filter(Boolean);

    const uniqueFestivals =
      matchedFestivals.filter(
        (festival, index, self) =>
          index ===
          self.findIndex(
            (f) =>
              f.name ===
              festival.name
          )
      );

    setFestivalsDuringTrip(
      uniqueFestivals
    );
  }, [
    startDate,
    endDate,
    holidays,
  ]);

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
                holidays={holidays}
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