"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { ChartProps, ChartState, ChartDataPoint } from './types';

const InfinityChart: React.FC<ChartProps> = ({ width, height, margin, data, config }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [state, setState] = useState<ChartState>({
    focusedIndex: [0, data.length - 1]
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const x = d3.scalePoint()
      .domain(data.map(d => d[config.X_AXIS_KEY] as string))
      .range([0, width - margin.left - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[config.LEFT_AXIS_KEY] as number) || 0])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw X axis
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Draw Y axis
    g.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y));

    // Draw bars
    const barWidth = Math.min(20, (width - margin.left - margin.right) / data.length - 1);
    const bars = g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => (x(d[config.X_AXIS_KEY] as string) || 0) - barWidth / 2)
      .attr("width", barWidth)
      .attr("y", d => y(d[config.LEFT_AXIS_KEY] as number))
      .attr("height", d => height - margin.top - margin.bottom - y(d[config.LEFT_AXIS_KEY] as number))
      .attr("fill", "steelblue");

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 10])
      .extent([[0, 0], [width, height]])
      .on("zoom", zoomed);

    svg.call(zoom);

    function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, unknown>) {
      // @ts-ignore
      const newX = event.transform.rescaleX(x);
      g.selectAll(".bar")
      // @ts-ignore
        .attr("x", d => (newX(d[config.X_AXIS_KEY] as string) || 0) - barWidth / 2)
        .attr("width", barWidth);
        // @ts-ignore
      g.select(".x-axis").call(d3.axisBottom(newX));
    }

  }, [data, width, height, margin, config]);

  return (
    <svg ref={svgRef} width={width} height={height}></svg>
  );
};

export default InfinityChart;