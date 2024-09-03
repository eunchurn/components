"use client";

import { Chart, calculateWindRose, ChartData } from "@eunchurn/react-windrose";
import { ApiData } from "./_types";
import React from "react";
import { Gradient } from "@/components";

export default function Page(): JSX.Element {
  const [chartData, setChartData] = React.useState<ChartData[]>([
    {
      angle: "N",
      "0-1": 0,
      "1-2": 0,
      "2-3": 0,
      "3-4": 0,
      "4-5": 0,
      "5-6": 0,
      "6-7": 0,
      "7+": 0,
      total: 0,
    },
  ]);
  const [location, setLocation] = React.useState<GeolocationPosition>();
  const [geoposition, setGeoposition] = React.useState({
    lat: 37.5326,
    lon: 127.024612,
  });
  React.useEffect(() => {
    const { lat, lon } = geoposition;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=wind_speed_10m,wind_direction_10m`
    )
      .then((res) => res.json() as Promise<ApiData>)
      .then((data) => {
        const {
          hourly: { wind_direction_10m, wind_speed_10m },
        } = data;
        setChartData(
          calculateWindRose({
            direction: wind_direction_10m,
            speed: wind_speed_10m.map((speed) => speed / 3.6), // km/h => m/s
          })
        );
      });
  }, [geoposition]);

  React.useEffect(() => {
    if (!navigator.geolocation) return;

    const navId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation(position);
        setGeoposition({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      console.error,
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
    return () => {
      navigator.geolocation.clearWatch(navId);
    };
  }, [navigator]);
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
        <p className="fixed top-0 left-0 flex justify-center w-full px-4 pt-8 pb-6 border-b bg-gradient-to-b backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30">
          @eunchurn/react-windrose -&nbsp;
          <code className="font-mono font-bold">Windrose Chart</code>
        </p>
      </div>

      <div className="relative flex place-items-center ">
        <div className="font-sans w-auto pb-16 pt-[48px] md:pb-24 lg:pb-32 md:pt-16 lg:pt-20 flex justify-between gap-8 items-center flex-col relative z-0">
          <div className="z-50 flex items-center justify-center w-full">
            <div className="absolute min-w-[614px] min-h-[614px]">
              <Chart chartData={chartData} />
            </div>
            <div className="absolute z-50 flex items-center justify-center w-64 h-64">
              <Gradient
                className="opacity-90 w-[120px] h-[120px]"
                conic
                small
              />
            </div>
          </div>
          <Gradient
            className="top-[-500px] opacity-[0.15] w-[1000px] h-[1000px]"
            conic
          />
        </div>
      </div>

      <div className="mt-32 text-center w-full">{`Lattitude: ${geoposition.lat}, Longitude: ${geoposition.lon} `}</div>
    </main>
  );
}
