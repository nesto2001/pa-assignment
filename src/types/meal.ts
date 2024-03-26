import dayjs from "dayjs";
import { TotalData } from "../interfaces/data";
import { OutletReport } from "./outlet";

export type MealReport = {
  id: number;
  date: dayjs.Dayjs;
  total: TotalData;
  outlet: OutletReport[];
};
