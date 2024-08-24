import { describe, it, expect, vi } from "vitest";
// import "jest-styled-components";
import React from "react";
import { isPortal, isFragment } from "react-is";
import { render } from "@testing-library/react";
import { Chart } from "../WindRoseChart.component";


window.ResizeObserver =
  window.ResizeObserver ||
  vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }));

describe("component <Chart />", () => {
  it("should render correctly", () => {
    const element = render(<Chart />);
    expect(element.container).toMatchSnapshot();
  });

  it("is not type Portal", () => {
    expect(isPortal(<Chart />)).toBeFalsy();
  });

  it("is not type Fragment", () => {
    expect(isFragment(<Chart />)).toBeFalsy();
  });
});
