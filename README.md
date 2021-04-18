# React-Components Monorepo

## Usage
### List

- `@eunchurn/react-windrose-chart`
- `@eunchurn/windrose-chart`


## 개발환경

### lerna 환경 설치

```
yarn install
yarn bootstrap
```

### CRA 환경(개발 테스트): `packages/app`

React App 실행

```
yarn start
```

### Package 환경(컴포넌트): `packages/{component_name}...`

Component 빌드

```
yarn watch
```

### 의존성 모듈 추가

```
yarn lerna:add {external_package_name} --scope={package-name}
```

### 배포

- Major 버전을 올리면서 배포: `yarn lerna:publish major`
- Minor 버전을 올리면서 배포: `yarn lerna:publish minor`
- Patch 버전을 올리면서 배포: `yarn lerna:publish patch`
