"use client";

import React, { useState, useEffect } from 'react';
import LineChart from '@/components/line-chart';
import { DataPoint } from '@/components/line-chart/types';

const LineChartExample: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Generate some sample data
    const now = Date.now();
    const newData: DataPoint[] = Array.from({ length: 50 }, (_, i) => [
      now - (49 - i) * 60000, // One point per minute
      Math.random() * 100
    ]);
    setData(newData);
  }, []);

  return (
    <div>
      <h1>Line Chart Example</h1>
      <LineChart
        data={data}
        width={800}
        height={400}
        id="example-line-chart"
        chartId="example-chart"
        timeRange={[data[0]?.[0] || Date.now(), data[data.length - 1]?.[0] || Date.now()]}
        maxY={100}
      />
    </div>
  );
};

export default LineChartExample;