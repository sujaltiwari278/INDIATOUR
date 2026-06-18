import { useEffect, useState } from "react";
import { cityCoordinates } from "../data/cityCoordinates";

function WeatherCards({
  selectedCities,
}) {
  const [weatherData, setWeatherData] =
    useState([]);

  const [isUpdating, setIsUpdating] =
    useState(false);

  const getWeatherLabel = (
    weatherCode
  ) => {
    const weatherMap = {
      0: "Clear Sky",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Cloudy",
      45: "Fog",
      48: "Fog",
      51: "Light Drizzle",
      53: "Drizzle",
      55: "Heavy Drizzle",
      61: "Light Rain",
      63: "Rain",
      65: "Heavy Rain",
      71: "Light Snow",
      73: "Snow",
      75: "Heavy Snow",
      80: "Rain Showers",
      81: "Rain Showers",
      82: "Heavy Showers",
      95: "Thunderstorm",
    };

    return (
      weatherMap[weatherCode] ||
      "Pleasant Weather"
    );
  };

  const getTravelTip = (
    weather,
    temperature,
    windSpeed
  ) => {
    if (
      weather.includes("Rain") ||
      weather.includes("Thunderstorm")
    ) {
      return {
        emoji: "🌧️",
        text: "Carry Umbrella",
        style:
          "bg-blue-100 text-blue-700",
      };
    }

    if (
      weather.includes("Fog")
    ) {
      return {
        emoji: "🌫️",
        text: "Low Visibility",
        style:
          "bg-slate-200 text-slate-700",
      };
    }

    if (windSpeed >= 25) {
      return {
        emoji: "💨",
        text: "Windy Conditions",
        style:
          "bg-cyan-100 text-cyan-700",
      };
    }

    if (temperature >= 40) {
      return {
        emoji: "🔥",
        text: "Extreme Heat",
        style:
          "bg-red-100 text-red-700",
      };
    }

    if (temperature >= 35) {
      return {
        emoji: "🥤",
        text: "Carry Water",
        style:
          "bg-orange-100 text-orange-700",
      };
    }

    if (
      temperature >= 25 &&
      temperature <= 34
    ) {
      return {
        emoji: "🟢",
        text:
          "Great for Sightseeing",
        style:
          "bg-green-100 text-green-700",
      };
    }

    if (temperature < 15) {
      return {
        emoji: "🧥",
        text: "Carry Jacket",
        style:
          "bg-indigo-100 text-indigo-700",
      };
    }

    return {
      emoji: "😊",
      text:
        "Pleasant Weather",
      style:
        "bg-sky-100 text-sky-700",
    };
  };

  useEffect(() => {
    const fetchWeather =
      async () => {
        if (
          selectedCities.length ===
          0
        ) {
          setWeatherData([]);
          return;
        }

        try {
          setIsUpdating(true);

          const results =
            await Promise.all(
              selectedCities.map(
                async (city) => {
                  try {
                    const coords =
                      cityCoordinates[
                        city
                      ];

                    if (!coords) {
                      return null;
                    }

                    const [
                      latitude,
                      longitude,
                    ] = coords;

                    const response =
                      await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m`
                      );

                    const data =
                      await response.json();

                    return {
                      city,
                      temperature:
                        Number(
                          data
                            ?.current
                            ?.temperature_2m
                        ) || 0,

                      weather:
                        getWeatherLabel(
                          data
                            ?.current
                            ?.weather_code
                        ),

                      windSpeed:
                        Number(
                          data
                            ?.current
                            ?.wind_speed_10m
                        ) || 0,
                    };
                  } catch {
                    return {
                      city,
                      temperature: 0,
                      weather:
                        "Weather Unavailable",
                      windSpeed: 0,
                    };
                  }
                }
              )
            );

          setWeatherData(
            results.filter(
              Boolean
            )
          );
        } catch (error) {
          console.error(
            "Weather Error:",
            error
          );
        } finally {
          setIsUpdating(false);
        }
      };

    fetchWeather();
  }, [selectedCities]);

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6">

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-md">
            🌤️
          </div>

          <div>

            <h2 className="text-2xl font-bold text-orange-500">
              Weather Along Route
            </h2>

            <p className="text-slate-500 text-sm">
              Live travel conditions
            </p>

          </div>

        </div>

        {isUpdating && (
          <span className="text-sm text-orange-500 font-medium">
            Updating...
          </span>
        )}

      </div>

      {selectedCities.length ===
      0 ? (
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 text-slate-500">
          Select cities to view weather information.
        </div>
      ) : (
        <div className="space-y-4">

          {weatherData.map(
            (
              cityWeather
            ) => {
              const tip =
                getTravelTip(
                  cityWeather.weather,
                  cityWeather.temperature,
                  cityWeather.windSpeed
                );

              return (
                <div
                  key={
                    cityWeather.city
                  }
                  className="bg-gradient-to-br from-orange-50 to-blue-50 border border-orange-100 rounded-3xl p-5 hover:shadow-lg transition"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="font-bold text-xl text-slate-800">
                        📍 {cityWeather.city}
                      </h3>

                      <p className="text-slate-500 mt-2">
                        {cityWeather.weather}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mt-3">

                        <p className="text-sm text-slate-500">
                          💨 {cityWeather.windSpeed} km/h
                        </p>

                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${tip.style}`}
                        >
                          <span>
                            {tip.emoji}
                          </span>

                          <span>
                            {tip.text}
                          </span>
                        </span>

                      </div>

                    </div>

                    <div className="text-center">

                      <p className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                        {cityWeather.temperature >
                        0
                          ? Math.round(
                              cityWeather.temperature
                            )
                          : "--"}
                        °
                      </p>

                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>
      )}

    </div>
  );
}

export default WeatherCards;