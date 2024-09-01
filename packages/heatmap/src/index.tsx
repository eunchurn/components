import React, { useRef, useEffect, useState } from "react";
import { HitmapChart, HitmapChartConfig } from "./heatmap";
export * from "./heatmap";

export interface HeatmapData {
  hit: [number, number[]][];
  err: [number, number[]][];
}

interface HeatmapChartProps {
  width: number;
  height: number;
  data: HeatmapData;
  config?: HitmapChartConfig;
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
  const [chart, setChart] = useState<HitmapChart | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const defaultConfig: HitmapChartConfig = {
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
      const newChart = new HitmapChart(canvasRef.current.id, {
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
  useEffect(() => {
    if (chart && onChangeYAxis) {
      onChangeYAxis = (direction: "up" | "down") => {
        chart.changeYAxis(direction);
      };
    }
  }, [chart, onChangeYAxis]);

  useEffect(() => {
    if (chart && onChangeTheme) {
      onChangeTheme = (theme: string) => {
        chart.changeTheme(theme);
      };
    }
  }, [chart, onChangeTheme]);
  return <canvas ref={canvasRef} id="heatmapCanvas" />;
};

export default HeatmapChart;
