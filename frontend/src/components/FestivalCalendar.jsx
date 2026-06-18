import { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { festivals } from "../data/festivals";

function FestivalCalendar({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  holidays,
}) {
  useEffect(() => {
    const savedTrip =
      localStorage.getItem(
        "indiaTourTripDates"
      );

    if (savedTrip) {
      const parsed =
        JSON.parse(savedTrip);

      if (
        parsed.startDate &&
        !startDate
      ) {
        setStartDate(
          new Date(
            parsed.startDate
          )
        );
      }

      if (
        parsed.endDate &&
        !endDate
      ) {
        setEndDate(
          new Date(
            parsed.endDate
          )
        );
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "indiaTourTripDates",
      JSON.stringify({
        startDate:
          startDate
            ? startDate.toISOString()
            : null,
        endDate: endDate
          ? endDate.toISOString()
          : null,
      })
    );
  }, [startDate, endDate]);

  const getFestivalForDate = (
    date
  ) => {
    const holiday =
      holidays.find(
        (holiday) => {
          const holidayDate =
            new Date(
              holiday.date.iso
            );

          return (
            holidayDate.toDateString() ===
            date.toDateString()
          );
        }
      );

    if (!holiday) return null;

    return festivals.find(
      (festival) =>
        festival.holidayApiNames.some(
          (apiName) =>
            holiday.name
              .toLowerCase()
              .includes(
                apiName.toLowerCase()
              )
        )
    );
  };

  const handleDateClick = (
    date
  ) => {
    if (!startDate) {
      setStartDate(date);
      return;
    }

    if (!endDate) {
      if (date > startDate) {
        setEndDate(date);
      } else {
        setStartDate(date);
      }

      return;
    }

    setStartDate(date);
    setEndDate(null);
  };

  const getTileClassName = ({
    date,
  }) => {
    if (
      startDate &&
      date.toDateString() ===
        startDate.toDateString()
    ) {
      return "journey-start";
    }

    if (
      endDate &&
      date.toDateString() ===
        endDate.toDateString()
    ) {
      return "journey-end";
    }

    if (
      startDate &&
      endDate &&
      date > startDate &&
      date < endDate
    ) {
      return "journey-range";
    }

    return null;
  };

  const totalDays =
    startDate && endDate
      ? Math.ceil(
          (endDate - startDate) /
            (1000 *
              60 *
              60 *
              24)
        ) + 1
      : 0;

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 h-fit">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-md">
          📅
        </div>

        <div>

          <h2 className="text-2xl font-bold text-orange-500">
            Travel Dates
          </h2>

          <p className="text-slate-500 text-sm">
            Select your festival journey
          </p>

        </div>

      </div>

      <div className="flex justify-center bg-gradient-to-br from-orange-50 to-blue-50 rounded-3xl p-4">
      
      

        <Calendar
        minDate={new Date()}
          onClickDay={
            handleDateClick
          }
          tileClassName={
            getTileClassName
          }
          value={null}
          tileContent={({ date }) => {
            
            const festival =
              getFestivalForDate(
                date
              );

            return (
              <>
                {festival && (
                  <div className="festival-emoji">
                    {
                      festival.emoji
                    }
                  </div>
                )}
              </>
            );
          }}
        />

      </div>

      <div className="grid gap-4 mt-5">

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-4">

          <p className="text-xs font-bold text-orange-600 mb-1">
            START DATE
          </p>

          <p className="font-semibold text-slate-800">
            {startDate
              ? startDate.toDateString()
              : "Not Selected"}
          </p>

        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-4">

          <p className="text-xs font-bold text-blue-600 mb-1">
            END DATE
          </p>

          <p className="font-semibold text-slate-800">
            {endDate
              ? endDate.toDateString()
              : "Not Selected"}
          </p>

        </div>
      </div>

    </div>
  );
}

export default FestivalCalendar;