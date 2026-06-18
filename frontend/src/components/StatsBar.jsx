function StatsBar({
  selectedCities,
  routeInfo,
}) {
  const distance =
    routeInfo?.distance
      ? `${(
          routeInfo.distance /
          1000
        ).toFixed(0)} km`
      : "--";

  const duration =
    routeInfo?.duration
      ? `${Math.floor(
          routeInfo.duration /
            3600
        )} hrs`
      : "--";

  return (
    <div className="bg-white rounded-3xl shadow-md p-5 mb-8">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <div className="text-center">
          <p className="text-sm text-slate-500">
            Cities
          </p>

          <p className="text-3xl font-bold">
            {
              selectedCities.length
            }
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-500">
            Distance
          </p>

          <p className="text-3xl font-bold">
            {distance}
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-500">
            Drive Time
          </p>

          <p className="text-3xl font-bold">
            {duration}
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-500">
            Stops
          </p>

          <p className="text-3xl font-bold">
            {Math.max(
              selectedCities.length -
                1,
              0
            )}
          </p>
        </div>

      </div>

    </div>
  );
}

export default StatsBar;