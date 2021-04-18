import React from "react";
import * as d3 from "d3";
import { AxisContainer, Axis } from "./WindRoseChart.style";
import { ChartDefaultProps } from "./Types";
import { isNull } from "lodash";
export function Chart(props) {
    var containerRef = React.useRef(null);
    var axisContainerRef = React.useRef(null);
    var width = props.width, height = props.height, data = props.chartData, columns = props.columns;
    React.useEffect(function () {
        var current = containerRef.current;
        if (isNull(current))
            return;
        var svg = d3.select(containerRef.current);
        svg.selectAll("*").remove();
        var margin = { top: 40, right: 80, bottom: 40, left: 40 };
        var innerRadius = 20;
        var chartWidth = width - margin.left - margin.right;
        var chartHeight = height - margin.top - margin.bottom;
        var outerRadius = Math.min(chartWidth, chartHeight) / 2.4;
        var g = svg
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        var angle = d3.scaleLinear().range([0, 2 * Math.PI]);
        var radius = d3.scaleLinear().range([innerRadius, outerRadius]);
        var x = d3
            .scaleBand()
            .range([0, 2 * Math.PI])
            .align(0);
        var xGroup = d3
            .scaleBand()
            .range([0, 2 * Math.PI])
            .align(0);
        var y = d3
            .scaleLinear() // you can try scaleRadial but it scales differently
            .range([innerRadius, outerRadius]);
        var z = d3
            .scaleOrdinal()
            .range([
            "#8e44ad",
            "#4242f4",
            "#42c5f4",
            "#42f4ce",
            "#42f456",
            "#adf442",
            "#f4e242",
            "#f4a142",
            "#f44242",
        ]);
        x.domain(data.map(function (d) { return String(d.angle); }));
        // xGroup.domain(columns.map((d) => d));
        y.domain([
            0,
            (d3.max(data, function (d) { return d.total; }) || 0) > 1
                ? d3.max(data, function (d) { return d.total; }) || 0
                : 1,
        ]);
        z.domain(columns.slice(1));
        // Extend the domain slightly to match the range of [0, 2π].
        angle.domain([0, d3.max(data, function (_, i) { return i + 1; }) || 0]);
        radius.domain([0, d3.max(data, function () { return 0; }) || 0]);
        var angleOffset = -360.0 / data.length / 2.0;
        var stackGen = d3
            .stack()
            .keys(columns.slice(1));
        var arcVal = d3 // d3.DefaultArcObject
            .arc()
            .innerRadius(function (d) { return Number(y(d[0])); })
            .outerRadius(function (d) { return Number(y(d[1])); })
            // @ts-ignore
            .startAngle(function (d) { return Number(x(d.data.angle)); })
            // .startAngle((d) => x(String(d.startAngle)) || 0)
            // @ts-ignore
            .endAngle(function (d) { return Number(x(d.data.angle)) + x.bandwidth(); })
            // .endAngle((d) => x(String(d.endAngle)) || 0 + x.bandwidth())
            .padAngle(0.0)
            .padRadius(innerRadius);
        // @ts-ignore
        var arcParent = g
            .append("g")
            .selectAll("g")
            .data(stackGen(data))
            .enter()
            .append("g")
            .attr("fill", function (d) {
            return z(d.key);
        });
        // @ts-ignore
        var arc = arcParent
            .selectAll("path")
            .data(function (d) { return d; })
            .enter()
            .append("path");
        arc
            // @ts-ignore
            .attr("d", arcVal)
            .attr("transform", "rotate(" + angleOffset + ")");
        // g.append("g")
        //   .selectAll("g")
        //   .data(d3.stack().keys(columns.slice(1))(data))
        //   .enter()
        //   .append("g")
        //   .attr("fill", (d) => z(d.key))
        //   .selectAll("path")
        //   .data((d) => d)
        //   .enter()
        //   .append("path")
        //   .attr(
        //     "d",
        //     d3
        //       .arc()
        //       .innerRadius((d) => y(d[0]))
        //       .outerRadius((d) => y(d[1]))
        //       .startAngle((d) => x(d.data.angle))
        //       .endAngle((d) => x(d.data.angle) + x.bandwidth())
        //       .padAngle(0.01)
        //       .padRadius(innerRadius)
        //   )
        //   .attr("transform", () => `rotate(${angleOffset})`);
        var label = g
            .append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
            // if (typeof d === "undefined") return null;
            return "rotate(" + (
            // @ts-ignore
            ((Number(x(d.angle)) + x.bandwidth() / 2) * 180) / Math.PI -
                (90 - angleOffset)) + ")translate(" + (outerRadius + 30) + ",0)";
        });
        label
            .append("text")
            // eslint-disable-next-line no-confusing-arrow
            .attr("transform", function (d, i) {
            // @ts-ignore
            return (x(d.angle) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI < Math.PI)
                ? "rotate(90)translate(0,16)"
                : "rotate(-90)translate(0,-9)";
        })
            .attr("transform", "rotate(90)translate(0,-9)")
            .text(function (d) { return d.angle; })
            .style("font-size", 14);
        g.selectAll(".axis")
            .data(d3.range(angle.domain()[1]))
            .enter()
            .append("g")
            .attr("class", "axis")
            .attr("transform", function (d) { return "rotate(" + (angle(d) * 180) / Math.PI + ")"; })
            .call(d3
            // @ts-ignore
            .axisLeft()
            .scale(radius.copy().range([-innerRadius, -(outerRadius + 10)])));
        var yAxis = g.append("g").attr("text-anchor", "middle");
        var yTick = yAxis
            .selectAll("g")
            .data(y.ticks(5).slice(1))
            .enter()
            .append("g");
        yTick
            .append("circle")
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("stroke-dasharray", "4,4")
            .attr("r", y);
        yTick
            .append("text")
            .attr("y", function (d) { return -y(d); })
            .attr("dy", "-0.35em")
            .attr("x", function () { return -10; })
            .text(y.tickFormat(5, "s"))
            .style("font-size", 14);
        var legend = g
            .append("g")
            .selectAll("g")
            .data(columns.slice(1).reverse())
            .enter()
            .append("g")
            .attr("transform", function (d, i) {
            return "translate(" + (outerRadius + 45) + "," + (-outerRadius + 40 + (i - (columns.length - 1) / 2) * 20) + ")";
        });
        legend
            .append("rect")
            .attr("width", 18)
            .attr("height", 18)
            // @ts-ignore
            .attr("fill", z);
        legend
            .append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", "0.35em")
            .text(function (d) { return d; })
            .style("font-size", 12);
        g.exit().remove();
    }, []);
    return (React.createElement(AxisContainer, { ref: axisContainerRef },
        React.createElement(Axis, { className: "axis", width: width, height: height, ref: containerRef })));
}
Chart.defaultProps = ChartDefaultProps;
//# sourceMappingURL=WindRoseChart.component.js.map