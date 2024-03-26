import { AxisBottom, AxisLeft } from "@visx/axis";
import { Grid } from "@visx/grid";
import { Group } from "@visx/group";
import { LegendItem, LegendLabel, LegendOrdinal } from "@visx/legend";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { BarGroup } from "@visx/shape";
import { TooltipData } from "@visx/xychart";
import { PropertyMap } from "../../mappings/PropertyDataMapping";
import { PropertyData } from "../../types/property";
import ChartLegend from "./ChartLegend";

export type XYChartProps = {
  width: number;
  height: number;
};

interface RenderTooltipProps {
  tooltipData: TooltipData<PropertyData>;
  colorScale: (value: string) => string;
}

type Revenue = "roomRev" | "fnbRev" | "otherRev";

type Props = {
  data: PropertyData[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const getProperty = (d: PropertyData) => d.code;

const blue = "#aeeef8";
const green = "#e5fd3d";
const purple = "#9caff6";
const background = "#fff";
const defaultMargin = { top: 50, right: 80, bottom: 50, left: 80 };

const BarChart = ({ data, margin = defaultMargin, width, height }: Props) => {
  const keys = Object.keys(data[0]).filter(
    (d) =>
      d !== "code" && d !== "totalRev" && d !== "totalRoom" && d !== "occPer"
  ) as Revenue[];

  const propertyScale = scaleBand<string>({
    domain: data.map(getProperty),
    padding: 0.2,
  });
  const revenueScale = scaleBand<string>({
    domain: keys,
    padding: 0.1,
  });
  const dataScale = scaleLinear<number>({
    domain: [
      0,
      Math.max(
        ...data.map((d) => Math.max(...keys.map((key) => Number(d[key]))))
      ),
    ],
  });

  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: [blue, green, purple],
  });

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  propertyScale.rangeRound([0, xMax]);
  revenueScale.rangeRound([0, propertyScale.bandwidth()]);
  dataScale.range([yMax, 0]);

  return (
    <div className="flex flex-col">
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          fill={background}
          height={height}
          rx={14}
        />
        <Grid
          top={margin.top}
          left={margin.left}
          xScale={propertyScale}
          yScale={dataScale}
          width={xMax}
          height={yMax}
          stroke="black"
          strokeOpacity={0.1}
          xOffset={propertyScale.bandwidth() / 2}
        />
        <Group top={margin.top} left={margin.left}>
          <BarGroup
            data={data}
            keys={keys}
            height={yMax}
            x0={getProperty}
            x0Scale={propertyScale}
            x1Scale={revenueScale}
            yScale={dataScale}
            color={colorScale}
          >
            {(barGroups) =>
              barGroups.map((barGroup) => (
                <Group
                  key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                  left={barGroup.x0}
                >
                  {barGroup.bars.map((bar) => (
                    <rect
                      key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      fill={bar.color}
                      rx={4}
                    />
                  ))}
                </Group>
              ))
            }
          </BarGroup>
        </Group>
        <AxisBottom
          top={yMax + margin.top}
          scale={propertyScale}
          stroke={"#000"}
          tickStroke={"#000"}
          hideAxisLine
          tickLabelProps={{
            fill: "#000",
            fontSize: 14,
            textAnchor: "middle",
          }}
          left={80}
          label="Property"
        />
        <AxisLeft
          top={0 + margin.bottom}
          scale={dataScale}
          stroke={"#000"}
          tickStroke={"#000"}
          hideAxisLine
          hideTicks
          tickLabelProps={{
            fill: "#000",
            fontSize: 14,
            textAnchor: "middle",
          }}
          left={70}
          label="Revenue"
        />
      </svg>
      <ChartLegend title="Revenue">
        <LegendOrdinal scale={colorScale}>
          {(labels) => (
            <div style={{ display: "flex", flexDirection: "row" }}>
              {labels.map((label, i) => (
                <LegendItem key={`legend-quantile-${i}`} margin="0 5px">
                  <svg width={14} height={14}>
                    <rect fill={label.value} width={14} height={14} />
                  </svg>
                  <LegendLabel align="left" margin="0 0 0 4px">
                    {PropertyMap[label.text as Revenue]}
                  </LegendLabel>
                </LegendItem>
              ))}
            </div>
          )}
        </LegendOrdinal>
      </ChartLegend>
    </div>
  );
};

export default BarChart;
