export type DragCallback = (
  xValue: number[],
  yValue: number[],
  yValueMax: number
) => void;

export interface HeatmapChartConfig {
  hit?: {
    minWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    maxWidth?: number;
    maxYCnt?: number;
  };
  view?: {
    fitToWidth?: boolean;
  };
  xAxis?: {
    interval?: number;
    timeRange?: number;
    endTime?: number;
  };
  yAxis?: {
    tickFormat?: (d: number) => string | number;
    plots?: number;
    hasLine?: boolean;
    maxValue?: number;
  };
  dragTooltip?: boolean;
  dragCallback?: DragCallback;
  remainDrag?: boolean;
  buttons?: boolean;
  legends?: "top" | "bottom";
  isLive?: boolean;
  updateMaxData?: number;
  deleteOldCount?: number;
  countLevel?: {
    hit: number[];
    err: number[];
  };
  color?: {
    hit: string[];
    err: string[];
  };
  applyGlobalSkin?: boolean;
  isStatic?: boolean;
  width?: number;
  height?: number;
  theme?: "light" | "dark";
  cookieId?: string;
}

export interface HeatmapDataPoint {
  hit: number[];
  err: number[];
  add: (x: number, v: number) => void;
}

export type MousePosition = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  down: boolean;
  drag: boolean;
};

export interface ChartAttribute {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type TimeFormatFunction = (time: Date) => string;

export interface DatasetUpdate {
  hit: [number, number[]][];
  err: [number, number[]][];
}

export interface Colors {
  [key: string]: string;
}

export const colors: Colors = {
  COLOR_LEGEND_LIGHT: "#000000",
  COLOR_LEGEND_DARK: "#ffffff",
  COLOR_GUIDE_LIGHT: "#E0E0E0",
  COLOR_GUIDE_DARK: "#3f3f3f",
  COLOR_RANGE_LIGHT: "#000000",
  COLOR_RANGE_DARK: "#ffffff",
  COLOR_BORDER_LIGHT: "#000000",
  COLOR_BORDER_DARK: "#C4C4C4",
  COLOR_BORDER_TOP_LIGHT: "#E0E0E0",
  COLOR_BORDER_TOP_DARK: "#C4C4C4",
  COLOR_BORDER_BOTTOM_LIGHT: "#000000",
  COLOR_BORDER_BOTTOM_DARK: "#C4C4C4",
  COLOR_GUIDE_UNIT_LIGHT: "#E3E6EA",
  COLOR_GUIDE_UNIT_DARK: "#3f3f3f",
};
