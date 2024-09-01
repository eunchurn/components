"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { ChartData, Node, Link } from './types';

const COLORS = [
  '#329af0', '#845ef7', '#00b7d0', '#00e700', '#72c3fc',
  '#ffb500', '#b5bdc4', '#0ee5b1', '#ff8400', '#06c606',
  '#bc83ff', '#748ffc',
];

interface RelationChartProps {
  data: ChartData;
  width: number;
  height: number;
}

export const RelationChart: React.FC<RelationChartProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ show: boolean; content: string; x: number; y: number }>({
    show: false,
    content: '',
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();  // Clear previous content

    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink<Node, Link>(data.links).id(d => d.id).distance(300))
      .force("charge", d3.forceManyBody().strength(-120))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .selectAll("line")
      .data(data.links)
      .enter().append("line")
      .attr("stroke", "#d3d3d3")
      .attr("stroke-width", 1);

    const node = svg.append("g")
      .selectAll("g")
      .data(data.nodes)
      .enter().append("g")
      .call(d3.drag<SVGGElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
      .attr("r", 5)
      .attr("fill", d => COLORS[parseInt(d.pcode) % COLORS.length]);

    node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(d => d.pname || d.pcode);

    node.on("mouseover", (event, d) => {
      setTooltip({
        show: true,
        content: `ID: ${d.id}<br>Project: ${d.pname || d.pcode}<br>URL: ${d.url}`,
        x: event.pageX,
        y: event.pageY,
      });
    })
    .on("mouseout", () => {
      setTooltip(prev => ({ ...prev, show: false }));
    });

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as unknown as Node).x!)
        .attr("y1", d => (d.source as unknown as Node).y!)
        .attr("x2", d => (d.target as unknown as Node).x!)
        .attr("y2", d => (d.target as unknown as Node).y!);

      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }, [data, width, height]);

  return (
    <div style={{ position: 'relative' }}>
      <svg ref={svgRef} width={width} height={height} />
      {tooltip.show && (
        <div
          style={{
            position: 'absolute',
            top: tooltip.y + 10,
            left: tooltip.x + 10,
            background: 'white',
            border: '1px solid black',
            padding: '5px',
            borderRadius: '5px',
          }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </div>
  );
};

export default RelationChart;