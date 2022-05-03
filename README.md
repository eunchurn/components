[![Unit Test](https://github.com/eunchurn/components/actions/workflows/unit-test.yml/badge.svg)](https://github.com/eunchurn/components/actions/workflows/unit-test.yml) [![Node.js Package](https://github.com/eunchurn/components/actions/workflows/npmpublish.yml/badge.svg)](https://github.com/eunchurn/components/actions/workflows/npmpublish.yml) [![CodeQL](https://github.com/eunchurn/components/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/eunchurn/components/actions/workflows/codeql-analysis.yml) [![codecov](https://codecov.io/gh/eunchurn/components/branch/master/graph/badge.svg?token=XK02PSQ4Ik)](https://codecov.io/gh/eunchurn/components)
# React-Components Monorepo

## Usage
### List

- `@eunchurn/react-windrose`
- `@eunchurn/windrose`


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

### Deployment

- Major deployment: `yarn lerna:publish major`
- Minor deployment: `yarn lerna:publish minor`
- Patch deployment: `yarn lerna:publish patch`
