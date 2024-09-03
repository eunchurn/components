import { colors } from "./types";
import { HeatmapChartConfig, DragCallback } from "./types";

interface HeatmapDataPoint {
  hit: number[];
  err: number[];
}

class HeatmapChart {
  private config: HeatmapChartConfig;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private data: Map<number, HeatmapDataPoint> = new Map();
  private endTime: number = Date.now();
  private xTimeRange: number = 10 * 60 * 1000; // Default to 10 minutes
  private yValueMax: number = 10000; // Default max value
  private chartAttr: { x: number; y: number; w: number; h: number } = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  };
  private mouse: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    down: boolean;
    drag: boolean;
  } = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    down: false,
    drag: false,
  };
  private dragCallback: DragCallback | undefined;
  private remainDrag: boolean;
  private staticDraw: boolean = false;
  private timer: number | null = null;
  private moveListener: (e: MouseEvent) => void;
  private upListener: (e: MouseEvent) => void;
  private theme: string;

  constructor(id: string, config: HeatmapChartConfig) {
    this.config = { ...defaultConfig, ...config };
    const canvas = document.getElementById(id);
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error(`Element with id '${id}' is not a canvas element`);
    }
    this.canvas = canvas;
    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("Unable to get 2D context from canvas");
    }
    this.ctx = context;
    this.dragCallback = config.dragCallback;
    this.remainDrag = config.remainDrag || false;
    this.theme = config.theme || "light";
    this.moveListener = this.mouseMove.bind(this);
    this.upListener = this.mouseUp.bind(this);
    this.initParams();
    this.initCanvas();
  }

  private initParams(): void {
    // Initialize parameters based on config
    this.yValueMax = this.config.yAxis?.maxValue ?? this.yValueMax;
    this.xTimeRange = this.config.xAxis?.timeRange ?? this.xTimeRange;
    this.endTime = Date.now(); // Always set to current time when initializing
  }

  private initCanvas(): void {
    this.sizeCanvas();
    this.initCanvasListener();
    // Add event listeners here
  }

  private sizeCanvas(): void {
    const { width, height } = this.config;
    const ratio = window.devicePixelRatio || 1;
    this.canvas.width = (width || this.canvas.clientWidth) * ratio;
    this.canvas.height = (height || this.canvas.clientHeight) * ratio;
    this.canvas.style.width = `${width || this.canvas.clientWidth}px`;
    this.canvas.style.height = `${height || this.canvas.clientHeight}px`;
    this.ctx.scale(ratio, ratio);
  }

  public loadData(dataset: {
    hit: [number, number[]][];
    err: [number, number[]][];
  }): void {
    this.data.clear();
    let latestTime = 0;

    (["hit", "err"] as const).forEach((type) => {
      dataset[type].forEach(([time, values]) => {
        const existingData = this.data.get(time) || {
          hit: Array(120).fill(0),
          err: Array(120).fill(0),
        };
        existingData[type] = values;
        this.data.set(time, existingData);

        // 가장 최근 시간 업데이트
        if (time > latestTime) {
          latestTime = time;
        }
      });
    });

    // endTime 업데이트
    if (latestTime > 0) {
      this.endTime = latestTime;
    } else {
      this.endTime = Date.now();
    }

    this.draw();
  }

  private draw(): void {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Calculate chart dimensions
    this.calculateChartDimensions();

    // Draw axes
    this.drawAxes();

    // Draw heatmap blocks
    this.drawBlocks();
    this.drawMouseEvent();
    // if (this.staticDraw) {
    //   this.drawStaticMouseEvent();
    // }
  }

  private mergeDataset(ori: number[], mer: number[], cnt: number): number[] {
    const oriClone = ori.slice(0);
    if (Array.isArray(mer)) {
      mer.forEach((m, idx) => {
        oriClone[idx] = Math.max(oriClone[idx], m);
      });
    }
    return oriClone;
  }
  public updateData(dataset: {
    hit: [number, number[]][];
    err: [number, number[]][];
  }): void {
    let latestTime = 0;

    (["hit", "err"] as const).forEach((type) => {
      dataset[type].forEach(([time, values]) => {
        const existingData = this.data.get(time) || {
          hit: Array(120).fill(0),
          err: Array(120).fill(0),
        };
        existingData[type] = this.mergeDataset(existingData[type], values, 120);
        this.data.set(time, existingData);

        if (time > latestTime) {
          latestTime = time;
        }
      });
    });

    if (latestTime > 0) {
      this.endTime = latestTime;
    }

    this.draw();
  }
  private calculateChartDimensions(): void {
    const { width, height } = this.canvas;
    this.chartAttr = {
      x: 40,
      y: 20,
      w: width - 60,
      h: height - 40,
    };
  }

  private drawAxes(): void {
    // Draw X and Y axes
    this.ctx.beginPath();
    this.ctx.moveTo(this.chartAttr.x, this.chartAttr.y);
    this.ctx.lineTo(this.chartAttr.x, this.chartAttr.y + this.chartAttr.h);
    this.ctx.lineTo(
      this.chartAttr.x + this.chartAttr.w,
      this.chartAttr.y + this.chartAttr.h
    );
    this.ctx.stroke();

    // Draw Y-axis labels
    for (let i = 0; i <= 5; i++) {
      const y =
        this.chartAttr.y + this.chartAttr.h - (i / 5) * this.chartAttr.h;
      this.ctx.fillStyle = "#000000";
      this.ctx.fillText(String((this.yValueMax * i) / 5), 5, y);
    }

    // Draw X-axis labels
    const timeFormat = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    for (let i = 0; i <= 5; i++) {
      const x = this.chartAttr.x + (i / 5) * this.chartAttr.w;
      const time = new Date(this.endTime - (1 - i / 5) * this.xTimeRange);
      this.ctx.fillStyle = "#000000";
      this.ctx.fillText(
        timeFormat.format(time),
        x,
        this.chartAttr.y + this.chartAttr.h + 15
      );
    }
  }
  public changeYAxis(direction: "up" | "down"): void {
    if (direction === "up") {
      if (this.yValueMax < 80000) {
        this.yValueMax *= 2;
        this.draw();
      }
    } else if (direction === "down") {
      if (this.yValueMax > 5000) {
        this.yValueMax /= 2;
        this.draw();
      }
    }

    if (this.config.cookieId) {
      // Implement cookie setting logic here
    }
  }

  public changeTheme(theme: string): void {
    this.theme = theme;
    this.draw();
  }
  private drawBlocks(): void {
    const blockWidth =
      this.chartAttr.w /
      (this.xTimeRange / (this.config.xAxis?.interval || 5000));
    const blockHeight = this.chartAttr.h / 40;

    this.data.forEach((value, time) => {
      const x =
        this.chartAttr.x +
        ((time - (this.endTime - this.xTimeRange)) / this.xTimeRange) *
          this.chartAttr.w;

      (["hit", "err"] as const).forEach((type) => {
        value[type].forEach((count, i) => {
          if (count > 0) {
            const y =
              this.chartAttr.y + this.chartAttr.h - (i + 1) * blockHeight;
            this.ctx.fillStyle = this.getColor(type, count);
            this.ctx.fillRect(x, y, blockWidth, blockHeight);
          }
        });
      });
    });
  }
  private drawRect(
    color: string,
    x: number,
    y: number,
    w: number,
    h: number
  ): void {
    this.ctx.fillStyle = color;
    let widthThickCut = 0.5;
    let heightThickCut = 0.5;

    if (w <= 3) widthThickCut = -2.0;
    else if (w <= 5) widthThickCut = -0.8;
    else if (w < 10) widthThickCut = 0.1;

    if (h <= 3) heightThickCut = -0.4;
    else if (h <= 5) heightThickCut = -0.1;
    else if (h < 10) heightThickCut = 0.1;

    if (w < 2) w = 2;
    if (h < 2) h = 2;

    this.ctx.fillRect(x, y, w - widthThickCut, h - heightThickCut);
  }

  private getTimeFormat(unit: number): (time: Date) => string {
    if (unit <= 60 * 60 * 1000) {
      return (time: Date) => {
        const hh = this.pad(time.getHours(), 2);
        const mm = this.pad(time.getMinutes(), 2);
        return `${hh}:${mm}`;
      };
    }
    if (unit <= 24 * 60 * 60 * 1000) {
      return (time: Date) => {
        const hh = this.pad(time.getHours(), 2);
        const mm = this.pad(time.getMinutes(), 2);
        return `${hh}:${mm}`;
      };
    }
    return (time: Date) => {
      const yyyy = time.getFullYear().toString();
      const MM = this.pad(time.getMonth() + 1, 2);
      const dd = this.pad(time.getDate(), 2);
      return `${yyyy}-${MM}-${dd}`;
    };
  }

  private pad(number: number, length: number): string {
    let str = "" + number;
    while (str.length < length) {
      str = "0" + str;
    }
    return str;
  }

  private mGetIndex(time: number, max: number): number {
    if (time >= max) {
      return 39;
    }
    switch (max) {
      case 5000:
        return (time / 125) | 0;
      case 10000:
        return (time / 250) | 0;
      case 20000:
        return (time / 500) | 0;
      case 40000:
        return (time / 1000) | 0;
      case 80000:
        return (time / 2000) | 0;
    }
    return 39;
  }

  private mGetTime(idx: number, max: number): number {
    if (idx >= 39) {
      return max;
    }
    switch (max) {
      case 5000:
        return idx * 125;
      case 10000:
        return idx * 250;
      case 20000:
        return idx * 500;
      case 40000:
        return idx * 1000;
      case 80000:
        return idx * 2000;
    }
    return max;
  }

  private mGetTimeStep(max: number): number {
    switch (max) {
      case 5000:
        return 125;
      case 10000:
        return 250;
      case 20000:
        return 500;
      case 40000:
        return 1000;
      case 80000:
        return 2000;
    }
    return 2000;
  }
  private getColor(type: "hit" | "err", count: number): string {
    const levels = this.config.countLevel?.[type] || [0, 50, 100];
    const colors = this.config.color?.[type] || [
      "#2196f3",
      "#1565c0",
      "#1a237e",
    ];

    for (let i = levels.length - 1; i >= 0; i--) {
      if (count >= levels[i]) return colors[i];
    }
    return colors[0];
  }

  private handleColor(type: string): string {
    const prefix = "COLOR_";
    const suffix = "_" + this.theme.toUpperCase();
    return colors[prefix + type.toUpperCase() + suffix];
  }
  private select(p: { x1: number; y1: number; x2: number; y2: number }): void {
    if (Math.abs(p.x2 - p.x1) < 3 || Math.abs(p.y2 - p.y1) < 3) return;

    p = this.mousePosAdjust(p);

    const etime = this.endTime;
    const stime = etime - this.xTimeRange;
    const yValueMax = this.yValueMax;
    const c = this.chartAttr;

    let xTime1 = this.range(
      stime + (this.xTimeRange * (p.x1 - c.x)) / c.w,
      stime,
      etime
    );
    let xTime2 = this.range(
      stime + (this.xTimeRange * (p.x2 - c.x)) / c.w,
      stime,
      etime
    );
    let yVal1 =
      this.range(yValueMax * ((c.h + c.y - p.y1) / c.h), 0, yValueMax) | 0;
    let yVal2 =
      this.range(yValueMax * ((c.h + c.y - p.y2) / c.h), 0, yValueMax) | 0;

    [xTime1, xTime2] = this.order(xTime1, xTime2);
    [yVal1, yVal2] = this.order(yVal1, yVal2);

    let hit = 0;
    let err = 0;

    this.data.forEach((value, time) => {
      if (time < xTime1 || xTime2 < time) return;

      const hit40 = this.conv40(value.hit, this.yValueMax);
      const err40 = this.conv40(value.err, this.yValueMax);

      for (let i = 0; i < 40; i++) {
        if (hit40[i] === 0 && err40[i] === 0) continue;
        const v1 = (yValueMax * i) / 40;
        const v2 = (yValueMax * (i + 1)) / 40;
        if (yVal1 <= v2 && v1 <= yVal2) {
          hit += hit40[i];
          err += err40[i];
        }
      }
    });

    const xValue = [xTime1, xTime2];
    const yValue = [yVal1, yVal2];

    if (this.dragCallback && (hit !== 0 || err !== 0)) {
      this.dragCallback(xValue, yValue, this.yValueMax);
    }
  }

  private mousePosAdjust(pos: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }): { x1: number; y1: number; x2: number; y2: number } {
    if (pos.x1 > pos.x2) {
      [pos.x1, pos.x2] = [pos.x2, pos.x1];
    }
    if (pos.y1 > pos.y2) {
      [pos.y1, pos.y2] = [pos.y2, pos.y1];
    }
    return pos;
  }

  private mouseMove(e: MouseEvent): void {
    if (this.mouse.drag === true) {
      const clientRect = this.canvas.getBoundingClientRect();
      this.mouse.x2 = e.clientX - clientRect.left;
      this.mouse.y2 = e.clientY - clientRect.top;
      this.draw();
    }
  }

  private mouseUp(e: MouseEvent): void {
    this.mouse.down = false;
    this.mouse.drag = false;
    this.select(this.mouse);

    if (!this.remainDrag) {
      this.draw();
    } else if (
      Math.abs(this.mouse.x2 - this.mouse.x1) < 3 ||
      Math.abs(this.mouse.y2 - this.mouse.y1) < 3
    ) {
      this.draw();
    }

    this.mouse.x1 = 0;
    this.mouse.y1 = 0;
    document.removeEventListener("mousemove", this.moveListener, true);
    document.removeEventListener("mouseup", this.upListener, true);
  }

  private initCanvasListener(): void {
    this.canvas.onmousedown = (e: MouseEvent) => {
      this.staticDraw = false;

      if (!this.mouse.drag) {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        this.mouse.x1 = this.mouse.x2 = e.clientX - rect.left;
        this.mouse.y1 = this.mouse.y2 = e.clientY - rect.top;
        this.moveListener = this.mouseMove.bind(this);
        this.upListener = this.mouseUp.bind(this);
        document.addEventListener("mousemove", this.moveListener, true);
        document.addEventListener("mouseup", this.upListener, true);
      }

      this.mouse.down = true;
      this.mouse.drag = true;
    };

    this.canvas.onmouseover = (e: MouseEvent) => {
      this.canvas.style.cursor = "crosshair";
      if (this.mouse.drag) {
        this.mouse.down = true;
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
    };
  }

  private drawMouseEvent(): void {
    if (this.mouse && this.mouse.drag) {
      const p = this.mouse;
      const width_start = this.chartAttr.x - 5;
      const height_start = this.chartAttr.y - 5;
      const width_end = this.chartAttr.x + this.chartAttr.w + 5;
      const height_end = this.chartAttr.y + this.chartAttr.h + 5;

      p.x1 = this.range(p.x1, width_start, width_end);
      p.x2 = this.range(p.x2, width_start, width_end);
      p.y1 = this.range(p.y1, height_start, height_end);
      p.y2 = this.range(p.y2, height_start, height_end);

      this.ctx.setLineDash([5, 1]);
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = this.handleColor("range");
      this.ctx.strokeRect(p.x1, p.y1, p.x2 - p.x1, p.y2 - p.y1);
    }
  }

  // Helper methods that were previously in HeatmapApi
  private range(v: number, min: number, max: number): number {
    if (v < min) return min;
    if (v > max) return max;
    return v;
  }

  private order(v1: number, v2: number): [number, number] {
    return v1 <= v2 ? [v1, v2] : [v2, v1];
  }

  private conv40(hit: number[], max: number): number[] {
    const h2 = new Array(40).fill(0);

    switch (max) {
      case 120:
        for (let i = 0; i < 120; i++) {
          h2[Math.floor(i / 3)] += hit[i] || 0;
        }

        break;

      case 5000:
        for (let i = 0; i < 40; i++) {
          h2[i] += hit[i] || 0;
        }

        for (let i = 40; i < 120; i++) {
          h2[39] += hit[i] || 0;
        }

        break;

      case 10000:
        for (let i = 0; i < 40; i++) {
          h2[(i / 2) | 0] += hit[i] || 0;
        }

        for (let i = 40; i < 60; i++) {
          h2[i - 20] += hit[i] || 0;
        }

        for (let i = 60; i < 120; i++) {
          h2[39] += hit[i] || 0;
        }

        break;

      case 20000:
        for (let i = 0; i < 40; i++) {
          h2[(i / 4) | 0] += hit[i] || 0;
        }

        for (let i = 40; i < 60; i++) {
          h2[((i - 20) / 2) | 0] += hit[i] || 0;
        }

        for (let i = 60; i < 80; i++) {
          h2[i - 40] += hit[i] || 0;
        }

        for (let i = 80; i < 120; i++) {
          h2[39] += hit[i] || 0;
        }

        break;

      case 40000:
        for (let i = 0; i < 40; i++) {
          h2[(i / 8) | 0] += hit[i] || 0;
        }

        for (let i = 40; i < 60; i++) {
          h2[((i - 20) / 4) | 0] += hit[i] || 0;
        }

        for (let i = 60; i < 80; i++) {
          h2[((i - 40) / 2) | 0] += hit[i] || 0;
        }

        for (let i = 80; i < 100; i++) {
          h2[(i - 60) | 0] += hit[i] || 0;
        }

        for (let i = 100; i < 120; i++) {
          h2[39] += hit[i] || 0;
        }

        break;

      case 80000:
        for (let i = 0; i < 40; i++) {
          h2[(i / 16) | 0] += hit[i] || 0;
        }

        for (let i = 40; i < 60; i++) {
          h2[((i - 20) / 8) | 0] += hit[i] || 0;
        }

        for (let i = 60; i < 80; i++) {
          h2[((i - 40) / 4) | 0] += hit[i] || 0;
        }

        for (let i = 80; i < 100; i++) {
          h2[((i - 60) / 2) | 0] += hit[i] || 0;
        }

        for (let i = 100; i < 120; i++) {
          h2[i - 80] += hit[i] || 0;
        }

        break;
      default:
        for (let i = 0; i < 40; i++) {
          h2[i] = hit[i];
        }
    }

    return h2;
  }
}

const defaultConfig: HeatmapChartConfig = {
  xAxis: {
    timeRange: 10 * 60 * 1000,
    interval: 5000,
  },
  yAxis: {
    maxValue: 10000,
    tickFormat: (d: number) => d / 1000,
    plots: 6,
    hasLine: true,
  },
  countLevel: {
    hit: [0, 150, 300],
    err: [0, 3, 6],
  },
  color: {
    hit: ["#2196f3", "#1565c0", "#1a237e"],
    err: ["#f9a825", "#ef6c00", "#d50000"],
  },
  theme: "light",
};

export { HeatmapChart, type HeatmapChartConfig };

export default HeatmapChart;
