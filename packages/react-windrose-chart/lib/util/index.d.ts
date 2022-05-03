import { Direction, Count, ChartData } from "../WindRose/Types";
export declare const countPush: (count: Count, dir: Direction, speed: number) => Count;
export declare const classifyDir: (direction: number) => Direction;
declare type Data = {
    direction: number[];
    speed: number[];
};
export declare function calculateWindRose(data: Data): ChartData[];
export {};
//# sourceMappingURL=index.d.ts.map