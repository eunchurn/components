declare const CountClassify: {
    "0-1": string;
    "1-2": string;
    "2-3": string;
    "3-4": string;
    "4-5": string;
    "5-6": string;
    "6-7": string;
    "7+": string;
};
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
export declare type CountClassify = typeof CountClassify[keyof typeof CountClassify];
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
export declare const classifyDir: (direction: number) => string;
declare type Data = {
    direction: number[];
    speed: number[];
};
export declare const calculateWindRose: (data: Data) => {
    total: number;
    angle: string;
}[];
export {};
//# sourceMappingURL=index.d.ts.map