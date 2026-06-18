import {
  useState,
  useEffect,
  useRef,
} from "react";

import { cityCoordinates } from "../data/cityCoordinates";

function CitySelector({
  selectedCities,
  setSelectedCities,
}) {
  const [search, setSearch] =
    useState("");

  const [showDropdown, setShowDropdown] =
    useState(false);

  const dropdownRef =
    useRef(null);

  const cities = Object.keys(
    cityCoordinates
  ).sort((a, b) =>
    a.localeCompare(b)
  );

  const filteredCities =
    cities.filter(
      (city) =>
        city
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) &&
        !selectedCities.includes(
          city
        )
    );

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const addCity = (city) => {
    setSelectedCities([
      ...selectedCities,
      city,
    ]);

    setSearch("");
    setShowDropdown(false);
  };

  const removeCity = (city) => {
    setSelectedCities(
      selectedCities.filter(
        (c) => c !== city
      )
    );
  };

  return (
    <div
      className="
      bg-white/90
      backdrop-blur-sm
      border
      border-orange-100
      rounded-3xl
      shadow-lg
      hover:shadow-2xl
      transition-all
      duration-300
      p-6
      h-full
    "
    >
      <div className="flex items-center gap-3 mb-4">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-md">
          🗺️
        </div>

        <div>

          <h2 className="text-xl font-bold text-orange-500">
            Cities
          </h2>

          <p className="text-slate-500 text-sm">
            Select destinations
          </p>

        </div>

      </div>

      <div
        ref={dropdownRef}
        className="relative"
      >

        <input
          type="text"
          placeholder="Search Indian cities..."
          value={search}
          onFocus={() =>
            setShowDropdown(true)
          }
          onChange={(e) => {
            setSearch(
              e.target.value
            );

            setShowDropdown(true);
          }}
          className="
            w-full
            border
            border-orange-200
            rounded-2xl
            p-4
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-orange-300
            focus:border-orange-400
            transition
          "
        />

        {showDropdown && (
          <div className="absolute z-50 mt-2 w-full bg-white border border-orange-100 rounded-2xl shadow-xl max-h-80 overflow-y-auto">

            {filteredCities.length >
            0 ? (
              filteredCities.map(
                (city) => (
                  <button
                    key={city}
                    onClick={() =>
                      addCity(city)
                    }
                    className="block w-full text-left px-4 py-3 hover:bg-orange-50 transition"
                  >
                    {city}
                  </button>
                )
              )
            ) : (
              <p className="p-4 text-slate-500">
                No matching cities found.
              </p>
            )}

          </div>
        )}

      </div>

      <div className="mt-5">

        {selectedCities.length ===
        0 ? (
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 text-center">

            <p className="text-slate-500 text-sm">
              No cities selected yet.
            </p>

          </div>
        ) : (
          <div className="flex flex-wrap gap-2">

            {selectedCities.map(
              (city) => (
                <button
                  key={city}
                  onClick={() =>
                    removeCity(city)
                  }
                  className="
                    bg-gradient-to-r
                    from-orange-500
                    to-blue-600
                    text-white
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-medium
                    shadow-md
                    hover:scale-105
                    transition
                  "
                >
                  {city} ✕
                </button>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default CitySelector;