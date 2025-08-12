import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
const Simulation = () => {
    const [form, setForm] = useState({ availableDrivers: "", startTime: "", maxHoursPerDriver: "" });
  const [result, setResult] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const runSimulation = () => {
    axiosInstance.post("/simulation", form)
      .then(res => setResult(res.data))
      .catch(err => console.error(err));
  };
   return (
    <div>
      <h2>Run Simulation</h2>
      <input name="availableDrivers" placeholder="Available Drivers" onChange={handleChange} />
      <input name="startTime" placeholder="Start Time (HH:MM)" onChange={handleChange} />
      <input name="maxHoursPerDriver" placeholder="Max Hours/Driver" onChange={handleChange} />
      <button onClick={runSimulation}>Run</button>

      {result && (
        <div>
          <p>Total Profit: ₹{result.totalProfit}</p>
          <p>Efficiency Score: {result.efficiencyScore}%</p>
          <p>On-time Deliveries: {result.onTimeDeliveries}</p>
          <p>Late Deliveries: {result.lateDeliveries}</p>
        </div>
      )}
    </div>
  );
}

export default Simulation