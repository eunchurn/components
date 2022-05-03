/// <reference types="react" />
import { PropType, DataType } from "./Types";
export declare function Chart(props: PropType): JSX.Element;
export declare namespace Chart {
    var defaultProps: {
        chartData: DataType[];
        dataMax: number;
        angles: string[];
        columns: string[];
        columnsColor: string[];
        width: number;
        height: number;
        dataKeys: string[];
        mouseOverColor: string;
        mouseOverTitleColor: string;
        mouseOverSurveyColor: string;
        responsive: boolean;
        legendGap: number;
    };
}
export declare const AxisContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const Axis: import("styled-components").StyledComponent<"svg", any, {}, never>;
export default Chart;
//# sourceMappingURL=Chart.d.ts.map