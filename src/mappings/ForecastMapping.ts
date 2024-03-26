import { ForecastData } from "../types/forecast";

export const ForecastMap: {
  [key in keyof Omit<ForecastData, "id" | "date">]: string;
} = {
  totalOcc: "Total Occ.",
  arrRooms: "Arr. Rooms",
  depRooms: "Dep. Rooms",
};
