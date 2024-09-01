"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { LineChartProps, LineChartState, DataPoint } from './types';

const LineChart: React.FC<LineChartProps> = ({ data, width, height, id, chartId, timeRange, maxY }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [state, setState] = useState<LineChartState>({ path: null });

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    const x = d3.scaleLinear()
      .range([0, width])
      .domain(timeRange);

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, maxY]);

    const line = d3.line<DataPoint>()
      .x(d => x(d[0]))
      .y(d => y(d[1]));

    if (!state.path) {
      const newPath = svg
        .append('path')
        .datum(data)
        .attr('class', `superChart ${id}`)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('clip-path', `url(#clipPath-${chartId})`)
        .attr('stroke-width', 1.5)
        .attr('d', line);

      setState({ path: newPath });
    } else {
      state.path
        .datum(data)
        .transition()
        .duration(1000)
        .attr('d', line);
    }
  }, [data, width, height, id, chartId, timeRange, maxY, state.path]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <defs>
        <clipPath id={`clipPath-${chartId}`}>
          <rect width={width} height={height} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LineChart;