"use client";

import React, { useState, useEffect } from 'react';
import InfinityChart from '@/components/w3-infinity-chart';
import { ChartDataPoint, ChartConfig } from '@/components/w3-infinity-chart/types';

const InfinityChartExample: React.FC = () => {
  const [data, setData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    // Generate some sample data
    const newData: ChartDataPoint[] = Array.from({ length: 50 }, (_, i) => ({
      date: new Date(2023, 0, i + 1),
      total: Math.random() * 100,
      value: Math.random() * 50,
      x: `Day ${i + 1}`
    }));
    setData(newData);
  }, []);

  const config: ChartConfig = {
    id: 'example-chart',
    SHIFT_SIZE: 10,
    ZOOM_SIZE: 50,
    ZOOM_DIRECTION: 'LEFT',
    STACKED_KEYS: ['value'],
    TIME_KEYS: 'date',
    X_AXIS_KEY: 'x',
    X_AXIS_ID: 'date',
    LEFT_AXIS_KEY: 'total',
    LEFT_AXIS_TITLE: 'Total',
    RIGHT_AXIS_KEY: 'value',
    RIGHT_AXIS_TITLE: 'Value',
    STACKED_TOTAL_KEY: 'total',
    FIXED_HEIGHT: 400
  };

  const width = 800;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  return (
    <div>
      <h1>Infinity Chart Example</h1>
      <InfinityChart
        width={width}
        height={height}
        margin={margin}
        data={data}
        config={config}
      />
    </div>
  );
};

export default InfinityChartExample;