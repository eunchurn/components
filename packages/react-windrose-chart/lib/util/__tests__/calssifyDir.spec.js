import { classifyDir } from "../index";
import { Direction } from "../../WindRose/Types";
describe("classifyDir", function () {
    it("should return N when angle 0 degree", function () {
        var result = classifyDir(0);
        expect(result).toBe(Direction.N);
    });
    it("should return W when angle 270 degree", function () {
        var result = classifyDir(270);
        expect(result).toBe(Direction.W);
    });
    it("should return WNW when angle 303.74 degree", function () {
        var result = classifyDir(303.74);
        expect(result).toBe(Direction.WNW);
    });
    it("should return NW when angle 303.75 degree", function () {
        var result = classifyDir(303.75);
        expect(result).toBe(Direction.NW);
    });
});
//# sourceMappingURL=calssifyDir.spec.js.map