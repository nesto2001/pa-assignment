import MealPlanTable from "../../containers/MealPlanTable";
import DashboardLayout from "../../layouts/DashboardLayout";

const index = () => {
  return (
    <DashboardLayout>
      <div className="page__header text-4xl font-bold">Period Details</div>
      <div className="page__description text-xl text-description mb-10">
        Provide period details of meal plans
      </div>
      <div className="page__main  w-full">
        <div className="overview__stats w-full">
          <MealPlanTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default index;
