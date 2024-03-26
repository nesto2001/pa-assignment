import { Card, Select, Table, TableProps, message } from "antd";
import { useEffect, useState } from "react";
import { PropertyData, PropertyJSON } from "../types/property";
import BarChart from "../components/charts/BarChart";
import { useParentSize } from "@visx/responsive";

type Option = {
  label: string;
  value: string;
};

const columns: TableProps<PropertyData>["columns"] = [
  {
    title: "Property",
    dataIndex: "code",
    key: "code",
    fixed: "left",
  },
  {
    title: "Total Room in Hotel",
    dataIndex: "totalRoom",
    key: "totalRoom",
    align: "right",
  },
  {
    title: "Room Revenue",
    key: "roomRev",
    dataIndex: "roomRev",
    render: (val: number) => (
      <div className="flex justify-between">
        <div className="currency">$</div>
        <div className="data">{val.toFixed(2)}</div>
      </div>
    ),
    align: "right",
  },
  {
    title: "F&B Revenue",
    dataIndex: "fnbRev",
    key: "fnbRev",
    render: (val: number) => (
      <div className="flex justify-between">
        <div className="currency">$</div>
        <div className="data">{val.toFixed(2)}</div>
      </div>
    ),
    align: "right",
  },
  {
    title: "Other Revenue",
    key: "otherRev",
    dataIndex: "otherRev",
    render: (val: number) => (
      <div className="flex justify-between">
        <div className="currency">$</div>
        <div className="data">{val.toFixed(2)}</div>
      </div>
    ),
    align: "right",
  },
  {
    title: "Total Revenue",
    key: "totalRev",
    dataIndex: "totalRev",
    render: (val: number) => (
      <div className="flex justify-between">
        <div className="currency">$</div>
        <div className="data">{val.toFixed(2)}</div>
      </div>
    ),
    align: "right",
  },
  {
    title: "Occupancy (%)",
    key: "occPer",
    dataIndex: "occPer",
    render: (val: number) => val.toFixed(1) + " %",
    align: "right",
  },
];

const OverviewData = () => {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [propertiesOption, setPropertiesOption] = useState<Option[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { parentRef, width } = useParentSize();

  const getPropertyData = async (): Promise<PropertyData[]> => {
    try {
      let propertyDatas: PropertyJSON[];
      const response = await fetch("sampledata_actual_data.json");
      propertyDatas = (await response.json()) as PropertyJSON[];
      if (propertyDatas) {
        return propertyDatas.map((data: PropertyJSON): PropertyData => {
          return {
            code: data.property,
            totalRoom: parseInt(data.totalRoom),
            fnbRev: data.fnbRevenue,
            otherRev: data.otherRevenue,
            roomRev: data.roomRevenue,
            totalRev: data.totalRevenue,
            occPer: data.OccPer,
          };
        });
      } else return [];
    } catch (error) {
      console.error("Error fetching sample data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      return await getPropertyData();
    };
    fetchData()
      .then((res) => {
        setProperties(res);
        const propOpt = res.map((val): Option => {
          return {
            label: val.code,
            value: val.code,
          };
        });
        setPropertiesOption(propOpt);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  }, []);

  const handleSelectChange = (value: string[]) => {
    setSelectedProperties(value);
  };

  if (!properties && !loading) {
    return;
  }
  return (
    <>
      <div className="w-2/3 lg:w-1/4">
        <Select
          mode="multiple"
          allowClear
          value={selectedProperties}
          style={{ width: "100%" }}
          placeholder="Please select property"
          onChange={handleSelectChange}
          options={propertiesOption}
        />
      </div>
      <Card className="w-full min-h-96 mt-8">
        <Table
          columns={columns}
          dataSource={properties.filter((prop) =>
            selectedProperties.length
              ? selectedProperties.includes(prop.code)
              : selectedProperties
          )}
          scroll={{ x: true }}
          summary={(data) => {
            let sumRoom = 0;
            let sumRoomRev = 0;
            let sumFnbRev = 0;
            let sumOtherRev = 0;
            let sumTotalRev = 0;
            let sumOccPer = 0;

            data.forEach(
              ({ totalRoom, roomRev, fnbRev, otherRev, totalRev, occPer }) => {
                sumRoom += totalRoom;
                sumRoomRev += roomRev;
                sumFnbRev += fnbRev;
                sumOtherRev += otherRev;
                sumTotalRev += totalRev;
                sumOccPer += occPer;
              }
            );

            return (
              <>
                <Table.Summary.Row className="font-bold bg-gray-50">
                  <Table.Summary.Cell
                    index={0}
                    colSpan={1}
                    className="!bg-gray-50"
                  >
                    Grand total
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} align="right">
                    {sumRoom}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} align="right">
                    <div className="flex justify-between">
                      <div className="currency">$</div>
                      <div className="data">{sumRoomRev}</div>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} align="right">
                    <div className="flex justify-between">
                      <div className="currency">$</div>
                      <div className="data">{sumFnbRev}</div>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4} align="right">
                    <div className="flex justify-between">
                      <div className="currency">$</div>
                      <div className="data">{sumOtherRev}</div>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5} align="right">
                    <div className="flex justify-between">
                      <div className="currency">$</div>
                      <div className="data">{sumTotalRev}</div>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6} align="right">
                    {`${sumOccPer.toFixed(1)} %`}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
          loading={loading}
        />
      </Card>

      <Card className="w-full min-h-96 mt-8 overview__barchart lg:block hidden">
        <div ref={parentRef}>
          {properties.length > 0 && (
            <BarChart data={properties} width={width} height={500} />
          )}
        </div>
      </Card>
    </>
  );
};

export default OverviewData;
