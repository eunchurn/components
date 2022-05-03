import React from "react";
export function useResponsive(elRef, initSize) {
    var _a = React.useState(initSize), size = _a[0], setSize = _a[1];
    var observer = React.useRef(new ResizeObserver(function (entries) {
        var _a = entries[0].contentRect, width = _a.width, height = _a.height;
        setSize({ width: width, height: height });
    }));
    React.useEffect(function () {
        var current = elRef.current;
        if (current) {
            observer.current.observe(current);
            return function () {
                observer.current.unobserve(current);
            };
        }
        return;
    }, [elRef, observer]);
    return size;
}
//# sourceMappingURL=useResponsive.js.map