import { PropertyData } from "../types/property";

export const PropertyMap: {
  [key in keyof Omit<PropertyData, "code" | "date">]: string;
} = {
  fnbRev: "F&B Revenue",
  occPer: "Occupancy Percentage (%)",
  otherRev: "Other Revenue",
  roomRev: "Room Revenue",
  totalRev: "Total Revenue",
  totalRoom: "Total Room",
};
