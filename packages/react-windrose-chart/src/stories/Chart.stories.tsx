import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Chart } from "../windrose";
import { calculateWindRose } from "../util";
import { ApiData } from "./api-types";
import { data } from "./data";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Chart> = {
  title: "Windrose",
  component: Chart,
  render: (args, { loaded: { chartData } }) => {
    return (
      <Chart
        {...args}
        chartData={args.chartData ? args.chartData : chartData}
      />
    );
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Static: Story = {
  args: {
    chartData: data.chartData,
  },
};

export const FromAPI: Story = {
  loaders: [
    async () => ({
      chartData: await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=wind_speed_10m,wind_direction_10m"
      )
        .then((res) => res.json() as Promise<ApiData>)
        .then((data) => {
          const {
            hourly: { wind_direction_10m, wind_speed_10m },
          } = data;
          return calculateWindRose({
            direction: wind_direction_10m,
            speed: wind_speed_10m.map((speed) => speed / 3.6), // km/h => m/s
          });
        }),
    }),
  ],
};
