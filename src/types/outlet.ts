import { MealData, TotalData } from "../interfaces/data";

export enum MealEnum {
  breakfast = "Breakfast",
  lunch = "Lunch",
  dinner = "Dinner",
}

export type OutletReport = {
  id: string;
  name: string;
  total: TotalData;
  period: PeriodData[];
};

export type PeriodData = { meal: MealEnum; data: MealData };
