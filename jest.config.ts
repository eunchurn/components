import { GlobalConfigTsJest } from "ts-jest";
import type { InitialOptionsTsJest } from "ts-jest/dist/types";

const globals: GlobalConfigTsJest = {
  "ts-jest": {
    tsconfig: "tsconfig.json",
    compiler: "typescript",
    diagnostics: {
      exclude: ["**"]
    }
  },
};

const jestSetting: InitialOptionsTsJest = {
  roots: ["<rootDir>/packages"],
  globals,
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testEnvironment: "jsdom",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>jest/setupTests.ts"],
  moduleNameMapper: {
    d3: "<rootDir>/node_modules/d3/dist/d3.min.js",
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/",
    "/node_modules/(?!d3|d3-array|internmap|delaunator|robust-predicates)",
  ],
};

export default jestSetting;
