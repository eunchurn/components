import React from "react";
export interface DataType {
  [key: string]: string;
}

// export interface DataType {
//   subject: string;
//   coreCompetency: string;
//   survey: string;
//   color: string;
// };

interface State extends React.HTMLProps<HTMLDivElement> {
  width?: number;
  height?: number;
}

export interface PropType extends State {
  /**
   * Professionals respond to survey of how much they use a K-12 core competancy in each subject
   */
  chartData?: DataType[];
  /**
   * Subjects
   */
  columns?: string[];
  /**
   * Subjects colors
   */
  columnsColor?: string[];
  /**
   * All core competency
   */
  angles?: string[];
  /**
   * Max score
   */
  dataMax?: number;
  /**
   * Target data keys
   */
  dataKeys?: string[];
  /**
   * Mouse over Path color
   */
  mouseOverColor?: string;
  /**
   * Mouse over competency text color
   */
  mouseOverTitleColor?: string;
  /**
   * Mouseover survey score text color
   */
  mouseOverSurveyColor?: string;
  /* A boolean that is used to determine if the chart is responsive or not. */
  responsive?: boolean;
  /* width gap pixels between chart and legend */
  legendGap?: number;
}
