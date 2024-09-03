import React, { useRef, useEffect, useState, useCallback } from "react";
import { HeatmapChart as Heatmap, HeatmapChartConfig } from "./heatmap";
export * from "./heatmap";

export interface HeatmapData {
  hit: [number, number[]][];
  err: [number, number[]][];
}

interface HeatmapChartProps {
  width: number;
  height: number;
  data: HeatmapData;
  config?: HeatmapChartConfig;
  onChangeYAxis?: (direction: "up" | "down") => void;
  onChangeTheme?: (theme: string) => void;
}

export const HeatmapChart: React.FC<HeatmapChartProps> = ({
  width,
  height,
  data,
  config,
  onChangeYAxis,
  onChangeTheme,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<Heatmap | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const defaultConfig: HeatmapChartConfig = {
        width,
        height,
        xAxis: {
          timeRange: 10 * 60 * 1000,
          interval: 5000,
        },
        yAxis: {
          maxValue: 10000,
          tickFormat: (d: number) => d / 1000,
        },
        // dragCallback: (xValue, yValue, yValueMax) => {
        //   console.log("selected range", xValue, yValue, yValueMax);
        // },
      };
      const newChart = new Heatmap(canvasRef.current.id, {
        ...defaultConfig,
        ...config,
      });
      setChart(newChart);
    }
  }, [width, height]);

  useEffect(() => {
    if (chart) {
      chart.loadData(data);
    }
  }, [chart, data]);
  const handleChangeYAxis = useCallback((direction: "up" | "down") => {
    if (chart) {
      chart.changeYAxis(direction);
      if (onChangeYAxis) {
        onChangeYAxis(direction);
      }
    }
  }, [chart, onChangeYAxis]);

  const handleChangeTheme = useCallback((theme: string) => {
    if (chart) {
      chart.changeTheme(theme);
      if (onChangeTheme) {
        onChangeTheme(theme);
      }
    }
  }, [chart, onChangeTheme]);
  useEffect(() => {
    if (chart) {
      chart.changeYAxis = handleChangeYAxis;
      chart.changeTheme = handleChangeTheme;
    }
  }, [chart, handleChangeYAxis, handleChangeTheme]);
  // useEffect(() => {
  //   if (chart && onChangeYAxis) {
  //     onChangeYAxis = (direction: "up" | "down") => {
  //       chart.changeYAxis(direction);
  //     };
  //   }
  // }, [chart, onChangeYAxis]);

  // useEffect(() => {
  //   if (chart && onChangeTheme) {
  //     onChangeTheme = (theme: string) => {
  //       chart.changeTheme(theme);
  //     };
  //   }
  // }, [chart, onChangeTheme]);
  return <canvas ref={canvasRef} id="heatmapCanvas" role="img" />;
};

export default HeatmapChart;
