export interface ChartDataPoint {
  [key: string]: number | string | Date;
  date: Date;
  total: number;
}

export interface ChartConfig {
  id: string;
  SHIFT_SIZE: number;
  ZOOM_SIZE: number;
  ZOOM_DIRECTION: 'LEFT' | 'RIGHT' | 'CENTER';
  STACKED_KEYS: string[];
  TIME_KEYS: string;
  X_AXIS_KEY: string;
  X_AXIS_ID: string;
  LEFT_AXIS_KEY: string;
  LEFT_AXIS_TITLE?: string;
  RIGHT_AXIS_KEY?: string;
  RIGHT_AXIS_TITLE?: string;
  STACKED_TOTAL_KEY: string;
  FIXED_HEIGHT: number;
}

export interface ChartProps {
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  data: ChartDataPoint[];
  config: ChartConfig;
}

export interface ChartState {
  focusedIndex: [number, number];
}