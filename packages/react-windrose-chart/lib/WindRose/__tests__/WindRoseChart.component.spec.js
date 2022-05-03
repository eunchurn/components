import "jest-styled-components";
import React from "react";
import { isPortal, isFragment } from "react-is";
import { render } from "@testing-library/react";
import { Chart } from "../WindRoseChart.component";
window.ResizeObserver =
    window.ResizeObserver ||
        jest.fn().mockImplementation(function () { return ({
            disconnect: jest.fn(),
            observe: jest.fn(),
            unobserve: jest.fn(),
        }); });
describe("component <Chart />", function () {
    it("should render correctly", function () {
        var element = render(React.createElement(Chart, null));
        expect(element.container).toMatchSnapshot();
    });
    it("is not type Portal", function () {
        expect(isPortal(React.createElement(Chart, null))).toBeFalsy();
    });
    it("is not type Fragment", function () {
        expect(isFragment(React.createElement(Chart, null))).toBeFalsy();
    });
});
//# sourceMappingURL=WindRoseChart.component.spec.js.map