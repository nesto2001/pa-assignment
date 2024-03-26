import ForecastChart from "../../containers/ForecastChart";
import DashboardLayout from "../../layouts/DashboardLayout";

const index = () => {
  return (
    <DashboardLayout>
      <div className="page__header text-4xl font-bold">Forecast</div>
      <div className="page__description text-xl text-description mb-10">
        Provide a visualized reservation forecast
      </div>
      <div className="page__main  w-full">
        <div className="overview__stats w-full">
          <ForecastChart />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default index;
