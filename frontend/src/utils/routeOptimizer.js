import { cityCoordinates } from "../data/cityCoordinates";

export function optimizeRoute(cities) {
  if (cities.length <= 2) return cities;

  const remaining = [...cities];
  const optimized = [remaining.shift()];

  while (remaining.length > 0) {
    const current =
      cityCoordinates[
        optimized[optimized.length - 1]
      ];

    let nearestIndex = 0;
    let nearestDistance = Infinity;

    remaining.forEach((city, index) => {
      const coords =
        cityCoordinates[city];

      if (!coords || !current) return;

      const distance =
        Math.sqrt(
          Math.pow(
            coords[0] - current[0],
            2
          ) +
            Math.pow(
              coords[1] - current[1],
              2
            )
        );

      if (
        distance <
        nearestDistance
      ) {
        nearestDistance =
          distance;

        nearestIndex = index;
      }
    });

    optimized.push(
      remaining.splice(
        nearestIndex,
        1
      )[0]
    );
  }

  return optimized;
}