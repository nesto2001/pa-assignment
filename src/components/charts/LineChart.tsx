import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  Axis,
  Tooltip,
  TooltipDatum,
  XYChart
} from "@visx/xychart";
import { RenderTooltipParams } from "@visx/xychart/lib/components/Tooltip";
import dayjs from "dayjs";
import { ForecastMap } from "../../mappings/ForecastMapping";
import { ForecastData } from "../../types/forecast";

export type XYChartProps = {
  width: number;
  height: number;
};

type Props = {
  data: ForecastData[];
};

const LineChart = ({ data }: Props) => {
  return (
    <div>
      <XYChart
        height={500}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
      >
        <AnimatedAxis orientation="bottom" />
        <AnimatedGrid columns={false} numTicks={4} />
        <AnimatedLineSeries
          dataKey="arrRooms"
          data={data}
          xAccessor={(d: ForecastData) => dayjs(d.date).format("DD/MM/YYYY")}
          yAccessor={(d: ForecastData) => d.arrRooms}
        />
        <AnimatedLineSeries
          dataKey="depRooms"
          data={data}
          xAccessor={(d: ForecastData) => dayjs(d.date).format("DD/MM/YYYY")}
          yAccessor={(d: ForecastData) => d.depRooms}
        />
        <AnimatedLineSeries
          dataKey="totalOcc"
          data={data}
          xAccessor={(d: ForecastData) => dayjs(d.date).format("DD/MM/YYYY")}
          yAccessor={(d: ForecastData) => d.totalOcc}
        />
        <Tooltip<ForecastData>
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({
            tooltipData,
            colorScale,
          }: RenderTooltipParams<ForecastData>) =>
            tooltipData &&
            colorScale &&
            tooltipData.nearestDatum &&
            tooltipData.nearestDatum.datum &&
            tooltipData.nearestDatum.key && (
              <>
                {Object.keys(tooltipData.datumByKey).map((key) => {
                  const datum: TooltipDatum<ForecastData> =
                    tooltipData.datumByKey[key];
                  return (
                    <div key={key} className="my-2">
                      <div style={{ color: colorScale(key) }}>
                        {ForecastMap[key]}
                        {": "}
                        {datum.datum[key as keyof ForecastData]}
                      </div>
                    </div>
                  );
                })}
                <div className="">
                  {dayjs(tooltipData.nearestDatum.datum.date).format(
                    "DD/MM/YYYY"
                  )}
                </div>
              </>
            )
          }
        />
        <Axis key={`time-axis`} orientation={"left"} numTicks={15} />
      </XYChart>
    </div>
  );
};

export default LineChart;
