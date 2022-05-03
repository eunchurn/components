import React, { useEffect, useRef, useCallback } from "react";

import "./responsive-tester";

interface ResponsiveTesterProps {
  minWidth?: number;
  children: any;
}

export const ResponsiveTester = ({
  minWidth = 200,
  children,
}: ResponsiveTesterProps) => {
  const frame: any = useRef();

  const body = document.getElementsByTagName("body");
  let origin = 0;
  let handleWidth = 0;
  let fetched = false;
  let diff = 0;

  useEffect(() => {
    handleWidth = Number(
      getComputedStyle(frame.current, null)
        .getPropertyValue("border-right-width")
        .replace("px", "")
    );

    frame.current.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseup);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      frame.current.addEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseup);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseDown = useCallback((event: any) => {
    if (event.offsetX >= frame.current.clientWidth) {
      origin = frame.clientWidth + handleWidth / 2.0;
      fetched = true;
    } else {
      fetched = false;
    }
  }, []);

  const handleMouseMove = (event: any) => {
    if (fetched) {
      body[0].style.cursor = "col-resize";
    } else {
      if (event.offsetX >= frame.current.clientWidth) {
        frame.current.style.cursor = "col-resize";
      } else {
        frame.current.style.cursor = "auto";
      }
    }
    if (fetched) {
      if (event.offsetX >= minWidth - handleWidth / 2.0) {
        diff = event.offsetX - origin;
        frame.current.style.width = `${Math.max(
          minWidth,
          frame.current.offsetWidth + diff
        )}px`;
        origin = event.offsetX;
      } else {
        frame.current.style.width = `${minWidth}px`;
        origin = minWidth - handleWidth / 2.0;
      }
    }
  };

  const handleMouseup = useCallback(() => {
    fetched = false;
  }, []);

  return (
    <div ref={frame} className={"container"}>
      <div className={"handler"}>║</div>
      {children}
    </div>
  );
};
