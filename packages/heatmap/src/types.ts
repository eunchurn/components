export type DragCallback = (
  xValue: number[],
  yValue: number[],
  yValueMax: number
) => void;

export interface HitmapChartConfig {
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

export interface HitmapDataPoint {
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
  COLOR_LEGEND_WH: "#000000",
  COLOR_LEGEND_BK: "#ffffff",
  COLOR_GUIDE_WH: "#E0E0E0",
  COLOR_GUIDE_BK: "#3f3f3f",
  COLOR_RANGE_WH: "#000000",
  COLOR_RANGE_BK: "#ffffff",
  COLOR_BORDER_WH: "#000000",
  COLOR_BORDER_BK: "#C4C4C4",
  COLOR_BORDER_TOP_WH: "#E0E0E0",
  COLOR_BORDER_TOP_BK: "#C4C4C4",
  COLOR_BORDER_BOTTOM_WH: "#000000",
  COLOR_BORDER_BOTTOM_BK: "#C4C4C4",
  COLOR_GUIDE_UNIT_WH: "#E3E6EA",
  COLOR_GUIDE_UNIT_BK: "#3f3f3f",
};
