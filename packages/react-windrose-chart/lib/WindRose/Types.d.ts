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
declare const Direction: {
    N: string;
    NNE: string;
    NE: string;
    ENE: string;
    E: string;
    ESE: string;
    SE: string;
    SSE: string;
    S: string;
    SSW: string;
    SW: string;
    WSW: string;
    W: string;
    WNW: string;
    NW: string;
    NNW: string;
};
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
export declare type Direction = typeof Direction[keyof typeof Direction];
export declare type DataTypes = {
    [key: string]: number;
}[];
export interface ChartPropTypes extends React.HTMLProps<HTMLDivElement> {
    chartData: {
        [key: string]: number;
    }[];
    columns: string[];
    width: number;
    height: number;
}
export declare const ChartDefaultProps: {
    width: number;
    height: number;
    data: {
        angle: string;
        "0-1": number;
        "1-2": number;
        "2-3": number;
        "3-4": number;
        "4-5": number;
        "5-6": number;
        "6-7": number;
        "7+": number;
        total: number;
    }[];
    columns: string[];
};
export interface DataType {
    [key: string]: number | null;
}
interface State {
    width: number;
    height: number;
}
export interface PropType extends State {
    /**
     * Professionals respond to survey of how much they use a K-12 core competancy in each subject
     */
    data: DataType[];
    /**
     * Subjects
     */
    columns: string[];
    /**
     * Subjects colors
     */
    columnsColor: string[];
    /**
     * All core competency
     */
    angles: string[];
    /**
     * Max score
     */
    dataMax: number;
    /**
     * Target data keys
     */
    dataKeys: string[];
    /**
     * Mouse over Path color
     */
    mouseOverColor: string;
    /**
     * Mouse over competency text color
     */
    mouseOverTitleColor: string;
    /**
     * Mouseover survey score text color
     */
    mouseOverSurveyColor: string;
}
export {};
//# sourceMappingURL=Types.d.ts.map