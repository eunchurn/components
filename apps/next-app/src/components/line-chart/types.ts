export interface DataPoint {
  [0]: number; // timestamp
  [1]: number; // value
}

export interface LineChartProps {
  data: DataPoint[];
  width: number;
  height: number;
  id: string;
  chartId: string;
  timeRange: [number, number];
  maxY: number;
}

export interface LineChartState {
  path: d3.Selection<SVGPathElement, DataPoint[], null, undefined> | null;
}