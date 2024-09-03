# Windrose Chart Component

![npm](https://img.shields.io/npm/dw/@eunchurn%2Freact-windrose) [![npm version](https://badge.fury.io/js/@eunchurn%2Freact-windrose.svg)](https://badge.fury.io/js/@eunchurn%2Freact-windrose) [![GitHub version](https://badge.fury.io/gh/eunchurn%2Fcomponents.svg)](https://badge.fury.io/gh/eunchurn%2Fcomponents) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[**Storybook**](https://eunchurn.github.io/react-windrose-chart/)

[**DEMO**(Nextjs)](https://stackblitz.com/edit/nextjs-react-windrose-chart?file=app%2Fpage.tsx)

## Features

![react-windrose-chart](https://raw.githubusercontent.com/eunchurn/components/main/packages/react-windrose/doc/images/react-windrose-chart.png)
- Highly customizable Windrose (Wind Rose) chart component for React applications
- Built with [D3js](https://d3js.org/) for powerful, flexible data visualization
- Responsive design with optional auto-sizing
- TypeScript support for improved developer experience
- Inspired by [ssmaroju](https://bl.ocks.org/ssmaroju)'s [Wind Rose Plot](https://bl.ocks.org/ssmaroju/96af159c1872c2928a972c441bccaf50)

## Installation

```bash
npm i @eunchurn/react-windrose
```

## Usage

```tsx
import React from "react";
import { Chart } from "@eunchurn/react-windrose";

const windData = {
  chartData: [
    {
      angle: "N",
      "0-1": 0.5,
      "1-2": 1.6,
      "2-3": 0.9,
      "3-4": 0.9,
      "4-5": 0.4,
      "5-6": 0.3,
      "6-7": 0.2,
      "7+": 0.1,
      total: 4.9,
    },
    // ... more data for other directions
  ],
  columns: ["angle", "0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7+"],
};

const App: React.FC = () => (
  <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
    <Chart
      chartData={windData.chartData}
      columns={windData.columns}
      responsive
      legendGap={20}
    />
  </div>
);

export default App;
```

## Props

| Prop           | Type                  | Required | Description                            | Default |
| :------------- | :-------------------- | :------- | :------------------------------------- | :------ |
| **chartData**  | `ChartData[]`         | Yes      | Array of wind data objects             |         |
| **columns**    | `(keyof ChartData)[]` | Yes      | Array of column names                  |         |
| **width**      | `number`              | No       | Chart width in pixels                  | 500     |
| **height**     | `number`              | No       | Chart height in pixels                 | 500     |
| **responsive** | `boolean`             | No       | Enable responsive sizing               | false   |
| **legendGap**  | `number`              | No       | Gap between chart and legend in pixels | 10      |

Note: When `responsive` is true, `width` and `height` props are ignored. The chart will maintain a 1:1 aspect ratio and fit 100% of its parent container's width.

## Data Structure

### `ChartData` Object

Each object in the chartData array should have the following structure:

```ts
interface ChartData {
  angle: string;
  "0-1": number;
  "1-2": number;
  "2-3": number;
  "3-4": number;
  "4-5": number;
  "5-6": number;
  "6-7": number;
  "7+": number;
  total: number;
}
```

check [sample data](stories/data.json)

|    Key    |   Type   |  Required  | Description                                                                                                       | Default |
| :-------: | :------: | :--------: | :---------------------------------------------------------------------------------------------------------------- | :------ |
|  **0-1**  | `number` | `Required` | Frequency of 0-1 m/sec                                                                                            |         |
|  **1-2**  | `number` | `Required` | Frequency of 1-2 m/sec                                                                                            |         |
|  **2-3**  | `number` | `Required` | Frequency of 2-3 m/sec                                                                                            |         |
|  **3-4**  | `number` | `Required` | Frequency of 3-4 m/sec                                                                                            |         |
|  **4-5**  | `number` | `Required` | Frequency of 4-5 m/sec                                                                                            |         |
|  **5-6**  | `number` | `Required` | Frequency of 5-6 m/sec                                                                                            |         |
|  **6-7**  | `number` | `Required` | Frequency of 6-7 m/sec                                                                                            |         |
|  **7+**   | `number` | `Required` | Frequency of 7+ m/sec                                                                                             |         |
| **angle** | `string` | `Required` | Wind direction `N`, `NNE`, `NE`, `ENE`, `E`, `ESE`, `SE`, `SSE`, `S`, `SSW`, `SW`, `WSW`, `W`, `WNW`, `NW`, `NNW` |         |
| **total** | `number` | `Required` | Sum of frequencies of this direction                                                                              |         |

- `angle`: Wind direction (e.g., "N", "NNE", "NE", etc.)
- `"0-1"` to `"7+"`: Frequency of wind speeds in m/s
- `total`: Sum of all frequencies for this direction

## Utility Functions

### `calculateWindRose`

Converts raw wind data to the required ChartData format:

```ts
import { calculateWindRose } from "@eunchurn/react-windrose";

const rawData = {
  direction: [270, 256, 240, ...], // wind directions in degrees
  speed: [1.02, 0.85, 0.98, ...] // wind speeds in m/s
};

const windRoseData = calculateWindRose(rawData);
```

- Wind Rose data can be converted by Wind direction(degree) and wind speed data: `{direction: number[], speed: number[]}` to `data: ChartData[]`

```javascript
import { caculateWindRose } from "@eunchurn/react-windrose";

const data = {
  direction: [270, 256, 240,...],
  speed: [ 1.02, 0.85, 0.98,...]
}

const windRoseData = calculateWindRose(data);
// Return 
// [
//   {
//     angle: 'N',
//     '0-1': 0,
//     '1-2': 0,
//     '2-3': 0,
//     '3-4': 0,
//     '4-5': 0,
//     '5-6': 0,
//     '6-7': 0,
//     '7+': 0,
//     total: 0
//   },
//   {
//     angle: 'NNE',
//     '0-1': 0,
//     '1-2': 0,
//     '2-3': 0,
//     '3-4': 0,
//     '4-5': 0,
//     '5-6': 0,
//     '6-7': 0,
//     '7+': 0,
//     total: 0
//   },
//   ...
// ]

```

### `classifyDir`

Classifies a wind direction in degrees to a cardinal or intercardinal direction:

```ts
import { classifyDir } from "@eunchurn/react-windrose";

const direction = classifyDir(270);
console.log(direction); // Output: "W"
```

## Advanced Usage

### Real-Time Updates

The component can be used with real-time data by updating the `chartData` prop:

```tsx
import React, { useState, useEffect } from 'react';
import { Chart, calculateWindRose } from "@eunchurn/react-windrose";

const RealTimeWindRose: React.FC = () => {
  const [windData, setWindData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch new wind data from your API
      const newData = await fetchWindDataFromAPI();
      const processedData = calculateWindRose(newData);
      setWindData(processedData);
    };

    const interval = setInterval(fetchData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return <Chart chartData={windData} columns={/* your columns */} responsive />;
};
```

![realtime-chart](https://raw.githubusercontent.com/eunchurn/components/main/packages/react-windrose/doc/images/realtime.gif)

## Browser Support

This component is tested and supported in the latest versions of:

- Chrome
- Firefox
- Safari
- Edge

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
