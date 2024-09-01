"use client";

import React, { useState, useEffect } from "react";
import LinkedMap from "./linked-map";

export const LinkedMapComponent: React.FC = () => {
  const [map] = useState(() => new LinkedMap<string, number>());
  const [keys, setKeys] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    updateState();
  }, []);

  const updateState = () => {
    setKeys(Array.from(map.keys()));
    setValues(Array.from(map.values()));
  };

  const handleAdd = () => {
    if (newKey && newValue) {
      map.put(newKey, parseInt(newValue));
      setNewKey("");
      setNewValue("");
      updateState();
    }
  };

  const handleRemove = (key: string) => {
    map.remove(key);
    updateState();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">LinkedMap Example</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="Key"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Value"
          className="mr-2 p-2 border rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add
        </button>
      </div>
      <ul className="list-disc pl-5">
        {keys.map((key, index) => (
          <li key={key} className="mb-2">
            {key}: {values[index]}
            <button
              onClick={() => handleRemove(key)}
              className="ml-2 bg-red-500 text-white p-1 rounded text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkedMapComponent;
