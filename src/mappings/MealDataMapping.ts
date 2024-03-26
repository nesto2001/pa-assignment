import { ActualData, MealRecordData, MealRecordType } from "../interfaces/data";

export const mapActualData = (data: any): ActualData => ({
  count: data.count,
  percentageCount: data.percentage_count,
  sales: data.sales,
  percentageSales: data.percentage_sales,
});

export const mapMealRecordData = (data: any): MealRecordData => ({
  room: data.room,
  guestNames: data.guest_names,
  packageCode: data.package_code,
  count: data.count,
  pax: data.pax,
  remark: data.remark,
});

export const mapMealData = (data: Map<string, any>): MealRecordType[] => {
  const mealRecord: MealRecordType[] = [];

  Object.entries(data).forEach(([k, v]) => {
    mealRecord.push({
      timestamp: k,
      data: mapMealRecordData(v),
    });
  });

  return mealRecord;
};
