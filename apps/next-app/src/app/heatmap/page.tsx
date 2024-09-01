"use client";

import React, { useState, useEffect } from "react";
import HeatmapChart, { HeatmapData } from "@eunchurn/heatmap";
import { Gradient } from "@/components";

const generateRandomData = (): HeatmapData => {
  const now = Date.now();
  const hit: [number, number[]][] = [];
  const err: [number, number[]][] = [];

  for (let i = 0; i < 120; i++) {
    const time = now - i * 5000;
    hit.push([
      time,
      Array(120)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100)),
    ]);
    err.push([
      time,
      Array(120)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10)),
    ]);
  }

  return { hit, err };
};

const App: React.FC = () => {
  const [data, setData] = useState<HeatmapData>(generateRandomData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
        <p className="fixed top-0 left-0 flex justify-center w-full px-4 pt-8 pb-6 border-b bg-gradient-to-b backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30">
          @eunchurn/heatmap -&nbsp;
          <code className="font-mono font-bold">Interactive Heatmap Chart</code>
        </p>
      </div>

      <div className="relative flex place-items-center ">
        <div className="font-sans w-auto pb-16 pt-[48px] md:pb-24 lg:pb-32 md:pt-16 lg:pt-20 flex justify-between gap-8 items-center flex-col relative z-0">
          <div className="z-50 flex items-center justify-center w-full">
            <div className="absolute min-w-[614px] min-h-[614px]">
              <HeatmapChart
                width={800}
                height={400}
                data={data}
                config={{
                  dragCallback: (...args) => {
                    console.log(args);
                  },
                }}
              />
            </div>
            <div className="absolute z-50 flex items-center justify-center w-64 h-64">
              {/* <Gradient
                className="opacity-90 w-[120px] h-[120px]"
                conic
                small
              /> */}
            </div>
          </div>
          <Gradient
            className="top-[-500px] opacity-[0.15] w-[1000px] h-[1000px]"
            conic
          />
        </div>
      </div>

      <div className="grid mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left" />
    </main>
  );
};

export default App;
