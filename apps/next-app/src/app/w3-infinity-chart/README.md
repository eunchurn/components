# react-infinity-chart

A flexible and interactive chart library for React applications, built with D3.js and TypeScript.

## Features

- LineChart: Render line charts with customizable styles and interactions
- BarChart: Create bar charts with zooming capabilities
- RelationChart: Visualize relationships between data points
- InfinityChart: An advanced chart with panning and zooming features

## Installation

You can install this package using npm:

```bash
npm install react-infinity-chart
```

Or if you prefer using yarn:

```bash
yarn add react-infinity-chart
```

## Usage

Here's a basic example of how to use the InfinityChart component:

```jsx
import React from 'react';
import { InfinityChart } from 'react-infinity-chart';

const YourComponent = () => {
  const data = [
    { date: new Date(2023, 0, 1), total: 100, value: 50, x: 'Day 1' },
    { date: new Date(2023, 0, 2), total: 150, value: 75, x: 'Day 2' },
    // ... more data points
  ];

  const config = {
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

  return (
    <InfinityChart
      width={800}
      height={400}
      margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
      data={data}
      config={config}
    />
  );
};

export default YourComponent;
```

## API Reference

### InfinityChart Props

- `width` (number): The width of the chart
- `height` (number): The height of the chart
- `margin` (object): The margins around the chart (top, right, bottom, left)
- `data` (array): The data to be displayed in the chart
- `config` (object): Configuration options for the chart

### LineChart Props

- `data` (array): The data points for the line chart
- `width` (number): The width of the chart
- `height` (number): The height of the chart
- `id` (string): A unique identifier for the chart
- `chartId` (string): An identifier for the chart's clip path
- `timeRange` (array): The time range for the x-axis [start, end]
- `maxY` (number): The maximum value for the y-axis

### RelationChart Props

- `data` (object): The nodes and links data for the relation chart
- `width` (number): The width of the chart
- `height` (number): The height of the chart

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.