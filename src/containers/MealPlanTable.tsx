import { Button, Table, TableColumnsType } from "antd";
import dayjs from "dayjs";
import { dashboardSampleV0_4MealDetailData } from "../data/sampledata_meal_detail";
import { MealRecordType } from "../interfaces/data";
import { mapActualData, mapMealData } from "../mappings/MealDataMapping";
import { MealReport } from "../types/meal";
import { MealEnum, OutletReport, PeriodData } from "../types/outlet";
import { writeToSheet } from "../utils/sheetUtil";
import { useRef } from "react";
import { TableRef } from "antd/es/table";

type Props = {};

const levelOneColumns: TableColumnsType<MealReport> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: 100,
    render: (val) => dayjs(val).format("DD/MM/YYYY"),
  },
  {
    title: "RVC",
    dataIndex: "rvc",
    key: "rvc",
  },
  {
    title: "Period",
    dataIndex: "prd",
    key: "prd",
  },
  {
    title: "A. Count",
    key: "adultCount",
    render: (value, record) => record.total.adultsActual.count,
    align: "right",
  },
  {
    title: "C. Count",
    key: "childCount",
    render: (value, record) => record.total.childrenActual.count,
    align: "right",
  },
  {
    title: "A. Sale",
    key: "adultSale",
    render: (value, record) => record.total.adultsActual.sales,
    align: "right",
  },
  {
    title: "C. Sale",
    key: "childSale",
    render: (value, record) => record.total.childrenActual.sales,
    align: "right",
  },
  {
    title: "Count",
    key: "count",
    render: (value, record) => record.total.totalActual.count,
    align: "right",
  },
  {
    title: "Count %",
    key: "countPer",
    render: (value, record) => record.total.totalActual.percentageCount + " %",
    align: "right",
  },
  {
    title: "Sale ",
    key: "operation",
    render: (value, record) => record.total.totalActual.sales,
    align: "right",
  },
  {
    title: "Sale %",
    key: "operation",
    render: (value, record) => record.total.totalActual.percentageSales + " %",
    align: "right",
  },
];

const MealPlanTable = (props: Props) => {
  const mealDetails: MealReport[] = dashboardSampleV0_4MealDetailData.map(
    (item, index): MealReport => {
      return {
        id: index,
        date: dayjs(item.report_date, "YYYY-MM-DD"),
        total: {
          totalActual: mapActualData(item.total.total_actual),
          adultsActual: mapActualData(item.total.adults_actual),
          childrenActual: mapActualData(item.total.children_actual),
        },
        outlet: item.outlet.map((out): OutletReport => {
          return {
            id: out.outlet_code,
            name: out.outlet_name,
            total: {
              totalActual: mapActualData(out.total.total_actual),
              adultsActual: mapActualData(out.total.adults_actual),
              childrenActual: mapActualData(out.total.children_actual),
            },
            period: [
              {
                meal: MealEnum.breakfast,
                data: {
                  total: {
                    totalActual: mapActualData(
                      out.breakfast.total.total_actual
                    ),
                    adultsActual: mapActualData(
                      out.breakfast.total.adults_actual
                    ),
                    childrenActual: mapActualData(
                      out.breakfast.total.children_actual
                    ),
                  },
                  record: mapMealData(out.breakfast.records as any),
                },
              },
              {
                meal: MealEnum.lunch,
                data: {
                  total: {
                    totalActual: mapActualData(out.lunch.total.total_actual),
                    adultsActual: mapActualData(out.lunch.total.adults_actual),
                    childrenActual: mapActualData(
                      out.lunch.total.children_actual
                    ),
                  },
                  record: mapMealData(out.lunch.records as any),
                },
              },
              {
                meal: MealEnum.dinner,
                data: {
                  total: {
                    totalActual: mapActualData(out.dinner.total.total_actual),
                    adultsActual: mapActualData(out.dinner.total.adults_actual),
                    childrenActual: mapActualData(
                      out.dinner.total.children_actual
                    ),
                  },
                  record: mapMealData(out.dinner.records as any),
                },
              },
            ],
          };
        }),
      };
    }
  );
  const expandedLevelTwo = (record: MealReport) => {
    const levelTwoColumn: TableColumnsType<OutletReport> = [
      {},
      { title: "RVC", dataIndex: "id", key: "id", width: 100 },
      {},
      {
        title: "A. Count",
        dataIndex: "adultsCount",
        key: "adultsCount",
        render: (value, record) => record.total.adultsActual.count,
        align: "right",
      },
      {
        title: "C. Count",
        dataIndex: "childrenCount",
        key: "childrenCount",
        render: (value, record) => record.total.childrenActual.count,
        align: "right",
      },
      {
        title: "A. Sale",
        dataIndex: "adultsSale",
        key: "adultsSale",
        render: (value, record) => record.total.adultsActual.sales,
        align: "right",
      },
      {
        title: "C. Sale",
        dataIndex: "childrenSale",
        key: "childrenSale",
        render: (value, record) => record.total.childrenActual.sales,
        align: "right",
      },
      {
        title: "Count",
        dataIndex: "count",
        key: "count",
        render: (value, record) => record.total.totalActual.count,
        align: "right",
      },
      {
        title: "Count %",
        key: "countPer",
        render: (value, record) =>
          record.total.totalActual.percentageCount + " %",
        align: "right",
      },
      {
        title: "Sale ",
        key: "sales",
        render: (value, record) => record.total.totalActual.sales,
        align: "right",
      },
      {
        title: "Sale %",
        key: "salePer",
        render: (value, record) =>
          record.total.totalActual.percentageSales + " %",
        align: "right",
      },
    ];

    const expandedLevelThree = (record: OutletReport) => {
      const levelThreeColumn: TableColumnsType<PeriodData> = [
        { width: 0 },
        {},
        {
          title: "Period",
          dataIndex: "period",
          key: "period",
          width: 130,
          render: (value, record) => record.meal,
        },
        {
          title: "A. Count",
          dataIndex: "adultsCount",
          key: "adultsCount",
          render: (value, record) => record.data.total.adultsActual.count,
          align: "right",
        },
        {
          title: "C. Count",
          dataIndex: "childCount",
          key: "childCount",
          render: (value, record) => record.data.total.childrenActual.count,
          align: "right",
        },
        {
          title: "A. Sale",
          dataIndex: "adultSale",
          key: "adultSale",
          render: (value, record) => record.data.total.adultsActual.sales,
          align: "right",
        },
        {
          title: "C. Sale",
          dataIndex: "childSale",
          key: "childSale",
          render: (value, record) => record.data.total.childrenActual.sales,
          align: "right",
        },
        {
          title: "Count",
          dataIndex: "count",
          key: "count",
          render: (value, record) => record.data.total.totalActual.count,
          align: "right",
        },
        {
          title: "Count %",
          key: "countPer",
          render: (value, record) =>
            record.data.total.totalActual.percentageCount + " %",
          align: "right",
        },
        {
          title: "Sale ",
          key: "sales",
          render: (value, record) => record.data.total.totalActual.sales,
          align: "right",
        },
        {
          title: "Sale %",
          key: "salesPer",
          render: (value, record) =>
            record.data.total.totalActual.percentageSales + " %",
          align: "right",
        },
      ];

      const expandedLevelFour = (record: PeriodData) => {
        const levelFourColumn: TableColumnsType<MealRecordType> = [
          {
            title: "Room",
            dataIndex: "room",
            key: "room",
            render: (value, record) => record.data.room,
          },
          {
            title: "Guest Names",
            dataIndex: "guests",
            key: "guests",
            render: (value, record) => record.data.guestNames,
          },
          {
            title: "Count",
            dataIndex: "pCount",
            key: "pCount",
            render: (value, record) => record.data.count,
          },
          {
            title: "Pax",
            dataIndex: "pax",
            key: "pax",
            render: (value, record) => record.data.pax,
          },
          {
            title: "Time",
            dataIndex: "timestamp",
            key: "timestamp",
            render: (value, record) => record.timestamp,
          },
          {
            title: "PKG Code",
            dataIndex: "packageCode",
            key: "packageCode",
            render: (value, record) => record.data.packageCode,
          },
          {
            title: "Remark",
            dataIndex: "remark",
            key: "remark",
            render: (value, record) => record.data.remark,
          },
        ];

        return (
          <Table
            columns={levelFourColumn}
            dataSource={record.data.record.map((d) => ({
              ...d,
              key: d.timestamp,
            }))}
            pagination={false}
          />
        );
      };

      return (
        <Table
          columns={levelThreeColumn}
          dataSource={record.period.map((d) => ({
            ...d,
            key: d.meal,
          }))}
          expandable={{
            expandedRowRender: expandedLevelFour,
            defaultExpandedRowKeys: ["2"],
          }}
          pagination={false}
          showHeader={false}
        />
      );
    };

    return (
      <Table
        columns={levelTwoColumn}
        dataSource={record.outlet}
        expandable={{
          expandedRowRender: expandedLevelThree,
          defaultExpandedRowKeys: ["1"],
        }}
        pagination={false}
        showHeader={false}
      />
    );
  };

  const handleDownload = () => {
    const tableDOM = document.getElementById("periodTable");
    const bookLink = writeToSheet(tableDOM);
    document.body.appendChild(bookLink);
    bookLink.click();
    document.body.removeChild(bookLink);
  };
  return (
    <div>
      <div className="w-full flex justify-center">
        <Button
          className="bg-primary text-white font-semibold mb-5"
          onClick={handleDownload}
        >
          Download table
        </Button>
      </div>
      <Table
        id="periodTable"
        columns={levelOneColumns}
        dataSource={mealDetails}
        expandable={{
          expandedRowRender: expandedLevelTwo,
          defaultExpandedRowKeys: ["0"],
        }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default MealPlanTable;
