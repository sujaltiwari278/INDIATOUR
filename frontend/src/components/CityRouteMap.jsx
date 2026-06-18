import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import { cityCoordinates } from "../data/cityCoordinates";

function FitBounds({
  selectedCities,
}) {
  const map = useMap();

  useEffect(() => {
    const bounds =
      selectedCities
        .map(
          (city) =>
            cityCoordinates[city]
        )
        .filter(Boolean);

    if (bounds.length === 1) {
      map.setView(bounds[0], 7);
    } else if (
      bounds.length > 1
    ) {
      map.fitBounds(bounds, {
        padding: [50, 50],
      });
    }
  }, [map, selectedCities]);

  return null;
}

function CityRouteMap({
  selectedCities,
  setRouteInfo,
}) {
  const [routePath, setRoutePath] =
    useState([]);

  const routePositions =
    selectedCities
      .map(
        (city) =>
          cityCoordinates[city]
      )
      .filter(Boolean);

  useEffect(() => {
    let isCancelled = false;

    const fetchRoute =
      async () => {
        try {
          if (
            routePositions.length < 2
          ) {
            setRoutePath([]);

            if (setRouteInfo) {
              setRouteInfo(null);
            }

            return;
          }

          const coordinates =
            routePositions
              .map(
                ([lat, lng]) =>
                  `${lng},${lat}`
              )
              .join(";");

          const response =
            await fetch(
              `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
            );

          const data =
            await response.json();

          if (
            isCancelled ||
            !data.routes ||
            data.routes.length === 0
          ) {
            return;
          }

          const routeData =
            data.routes[0];

          const route =
            routeData.geometry.coordinates.map(
              (point) => [
                point[1],
                point[0],
              ]
            );

          setRoutePath(route);

          if (setRouteInfo) {
            setRouteInfo({
              distance:
                routeData.distance,
              duration:
                routeData.duration,
            });
          }
        } catch (error) {
          console.error(
            "Route Error:",
            error
          );

          if (!isCancelled) {
            setRoutePath([]);

            if (setRouteInfo) {
              setRouteInfo(null);
            }
          }
        }
      };

    fetchRoute();

    return () => {
      isCancelled = true;
    };
  }, [
    selectedCities,
    setRouteInfo,
  ]);

  return (
  <div className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6">

    <div className="flex items-center gap-3 mb-6">

      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-md">
        🗺️
      </div>

      <div>

        <h2 className="text-2xl font-bold text-orange-500">
          Interactive Route Map
        </h2>

        <p className="text-slate-500 text-sm">
          Visualize your journey across India
        </p>

      </div>

    </div>

    {selectedCities.length === 0 ? (

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 text-slate-500">
        Select cities to view your route.
      </div>

    ) : (

      <div className="h-[500px] rounded-3xl overflow-hidden border-4 border-white shadow-xl">

        <MapContainer
          center={[
            22.9734,
            78.6569,
          ]}
          zoom={5}
          scrollWheelZoom
          className="h-full w-full"
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitBounds
            selectedCities={
              selectedCities
            }
          />

          {selectedCities.map(
            (city) => {
              const coords =
                cityCoordinates[
                  city
                ];

              if (!coords) {
                return null;
              }

              return (
                <Marker
                  key={city}
                  position={
                    coords
                  }
                >
                  <Popup>
                    <div className="font-semibold text-orange-500">
                      📍 {city}
                    </div>
                  </Popup>
                </Marker>
              );
            }
          )}

          <Polyline
            positions={
              routePath.length > 0
                ? routePath
                : routePositions
            }
            pathOptions={{
              color: "#f97316",
              weight: 5,
              opacity: 0.9,
            }}
          />

        </MapContainer>

      </div>

    )}

  </div>
);
}

export default CityRouteMap;