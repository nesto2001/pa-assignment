
export type ForecastData = {
  id: number;
  date: number;
  totalOcc: number;
  arrRooms: number;
  depRooms: number;
  [key: string]: number;
};

export type ForecastDataJSON = {
  date: string;
  totalOcc: number;
  arrRooms: number;
  depRooms: number;
};
