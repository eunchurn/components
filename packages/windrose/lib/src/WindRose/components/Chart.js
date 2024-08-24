import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import { DefaultProps } from "./DefaultProps";
import { isNull } from "lodash";
import { useResponsive } from "./hooks";
export function Chart(props) {
    const { width: propWidth, height: propHeight, chartData: data, columns, columnsColor: z, angles, dataMax, dataKeys, mouseOverColor, mouseOverTitleColor, mouseOverSurveyColor, responsive, legendGap, } = Object.assign(Object.assign({}, DefaultProps), props);
    const containerRef = React.useRef(null);
    const axisContainerRef = React.useRef(null);
    const containerSize = useResponsive(axisContainerRef, {
        width: propWidth,
        height: propHeight,
    });
    const [size, setSize] = React.useState({
        width: propWidth,
        height: propHeight,
    });
    React.useEffect(() => {
        const { width, height } = containerSize;
        if (responsive) {
            const rect = Math.min(width, height);
            setSize({ width: rect, height: rect });
        }
        else {
            setSize({ width: propWidth, height: propHeight });
        }
    }, [responsive, axisContainerRef, containerSize.width]);
    React.useEffect(() => {
        const { current } = containerRef;
        if (isNull(current))
            return;
        const { width, height } = size;
        const svg = d3.select(containerRef.current);
        svg.selectAll("*").remove();
        const margin = { top: 80, right: 100, bottom: 80, left: 40 };
        const innerRadius = 20;
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        const outerRadius = innerRadius + Math.min(chartWidth, chartHeight) / 2;
        const g = svg
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);
        const angle = d3.scaleLinear().range([0, 2 * Math.PI]);
        const radius = d3.scaleLinear().range([innerRadius, outerRadius]);
        const x = d3
            .scaleBand()
            .range([0, 2 * Math.PI])
            .align(0);
        const xGroup = d3
            .scaleBand()
            .range([0, 2 * Math.PI])
            .align(0);
        const y = d3.scaleLinear().range([innerRadius, outerRadius]);
        x.domain(angles.map((d) => d));
        xGroup.domain(columns.map((d) => d));
        y.domain([
            0,
            dataMax,
            // (d3.max(data, ({ total }) => total) as number) > dataMax
            //   ? (d3.max(data, ({ total }) => total) as number)
            //   : dataMax,
        ]);
        angle.domain([0, d3.max(data, (_, i) => i + 1)]);
        radius.domain([0, d3.max(data, () => 0)]);
        const angleOffset = -360.0 / data.length / 2.0;
        const stackGen = d3
            .stack()
            .keys(dataKeys);
        const arcVal = d3
            .arc()
            // @ts-ignore
            .innerRadius((d) => Number(y(d[0])))
            // @ts-ignore
            .outerRadius((d) => Number(y(d[1])))
            .startAngle((_d, i) => Number(x(angles[i])))
            .endAngle((_d, i) => Number(x(angles[i])) + x.bandwidth())
            .padAngle(0.0)
            .padRadius(innerRadius);
        const arcParent = g
            .append("g")
            .selectAll("g")
            // @ts-ignore
            .data(stackGen(data))
            .enter();
        // @ts-ignore
        const arc = arcParent
            .selectAll("path")
            .data((d) => d)
            .enter()
            .append("path");
        arc
            // @ts-ignore
            .attr("d", arcVal)
            .attr("transform", `rotate(${angleOffset})`)
            .attr("fill", (d) => d.data.color)
            .attr("class", (_d, i) => `arc_${i}`)
            .attr("data-tooltip-id", "segment-tooltip")
            .attr("data-tooltip-content", (item) => `${item.data.coreCompetency}@${item.data.survey}`)
            .on("mouseover", function (_event, _d) {
            this.setAttribute("fill", mouseOverColor);
            this.setAttribute("style", "transition: fill 0.5s; cursor: pointer;");
        })
            .on("mouseout", function (_event, d) {
            this.setAttribute("fill", String(d.data.color) || "#ffffff");
        });
        const label = g
            .append("g")
            .selectAll("g")
            .data(columns)
            .enter()
            .append("g")
            .attr("text-anchor", "middle")
            .attr("transform", (d) => {
            if (typeof d === "undefined")
                return null;
            return `rotate(${((Number(xGroup(d)) + xGroup.bandwidth() / 2) * 180) / Math.PI -
                (90 - angleOffset)})translate(${outerRadius},0)`;
        });
        label
            .append("text")
            .attr("transform", "rotate(90)translate(0,-9)")
            .text((_d, i) => columns[i])
            .style("font-size", 14);
        const yAxis = g.append("g").attr("text-anchor", "middle");
        const yTick = yAxis
            .selectAll("g")
            .data(y.ticks(5).slice(1))
            .enter()
            .append("g");
        yTick
            .append("circle")
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("stroke-dasharray", "4,4")
            // @ts-ignore
            .attr("r", y);
        yTick
            .append("text")
            // @ts-ignore
            .attr("y", (d) => -y(d))
            .attr("dy", "-0.35em")
            .attr("x", () => -10)
            .text(y.tickFormat(5, "s"))
            .style("font-size", 14);
        const legend = g
            .append("g")
            .selectAll("g")
            .data(columns)
            .enter()
            .append("g")
            .attr("transform", (_d, i) => `translate(${outerRadius + 0},${-outerRadius + 40 + (i - (columns.length - 1) / 2) * 20})`);
        legend
            .append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", (_d, i) => z[i]);
        legend
            .append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", "0.35em")
            .text((d) => d)
            .style("font-size", 12);
        g.exit().remove();
    }, [containerSize.width]);
    // React.useEffect(() => {
    //   // Tooltip.rebuild();
    // }, [containerSize.width]);
    return (_jsxs(AxisContainer, { ref: axisContainerRef, role: "main", children: [_jsx(Axis, { className: "axis", width: size.width, height: size.height, ref: containerRef, role: "document" }), _jsx(Tooltip, { id: "segment-tooltip", render: ({ content }) => {
                    if (isNull(content))
                        return _jsx(_Fragment, {});
                    const title = content.split("@")[0];
                    const survey = content.split("@")[1];
                    return (_jsxs("div", { children: [_jsx("p", { style: {
                                    color: mouseOverTitleColor,
                                    fontSize: "1em",
                                }, children: title }), _jsx("p", { style: {
                                    color: mouseOverSurveyColor,
                                    fontSize: "1.5em",
                                }, children: survey })] }));
                }, 
                // type="light"
                // effect="float"
                delayHide: 100, openEvents: { mouseover: true, focus: false }, closeEvents: { mouseout: true, blur: false } })] }));
}
export const AxisContainer = styled.div `
  width: 100%;
  height: auto;
  aspect-ratio: 1/1;
`;
export const Axis = styled.svg `
  .axis {
    stroke: gray;
  }
`;
export default Chart;
