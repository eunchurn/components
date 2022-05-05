[![Unit Test](https://github.com/eunchurn/components/actions/workflows/unit-test.yml/badge.svg)](https://github.com/eunchurn/components/actions/workflows/unit-test.yml) [![Node.js Package](https://github.com/eunchurn/components/actions/workflows/npmpublish.yml/badge.svg)](https://github.com/eunchurn/components/actions/workflows/npmpublish.yml) [![CodeQL](https://github.com/eunchurn/components/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/eunchurn/components/actions/workflows/codeql-analysis.yml) [![codecov](https://codecov.io/gh/eunchurn/components/branch/main/graph/badge.svg?token=XK02PSQ4Ik)](https://codecov.io/gh/eunchurn/components)
# React-Components Monorepo

## Packages

### [`@eunchurn/react-windrose`](https://github.com/eunchurn/components/packages/1399456)
![npm](https://img.shields.io/npm/dw/@eunchurn%2Freact-windrose) [![npm version](https://badge.fury.io/js/@eunchurn%2Freact-windrose.svg)](https://badge.fury.io/js/@eunchurn%2Freact-windrose) [![GitHub version](https://badge.fury.io/gh/eunchurn%2Fcomponents.svg)](https://badge.fury.io/gh/eunchurn%2Fcomponents) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

- [D3js](https://d3js.org/) (Javascript library for manipulating documents based on data) implemented SVG rendering
- Inspired from [ssmaroju](https://bl.ocks.org/ssmaroju)'s [Wind Rose Plot](https://bl.ocks.org/ssmaroju/96af159c1872c2928a972c441bccaf50)

```
yarn install @eunchurn/react-windrose
```

### [`@eunchurn/windrose`](https://github.com/eunchurn/components/packages/1399469)
![npm](https://img.shields.io/npm/dw/@eunchurn%2Fwindrose) [![npm version](https://badge.fury.io/js/@eunchurn%2Fwindrose.svg)](https://badge.fury.io/js/@eunchurn%2Fwindrose) [![GitHub version](https://badge.fury.io/gh/eunchurn%2Fcomponents.svg)](https://badge.fury.io/gh/eunchurn%2Fcomponents) [![npm version](https://badge.fury.io/js/%40eunchurn%2Fwindrose.svg)](https://badge.fury.io/js/%40eunchurn%2Fwindrose) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

- INPUT: Professionals respond to survey of how much they use a K-12 core competancy in each subject
- OUTPUT: Interdisciplinarity Badge (ideally with mouseover tooltips). Wind-rose type graphic, displaying survey response magnitudes for each subject area core competency

```
yarn install @eunchurn/windrose
```

## Development

### lerna install

```
yarn install
yarn bootstrap
```

### CRA environment: `packages/app`

run React App

```
yarn start
```

### Package environment: `packages/{component_name}...`

Component build with watching

```
yarn watch
```

### Add deps.

```
yarn lerna:add {external_package_name} --scope={package-name}
```
