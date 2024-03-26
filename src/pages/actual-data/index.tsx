import BarChart from "../../components/charts/BarChart";
import OverviewData from "../../containers/OverviewData";
import DashboardLayout from "../../layouts/DashboardLayout";

type Props = {};

const index = (props: Props) => {
  return (
    <DashboardLayout>
      <div className="page__header text-4xl font-bold">Overview</div>
      <div className="page__description text-xl text-description mb-10">
        Provide an overview at your hotel operations
      </div>
      <div className="page__main  w-full">
        <div className="overview__stats w-full">
          <OverviewData />
        </div>
        
      </div>
    </DashboardLayout>
  );
};

export default index;
