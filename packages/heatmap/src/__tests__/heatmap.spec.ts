import { describe, it, expect, beforeEach, vi, afterEach, Mock } from "vitest";
import { HeatmapChart, HeatmapChartConfig } from "../heatmap";

type TestData = {
  hit: [number, number[]][];
  err: [number, number[]][];
};

describe("HitmapChart", () => {
  let chart: HeatmapChart;
  let canvas: HTMLCanvasElement;
  let config: HeatmapChartConfig;
  let mockContext: any;
  let mockDragCallback: Mock;

  beforeEach(() => {
    // Mock canvas and its context
    canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 400;
    canvas.id = "testCanvas";
    // document.body.appendChild(canvas);

    // context = canvas.getContext("2d")!;
    // Create a mock context
    mockContext = {
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      fillText: vi.fn(),
      fillRect: vi.fn(),
      setLineDash: vi.fn(),
      strokeRect: vi.fn(),
      scale: vi.fn(),
      fillStyle: "",
      strokeStyle: "",
      lineWidth: 1,
    };
    // Mock the getContext method
    canvas.getContext = vi.fn().mockReturnValue(mockContext);

    // Append the canvas to the document body
    document.body.appendChild(canvas);
    mockDragCallback = vi.fn();
    config = {
      width: 800,
      height: 400,
      xAxis: {
        timeRange: 10 * 60 * 1000,
        interval: 5000,
      },
      yAxis: {
        maxValue: 10000,
      },
      theme: "light",
      dragCallback: mockDragCallback,
    };
    chart = new HeatmapChart("testCanvas", config);
    // Set up the chart's internal state for testing
    (chart as any).endTime = 1625097610000; // Example end time
    (chart as any).xTimeRange = 10 * 60 * 1000; // 10 minutes
    (chart as any).yValueMax = 10000;
    (chart as any).chartAttr = { x: 40, y: 20, w: 720, h: 360 };
  });

  afterEach(() => {
    document.body.removeChild(canvas);
    vi.restoreAllMocks();
  });

  it("should initialize with correct configuration", () => {
    expect(chart).toBeDefined();
    expect((chart as any).config).toEqual(expect.objectContaining(config));
  });

  it("should load data correctly", () => {
    const testData: TestData = {
      hit: [
        [1625097600000, [1, 2, 3, 4, 5]],
        [1625097605000, [2, 3, 4, 5, 6]],
      ],
      err: [
        [1625097600000, [0, 1, 0, 1, 0]],
        [1625097605000, [1, 0, 1, 0, 1]],
      ],
    };

    chart.loadData(testData);

    expect((chart as any).data.size).toBe(2);
    expect((chart as any).data.get(1625097600000)).toEqual({
      hit: expect.arrayContaining([1, 2, 3, 4, 5]),
      err: expect.arrayContaining([0, 1, 0, 1, 0]),
    });
  });

  it("should update data correctly", () => {
    const initialData: TestData = {
      hit: [[1625097600000, [1, 2, 3, 4, 5]]],
      err: [[1625097600000, [0, 1, 0, 1, 0]]],
    };

    const updateData: TestData = {
      hit: [[1625097600000, [2, 3, 4, 5, 6]]],
      err: [[1625097600000, [1, 1, 1, 1, 1]]],
    };

    chart.loadData(initialData);
    chart.updateData(updateData);

    expect((chart as any).data.size).toBe(1);
    expect((chart as any).data.get(1625097600000)).toEqual({
      hit: expect.arrayContaining([2, 3, 4, 5, 6]),
      err: expect.arrayContaining([1, 1, 1, 1, 1]),
    });
  });

  it("should change Y-axis scale", () => {
    const initialYMax = (chart as any).yValueMax;

    chart.changeYAxis("up");
    expect((chart as any).yValueMax).toBe(initialYMax * 2);

    chart.changeYAxis("down");
    expect((chart as any).yValueMax).toBe(initialYMax);
  });

  it("should change theme", () => {
    chart.changeTheme("bk");
    expect((chart as any).theme).toBe("bk");
  });

  it("should handle mouse events correctly", () => {
    // Instead of dispatching events, we'll call the event handlers directly
    const mousedownHandler = (chart as any).canvas.onmousedown;
    const mousemoveListener = (chart as any).moveListener;
    const mouseupListener = (chart as any).upListener;

    // Simulate mousedown
    mousedownHandler({ clientX: 100, clientY: 100, target: canvas });
    expect((chart as any).mouse.down).toBe(true);
    expect((chart as any).mouse.drag).toBe(true);

    // Simulate mousemove
    mousemoveListener({ clientX: 150, clientY: 150 });
    expect((chart as any).mouse.x2).toBe(150);
    expect((chart as any).mouse.y2).toBe(150);

    // Simulate mouseup
    mouseupListener({});
    expect((chart as any).mouse.down).toBe(false);
    expect((chart as any).mouse.drag).toBe(false);
  });

  it("should draw axes correctly", () => {
    (chart as any).drawAxes();
    expect(mockContext.beginPath).toHaveBeenCalled();
    expect(mockContext.moveTo).toHaveBeenCalled();
    expect(mockContext.lineTo).toHaveBeenCalled();
    expect(mockContext.stroke).toHaveBeenCalled();
    expect(mockContext.fillText).toHaveBeenCalled();
  });

  it("should draw blocks correctly", () => {
    const testData: TestData = {
      hit: [[1625097600000, [1, 2, 3, 4, 5]]],
      err: [[1625097600000, [0, 1, 0, 1, 0]]],
    };
    chart.loadData(testData);
    (chart as any).drawBlocks();
    expect(mockContext.fillRect).toHaveBeenCalled();
  });

  it("should handle mousePosAdjust correctly", () => {
    const pos = { x1: 100, y1: 200, x2: 50, y2: 150 };
    const adjustedPos = (chart as any).mousePosAdjust(pos);
    expect(adjustedPos).toEqual({ x1: 50, y1: 150, x2: 100, y2: 200 });
  });

  it("should handle range function correctly", () => {
    expect((chart as any).range(5, 0, 10)).toBe(5);
    expect((chart as any).range(-5, 0, 10)).toBe(0);
    expect((chart as any).range(15, 0, 10)).toBe(10);
  });

  it("should handle order function correctly", () => {
    expect((chart as any).order(5, 10)).toEqual([5, 10]);
    expect((chart as any).order(10, 5)).toEqual([5, 10]);
  });

  it("should handle conv40 function correctly", () => {
    const input = Array(120).fill(1);
    const result = (chart as any).conv40(input, 5000);
    expect(result.length).toBe(40);
    expect(result[39]).toBe(81); // 1 + 80 (from indices 40-119)
  });

  it("should handle getColor function correctly", () => {
    expect((chart as any).getColor("hit", 0)).toBe("#2196f3");
    expect((chart as any).getColor("hit", 200)).toBe("#1565c0");
    expect((chart as any).getColor("hit", 400)).toBe("#1a237e");
    expect((chart as any).getColor("err", 0)).toBe("#f9a825");
    expect((chart as any).getColor("err", 4)).toBe("#ef6c00");
    expect((chart as any).getColor("err", 7)).toBe("#d50000");
  });

  it("should handle handleColor function correctly", () => {
    expect((chart as any).handleColor("LEGEND")).toBe("#000000");
    (chart as any).theme = "dark";
    expect((chart as any).handleColor("LEGEND")).toBe("#ffffff");
  });

  it("should handle getTimeFormat function correctly", () => {
    const hourFormat = (chart as any).getTimeFormat(60 * 60 * 1000);
    const dayFormat = (chart as any).getTimeFormat(25 * 60 * 60 * 1000);
    const date = new Date(2023, 5, 15, 14, 30);
    expect(hourFormat(date)).toBe("14:30");
    expect(dayFormat(date)).toBe("2023-06-15");
  });

  it("should handle pad function correctly", () => {
    expect((chart as any).pad(5, 2)).toBe("05");
    expect((chart as any).pad(10, 2)).toBe("10");
    expect((chart as any).pad(5, 3)).toBe("005");
  });

  it("should handle mGetIndex function correctly", () => {
    expect((chart as any).mGetIndex(2500, 5000)).toBe(20);
    expect((chart as any).mGetIndex(7500, 10000)).toBe(30);
    expect((chart as any).mGetIndex(50000, 40000)).toBe(39);
  });

  it("should handle mGetTime function correctly", () => {
    expect((chart as any).mGetTime(20, 5000)).toBe(2500);
    expect((chart as any).mGetTime(30, 10000)).toBe(7500);
    expect((chart as any).mGetTime(40, 40000)).toBe(40000);
  });

  it("should handle mGetTimeStep function correctly", () => {
    expect((chart as any).mGetTimeStep(5000)).toBe(125);
    expect((chart as any).mGetTimeStep(10000)).toBe(250);
    expect((chart as any).mGetTimeStep(100000)).toBe(2000);
  });

  it("should handle mergeDataset function correctly", () => {
    const ori = [1, 2, 3, 4, 5];
    const mer = [2, 3, 4, 5, 6];
    const result = (chart as any).mergeDataset(ori, mer, 5);
    expect(result).toEqual([2, 3, 4, 5, 6]);
  });

  it("should handle select function correctly with large enough selection", () => {
    const endTime = 1625097610000; // Example end time
    const startTime = endTime - 10 * 60 * 1000; // 10 minutes before end time
    const testData = new Map();
    for (let time = startTime; time <= endTime; time += 5000) {
      // Every 5 seconds
      testData.set(time, {
        hit: Array(120).fill(10),
        err: Array(120).fill(5),
      });
    }
    (chart as any).data = testData;
    (chart as any).endTime = endTime;

    // Implement a more realistic conv40 method
    (chart as any).conv40 = vi.fn().mockImplementation((arr, max) => {
      const result = Array(40).fill(0);
      for (let i = 0; i < 40; i++) {
        result[i] = arr.slice(i * 3, (i + 1) * 3).reduce((a, b) => a + b, 0);
      }
      return result;
    });

    // Call select with values that should be within the data range and large enough
    (chart as any).select({
      x1: 50,
      y1: 50,
      x2: 150,
      y2: 150,
    });

    expect(mockDragCallback).toHaveBeenCalled();
    expect(mockDragCallback).toHaveBeenCalledWith(
      expect.any(Array),
      expect.any(Array),
      10000
    );
  });

  it("should not call dragCallback when selection is too small", () => {
    (chart as any).select({
      x1: 50,
      y1: 50,
      x2: 52,
      y2: 52,
    });

    expect(mockDragCallback).not.toHaveBeenCalled();
  });

  it("should not call dragCallback when hit and err are zero", () => {
    const testData = new Map([
      [
        1625097600000,
        {
          hit: Array(120).fill(0),
          err: Array(120).fill(0),
        },
      ],
    ]);
    (chart as any).data = testData;

    (chart as any).select({
      x1: 50,
      y1: 50,
      x2: 100,
      y2: 100,
    });

    expect(mockDragCallback).not.toHaveBeenCalled();
  });
  it("should correctly adjust mouse position", () => {
    const input = { x1: 100, y1: 200, x2: 50, y2: 150 };
    const result = (chart as any).mousePosAdjust(input);
    expect(result).toEqual({ x1: 50, y1: 150, x2: 100, y2: 200 });
  });

  it("should not adjust mouse position when already in correct order", () => {
    const input = { x1: 50, y1: 150, x2: 100, y2: 200 };
    const result = (chart as any).mousePosAdjust(input);
    expect(result).toEqual(input);
  });
});
