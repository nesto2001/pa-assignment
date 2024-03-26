import dayjs from "dayjs";
import { ForecastData } from "../types/forecast";

export const findLastestRecord = (data: ForecastData[]) => {
  const today = dayjs();
  const lastRecordFromToday = data.filter((record) => {
    const recordDate = dayjs(record.date);
    console.log(recordDate.isBefore(today));
    recordDate.isSame(today) || recordDate.isBefore(today);
  });
  return lastRecordFromToday;
};
