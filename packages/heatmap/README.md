# React Heatmap Component

A flexible and interactive heatmap component for React applications, built with D3.js and TypeScript.

## Features

- Visualize data intensity with a color-coded grid
- Customizable time range and interval
- Configurable color schemes for hit and error data
- Interactive zooming and panning
- Responsive design

## Installation

You can install this package using npm:

```bash
npm install @eunchurn/heatmap
```

## Usage

Here's a basic example of how to use the HeatmapChart component:

```jsx
import React from 'react';
import { HeatmapChart } from '@eunchurn/heatmap';

const YourComponent = () => {
  const data = {
    hit: [
      [1625097600000, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]],
      [1625184000000, [15, 25, 35, 45, 55, 65, 75, 85, 95, 105]],
      // ... more data points
    ],
    err: [
      [1625097600000, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
      [1625184000000, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
      // ... more data points
    ]
  };

  const config = {
    width: 800,
    height: 400,
    xAxis: {
      timeRange: 10 * 60 * 1000, // 10 minutes
      interval: 5000, // 5 seconds
    },
    yAxis: {
      maxValue: 10000,
      tickFormat: (d) => d / 1000,
    },
    color: {
      hit: ['#2196f3', '#1565c0', '#1a237e'],
      err: ['#f9a825', '#ef6c00', '#d50000'],
    },
    countLevel: {
      hit: [0, 150, 300],
      err: [0, 3, 6],
    },
  };

  return (
    <HeatmapChart
      width={800}
      height={400}
      data={data}
      config={config}
    />
  );
};

export default YourComponent;
```

## API Reference

### HeatmapChart Props

- `width` (number): The width of the chart
- `height` (number): The height of the chart
- `data` (object): The data to be displayed in the heatmap
  - `hit` (array): Array of [timestamp, values] pairs for hit data
  - `err` (array): Array of [timestamp, values] pairs for error data
- `config` (object): Configuration options for the chart

### Config Options

- `xAxis` (object):
  - `timeRange` (number): The time range to display in milliseconds
  - `interval` (number): The interval between data points in milliseconds
- `yAxis` (object):
  - `maxValue` (number): The maximum value for the y-axis
  - `tickFormat` (function): A function to format y-axis tick labels
- `color` (object):
  - `hit` (array): Array of colors for hit data intensity
  - `err` (array): Array of colors for error data intensity
- `countLevel` (object):
  - `hit` (array): Thresholds for hit data color intensity
  - `err` (array): Thresholds for error data color intensity

## Customization

You can customize the appearance and behavior of the heatmap by adjusting the config options. For example:

```jsx
const customConfig = {
  ...config,
  color: {
    hit: ['#00ff00', '#ffff00', '#ff0000'], // Custom color scheme for hit data
    err: ['#0000ff', '#ff00ff', '#000000'], // Custom color scheme for error data
  },
  countLevel: {
    hit: [0, 100, 200], // Custom thresholds for hit data
    err: [0, 5, 10],    // Custom thresholds for error data
  },
};

<HeatmapChart
  width={1000}
  height={500}
  data={data}
  config={customConfig}
/>
```

## Events

The HeatmapChart component supports the following events:

- `onChangeYAxis`: Triggered when the y-axis scale changes
- `onChangeTheme`: Triggered when the chart theme changes

You can listen to these events by passing callback functions as props:

```jsx
<HeatmapChart
  // ... other props
  onChangeYAxis={(direction) => console.log(`Y-axis changed: ${direction}`)}
  onChangeTheme={(theme) => console.log(`Theme changed to: ${theme}`)}
/>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.