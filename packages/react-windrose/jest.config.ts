import sharedConfig from "@eunchurn/jestconfig";

const config = {
  ...sharedConfig,
  testEnvironment: "jest-environment-jsdom",
};

module.exports = config;
