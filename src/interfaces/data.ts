export interface TotalData {
  totalActual: ActualData;
  adultsActual: ActualData;
  childrenActual: ActualData;
}

export interface ActualData {
  count: number;
  percentageCount: number;
  sales: number;
  percentageSales: number;
}

export interface MealData {
  total: TotalData;
  record: MealRecordType[];
}

export type MealRecordType = { timestamp: string; data: MealRecordData };
// export interface MealDataRecord {
//   [timestamp: string]: MealRecordData;
// }

export interface MealRecordData {
  room: string;
  guestNames: string[] | string;
  packageCode: string;
  count: number;
  pax: string;
  remark: string;
}
