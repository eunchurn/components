"use client";

import { entries } from "lodash";
import React from "react";

export function useResponsive(
  elRef: React.RefObject<HTMLDivElement>,
  initSize: { width: number; height: number }
) {
  const [size, setSize] = React.useState(initSize);
  const [observer, setObserver] = React.useState<ResizeObserver | null>(null);

  React.useEffect(() => {
    if (typeof window !== "object") return;
    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });
    setObserver(obs);
  }, []);
  React.useEffect(() => {
    if (!observer) return;
    const { current } = elRef;
    if (current) {
      observer.observe(current);
      return () => {
        observer.unobserve(current);
      };
    }
    return;
  }, [elRef, observer]);
  return size;
}
