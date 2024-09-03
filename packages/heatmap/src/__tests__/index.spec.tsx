import React from "react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HeatmapChart, HeatmapData } from "../index";
import { HeatmapChart as Heatmap } from "../heatmap";

// Mock the Heatmap class
vi.mock("../heatmap", () => {
  const mockHeatmapInstance = {
    loadData: vi.fn(),
    changeYAxis: vi.fn(),
    changeTheme: vi.fn(),
  };
  return {
    HeatmapChart: vi.fn(() => mockHeatmapInstance),
  };
});

describe("HeatmapChart", () => {
  const mockData: HeatmapData = {
    hit: [
      [1000, [1, 2, 3]],
      [2000, [4, 5, 6]],
    ],
    err: [
      [1000, [0, 1, 0]],
      [2000, [1, 0, 1]],
    ],
  };

  const defaultProps = {
    width: 500,
    height: 300,
    data: mockData,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<HeatmapChart {...defaultProps} />);
    const canvasElement = screen.getByRole("img", { hidden: true });
    expect(canvasElement).toBeInTheDocument();
    expect(canvasElement.tagName.toLowerCase()).toBe("canvas");
    expect(canvasElement).toHaveAttribute("id", "heatmapCanvas");
  });

  it("creates a Heatmap instance with correct config", () => {
    render(<HeatmapChart {...defaultProps} />);
    expect(Heatmap).toHaveBeenCalledWith(
      "heatmapCanvas",
      expect.objectContaining({
        width: 500,
        height: 300,
      })
    );
  });

  it("loads data into Heatmap", async () => {
    await act(async () => {
      render(<HeatmapChart {...defaultProps} />);
    });
    const mockInstance = (Heatmap as Mock).mock.results[0].value;
    expect(mockInstance.loadData).toHaveBeenCalledWith(mockData);
  });

  // it("calls changeYAxis when onChangeYAxis prop is provided", async () => {
  //   const onChangeYAxis = vi.fn();
  //   await act(async () => {
  //     render(<HeatmapChart {...defaultProps} onChangeYAxis={onChangeYAxis} />);
  //   });
  //   const mockInstance = (Heatmap as Mock).mock.results[0].value;

  //   act(() => {
  //     onChangeYAxis("up");
  //   });

  //   expect(mockInstance.changeYAxis).toHaveBeenCalledWith("up");
  // });

  // it("calls changeTheme when onChangeTheme prop is provided", async () => {
  //   const onChangeTheme = vi.fn();
  //   await act(async () => {
  //     render(<HeatmapChart {...defaultProps} onChangeTheme={onChangeTheme} />);
  //   });
  //   const mockInstance = (Heatmap as Mock).mock.results[0].value;

  //   act(() => {
  //     onChangeTheme("dark");
  //   });

  //   expect(mockInstance.changeTheme).toHaveBeenCalledWith("dark");
  // });

  it("updates Heatmap when data changes", async () => {
    const { rerender } = render(<HeatmapChart {...defaultProps} />);
    const newData: HeatmapData = {
      hit: [[3000, [7, 8, 9]]],
      err: [[3000, [1, 1, 1]]],
    };

    await act(async () => {
      rerender(<HeatmapChart {...defaultProps} data={newData} />);
    });

    const mockInstance = (Heatmap as jest.Mock).mock.results[0].value;
    expect(mockInstance.loadData).toHaveBeenCalledWith(newData);
  });
});