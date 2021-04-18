import React from "react";
import "./App.css";
import { Chart as ReactWindRoseChart } from "@eunchurn/react-windrose-chart";
import { Chart as WindRoseChart } from "@eunchurn/windrose-chart";

function App() {
  return (
    <div className="App">
      <ReactWindRoseChart />
      <WindRoseChart />
    </div>
  );
}

export default App;
