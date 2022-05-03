import React from "react";
import "./App.css";
import { Chart as ReactWindRoseChart } from "@eunchurn/react-windrose";
import { defaultData } from "./data";
import { Chart as WindRoseChart } from "@eunchurn/windrose-chart";
import { Rnd } from "react-rnd";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

function App() {
  const [wrState, setWrState] = React.useState({
    width: 600,
    height: 600,
    x: 10,
    y: 10,
  });
  const [gwrState, setGwrState] = React.useState({
    width: 600,
    height: 600,
    x: 610,
    y: 10,
  });
  return (
    <div className="App">
      <Rnd
        style={style}
        size={{ width: wrState.width, height: wrState.height }}
        position={{ x: wrState.x, y: wrState.y }}
        onDragStop={(_e, d) => {
          setWrState({ ...wrState, x: d.x, y: d.y });
        }}
        onResizeStop={(_e, _direction, ref, _delta, position) => {
          setWrState({
            width: Number(ref.style.width),
            height: Number(ref.style.height),
            ...position,
          });
        }}
      >
        <ReactWindRoseChart {...defaultData} />
      </Rnd>
      <Rnd
        style={style}
        size={{ width: gwrState.width, height: gwrState.height }}
        position={{ x: gwrState.x, y: gwrState.y }}
        onDragStop={(_e, d) => {
          setGwrState({ ...gwrState, x: d.x, y: d.y });
        }}
        onResizeStop={(_e, _direction, ref, _delta, position) => {
          setGwrState({
            width: Number(ref.style.width),
            height: Number(ref.style.height),
            ...position,
          });
        }}
      >
        <WindRoseChart responsive legendGap={10}/>
      </Rnd>
    </div>
  );
}

export default App;
