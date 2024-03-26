import { Card, Select, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import LineChart from "../components/charts/LineChart";
import { ForecastData, ForecastDataJSON } from "../types/forecast";

const periodOptions = [
  { label: "This month", value: 1 },
  { label: "3 months", value: 3 },
  { label: "6 months", value: 6 },
];

const ForecastChart = () => {
  const [ForecastData, setForecastData] = useState<ForecastData[]>([]);
  const [lastestRecordDate, setLastestRecordDate] = useState<number>();
  const [selectedPeriod, setSelectedPeriod] = useState<number>(
    periodOptions[0].value
  );

  const getForecastData = async (): Promise<ForecastData[]> => {
    try {
      let forecastDatas: ForecastDataJSON[];
      const response = await fetch("forecast_data.json");
      forecastDatas = (await response.json()) as ForecastDataJSON[];
      if (forecastDatas) {
        return forecastDatas.map(
          (data: ForecastDataJSON, index): ForecastData => {
            return {
              id: index + 1,
              date: dayjs(data.date, "DD/MM/YYYY").unix() * 1000,
              arrRooms: data.arrRooms,
              depRooms: data.depRooms,
              totalOcc: data.totalOcc,
            };
          }
        );
      } else return [];
    } catch (error) {
      console.error("Error fetching sample data:", error);
      throw error;
    }
  };

  const handleChangePeriod = (value: number) => {
    setSelectedPeriod(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      return await getForecastData();
    };
    fetchData()
      .then((res) => {
        setForecastData(res);
        setLastestRecordDate(res[res.length - 1].date);
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <div className="font-medium text-base mb-2">
          Select forecast period:
        </div>
        <Select
          className="w-40"
          options={periodOptions}
          placeholder={"Select forecast period"}
          defaultValue={selectedPeriod}
          onChange={handleChangePeriod}
        />
      </div>
      <Card>
        <h3 className="text-center font-bold text-primary text-2xl">
          Forecast Total Occ., Arr. Rooms, and Dep. Rooms in{" "}
          {selectedPeriod === 1 ? "this month" : `${selectedPeriod} months`}
        </h3>
        <LineChart
          data={ForecastData.filter((data) => {
            return (
              dayjs(lastestRecordDate).isAfter(data.date) &&
              dayjs(lastestRecordDate)
                .subtract(selectedPeriod, "month")
                .isBefore(data.date)
            );
          })}
        />
      </Card>
    </div>
  );
};

export default ForecastChart;
