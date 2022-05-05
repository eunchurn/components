# Windrose Chart Component

[![Unit Test](https://github.com/eunchurn/components/actions/workflows/unit-test.yml/badge.svg)](https://github.com/eunchurn/components/actions/workflows/unit-test.yml) [![Node.js Package](https://github.com/eunchurn/components/actions/workflows/npmpublish.yml/badge.svg)](https://github.com/eunchurn/components/actions/workflows/npmpublish.yml) [![CodeQL](https://github.com/eunchurn/components/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/eunchurn/components/actions/workflows/codeql-analysis.yml) [![codecov](https://codecov.io/gh/eunchurn/components/branch/main/graph/badge.svg?token=XK02PSQ4Ik)](https://codecov.io/gh/eunchurn/components) ![npm](https://img.shields.io/npm/dw/@eunchurn%2Freact-windrose) [![npm version](https://badge.fury.io/js/@eunchurn%2Freact-windrose.svg)](https://badge.fury.io/js/@eunchurn%2Freact-windrose) [![GitHub version](https://badge.fury.io/gh/eunchurn%2Fcomponents.svg)](https://badge.fury.io/gh/eunchurn%2Fcomponents) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[**Storybook**](https://eunchurn.github.io/react-windrose-chart/)

## Features

![react-windrose-chart](https://raw.githubusercontent.com/eunchurn/components/main/packages/react-windrose/doc/images/react-windrose-chart.png)

- [D3js](https://d3js.org/) (Javascript library for manipulating documents based on data) implemented SVG rendering
- Inspired from [ssmaroju](https://bl.ocks.org/ssmaroju)'s [Wind Rose Plot](https://bl.ocks.org/ssmaroju/96af159c1872c2928a972c441bccaf50)

## Installation

```bash
npm i @eunchurn/react-windrose
```

## Usage

```tsx
import React from "react";
import { Chart } from "@eunchurn/react-windrose";

const data = {
  chartData: [
    {
      angle: "N  ",
      "0-1": 0.5,
      /* ... */
      "6-7": 0.2,
      "7+": 0.1,
      total: 4.9,
    } /* ... */,
  ],
  columns: [
    "angle",
    "0-1",
    /* ... */
    "6-7",
    "7+",
  ],
};

const App = () => (
  <div>
    <Chart
      chartData={data.chartData}
      columns={data.columns}
      responsive
      legendGap={10}
    />
  </div>
);
```

## Props

|      Prop      |         Type          |  Required  | Description                                   | Default |
| :------------: | :-------------------: | :--------: | :-------------------------------------------- | :------ |
| **chartData**  |     `ChartData[]`     | `Required` | Wind Rose Chart data                          |         |
|  **columns**   | `(keyof ChartData)[]` | `Required` | Wind Rose Chart header string array           |         |
|   **width**    |       `number`        |            | container width, default value: `500`         | 500     |
|   **height**   |       `number`        |            | container height, default value: `500`        | 500     |
| **responsive** |       `boolean`       |            | responsive default, value: `false`            | false   |
| **legendGap**  |       `number`        |            | width gap size in px between chart and legend | 10      |

Notice, when `responsive` is true, `width` and `height` would be ignored. chart container's aspect ratio is `1/1` and size width fit as `100%` of parent container

### `chartData` Object array

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

### Data utils

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

- Classifying direction function only is as:

```javascript
import { classifyDir } from "@eunchurn/react-windrose";

const directionCharacter = classifyDir(270);
// Return : 'W'
```

## Real-Time

Real-Time chart data from Anemometer

![realtime-chart](https://raw.githubusercontent.com/eunchurn/components/main/packages/react-windrose/doc/images/realtime.gif)

## License

MIT
