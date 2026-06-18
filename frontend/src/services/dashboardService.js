import { getMyItineraries } from "./itineraryService";

export const getDashboardStats = async () => {
try {
const itineraries =
await getMyItineraries();

return {
  trips: Array.isArray(itineraries)
    ? itineraries.length
    : itineraries?.itineraries
        ?.length || 0,
};


} catch (error) {
console.log(error);


return {
  trips: 0,
};


}
};
