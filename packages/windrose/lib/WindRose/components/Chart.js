import { __assign, __makeTemplateObject } from "tslib";
import * as React from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import { DefaultProps } from "./DefaultProps";
import { isNull } from "lodash";
import { useResponsive } from "./hooks";
export function Chart(props) {
    var _a = __assign(__assign({}, DefaultProps), props), propWidth = _a.width, propHeight = _a.height, data = _a.chartData, columns = _a.columns, z = _a.columnsColor, angles = _a.angles, dataMax = _a.dataMax, dataKeys = _a.dataKeys, mouseOverColor = _a.mouseOverColor, mouseOverTitleColor = _a.mouseOverTitleColor, mouseOverSurveyColor = _a.mouseOverSurveyColor, responsive = _a.responsive, legendGap = _a.legendGap;
    var containerRef = React.useRef(null);
    var axisContainerRef = React.useRef(null);
    var containerSize = useResponsive(axisContainerRef, {
        width: propWidth,
        height: propHeight,
    });
    var _b = React.useState({
        width: propWidth,
        height: propHeight,
    }), size = _b[0], setSize = _b[1];
    React.useEffect(function () {
        var width = containerSize.width, height = containerSize.height;
        if (responsive) {
            var rect = Math.min(width, height);
            setSize({ width: rect, height: rect });
        }
        else {
            setSize({ width: propWidth, height: propHeight });
        }
    }, [responsive, axisContainerRef, containerSize.width]);
    React.useEffect(function () {
        var current = containerRef.current;
        if (isNull(current))
            return;
        var width = size.width, height = size.height;
        var svg = d3.select(containerRef.current);
        svg.selectAll("*").remove();
        var margin = { top: 80, right: 100, bottom: 80, left: 40 };
        var innerRadius = 20;
        var chartWidth = width - margin.left - margin.right;
        var chartHeight = height - margin.top - margin.bottom;
        var outerRadius = innerRadius + Math.min(chartWidth, chartHeight) / 2;
        var g = svg
            .append("g")
            .attr("transform", "translate(".concat(width / 2, ", ").concat(height / 2, ")"));
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
        var y = d3.scaleLinear().range([innerRadius, outerRadius]);
        x.domain(angles.map(function (d) { return d; }));
        xGroup.domain(columns.map(function (d) { return d; }));
        y.domain([
            0,
            dataMax,
            // (d3.max(data, ({ total }) => total) as number) > dataMax
            //   ? (d3.max(data, ({ total }) => total) as number)
            //   : dataMax,
        ]);
        angle.domain([0, d3.max(data, function (_, i) { return i + 1; })]);
        radius.domain([0, d3.max(data, function () { return 0; })]);
        var angleOffset = -360.0 / data.length / 2.0;
        var stackGen = d3
            .stack()
            .keys(dataKeys);
        var arcVal = d3
            .arc()
            // @ts-ignore
            .innerRadius(function (d) { return Number(y(d[0])); })
            // @ts-ignore
            .outerRadius(function (d) { return Number(y(d[1])); })
            .startAngle(function (_d, i) { return Number(x(angles[i])); })
            .endAngle(function (_d, i) { return Number(x(angles[i])) + x.bandwidth(); })
            .padAngle(0.0)
            .padRadius(innerRadius);
        var arcParent = g
            .append("g")
            .selectAll("g")
            // @ts-ignore
            .data(stackGen(data))
            .enter();
        // @ts-ignore
        var arc = arcParent
            .selectAll("path")
            .data(function (d) { return d; })
            .enter()
            .append("path");
        arc
            // @ts-ignore
            .attr("d", arcVal)
            .attr("transform", "rotate(".concat(angleOffset, ")"))
            .attr("fill", function (d) { return d.data.color; })
            .attr("class", function (_d, i) { return "arc_".concat(i); })
            .attr("data-tooltip-id", "segment-tooltip")
            .attr("data-tooltip-content", function (item) {
            return "".concat(item.data.coreCompetency, "@").concat(item.data.survey);
        })
            .on("mouseover", function (_event, _d) {
            this.setAttribute("fill", mouseOverColor);
            this.setAttribute("style", "transition: fill 0.5s; cursor: pointer;");
        })
            .on("mouseout", function (_event, d) {
            this.setAttribute("fill", String(d.data.color) || "#ffffff");
        });
        var label = g
            .append("g")
            .selectAll("g")
            .data(columns)
            .enter()
            .append("g")
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
            if (typeof d === "undefined")
                return null;
            return "rotate(".concat(((Number(xGroup(d)) + xGroup.bandwidth() / 2) * 180) / Math.PI -
                (90 - angleOffset), ")translate(").concat(outerRadius, ",0)");
        });
        label
            .append("text")
            .attr("transform", "rotate(90)translate(0,-9)")
            .text(function (_d, i) { return columns[i]; })
            .style("font-size", 14);
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
            // @ts-ignore
            .attr("r", y);
        yTick
            .append("text")
            // @ts-ignore
            .attr("y", function (d) { return -y(d); })
            .attr("dy", "-0.35em")
            .attr("x", function () { return -10; })
            .text(y.tickFormat(5, "s"))
            .style("font-size", 14);
        var legend = g
            .append("g")
            .selectAll("g")
            .data(columns)
            .enter()
            .append("g")
            .attr("transform", function (_d, i) {
            return "translate(".concat(outerRadius + 0, ",").concat(-outerRadius + 40 + (i - (columns.length - 1) / 2) * 20, ")");
        });
        legend
            .append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", function (_d, i) { return z[i]; });
        legend
            .append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", "0.35em")
            .text(function (d) { return d; })
            .style("font-size", 12);
        g.exit().remove();
    }, [containerSize.width]);
    // React.useEffect(() => {
    //   // Tooltip.rebuild();
    // }, [containerSize.width]);
    return (React.createElement(AxisContainer, { ref: axisContainerRef, role: "main" },
        React.createElement(Axis, { className: "axis", width: size.width, height: size.height, ref: containerRef, role: "document" }),
        React.createElement(Tooltip, { id: "segment-tooltip", render: function (_a) {
                var content = _a.content;
                if (isNull(content))
                    return React.createElement(React.Fragment, null);
                var title = content.split("@")[0];
                var survey = content.split("@")[1];
                return (React.createElement("div", null,
                    React.createElement("p", { style: {
                            color: mouseOverTitleColor,
                            fontSize: "1em",
                        } }, title),
                    React.createElement("p", { style: {
                            color: mouseOverSurveyColor,
                            fontSize: "1.5em",
                        } }, survey)));
            }, 
            // type="light"
            // effect="float"
            delayHide: 100, openEvents: { mouseover: true, focus: false }, closeEvents: { mouseout: true, blur: false } })));
}
export var AxisContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: auto;\n  aspect-ratio: 1/1;\n"], ["\n  width: 100%;\n  height: auto;\n  aspect-ratio: 1/1;\n"])));
export var Axis = styled.svg(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  .axis {\n    stroke: gray;\n  }\n"], ["\n  .axis {\n    stroke: gray;\n  }\n"])));
export default Chart;
var templateObject_1, templateObject_2;
//# sourceMappingURL=Chart.js.map