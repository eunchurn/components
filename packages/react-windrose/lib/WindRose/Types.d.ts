/// <reference types="react" />
declare type DirectionCount = {
    "0-1": number;
    "1-2": number;
    "2-3": number;
    "3-4": number;
    "4-5": number;
    "5-6": number;
    "6-7": number;
    "7+": number;
};
export declare type CountClassify = "angle" | "0-1" | "1-2" | "2-3" | "3-4" | "4-5" | "5-6" | "6-7" | "7+";
export declare enum Direction {
    N = "N",
    NNE = "NNE",
    NE = "NE",
    ENE = "ENE",
    E = "E",
    ESE = "ESE",
    SE = "SE",
    SSE = "SSE",
    S = "S",
    SSW = "SSW",
    SW = "SW",
    WSW = "WSW",
    W = "W",
    WNW = "WNW",
    NW = "NW",
    NNW = "NNW"
}
export declare type Count = {
    N: DirectionCount;
    NNE: DirectionCount;
    NE: DirectionCount;
    ENE: DirectionCount;
    E: DirectionCount;
    ESE: DirectionCount;
    SE: DirectionCount;
    SSE: DirectionCount;
    S: DirectionCount;
    SSW: DirectionCount;
    SW: DirectionCount;
    WSW: DirectionCount;
    W: DirectionCount;
    WNW: DirectionCount;
    NW: DirectionCount;
    NNW: DirectionCount;
};
export declare type DataTypes = {
    [key: string]: number;
}[];
declare type Angle = "N" | "NNE" | "NE" | "ENE" | "E" | "ESE" | "SE" | "SSE" | "S" | "SSW" | "SW" | "WSW" | "W" | "WNW" | "NW" | "NNW";
export declare type ChartData = {
    angle: Angle;
    "0-1": number;
    "1-2": number;
    "2-3": number;
    "3-4": number;
    "4-5": number;
    "5-6": number;
    "6-7": number;
    "7+": number;
    total: number;
};
export declare type Column = keyof ChartData;
export interface ChartPropTypes extends React.HTMLProps<HTMLDivElement> {
    chartData: ChartData[];
    columns: string[];
    width: number;
    height: number;
    responsive: boolean;
    legendGap: number;
}
export declare const ChartDefaultProps: ChartPropTypes;
export interface DataType {
    [key: string]: number | null;
}
export {};
//# sourceMappingURL=Types.d.ts.map