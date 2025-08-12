import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./Simulation.css";

const Simulation = () => {
  const [form, setForm] = useState({
    availableDrivers: "",
    startTime: "",
    maxHoursPerDriver: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const runSimulation = async () => {
    console.log("clicked run simulation", form);
    const res = await axiosInstance.post("/simulation", form);
    if(res.status == 200){
      setResult(res.data);
      const latest = await axiosInstance.get("/simulation/latest");
      if (latest.status === 200) {
        setResult(latest.data);
      }
    }else{
      console.error("Error running simulation:", res);
      setResult(null);
    }
  };

 useEffect(() => {
  const fetchLatestSimulation = async () => {
    try {
      const res = await axiosInstance.get("/simulation/latest");
      if (res.status === 200) {
        setResult(res.data);
      } else {
        setResult(null);
      }
    } catch (err) {
      console.error("Error fetching latest simulation:", err);
      setResult(null);
    }
  };
  fetchLatestSimulation();
}, []);

  return (
    <div className="simulation-container">
      <h2>Run Simulation</h2>

      <div className="form-container">
        <input
          name="availableDrivers"
          placeholder="Available Drivers"
          value={form.availableDrivers}
          onChange={handleChange}
        />
        <input
          name="startTime"
          placeholder="Start Time (HH:MM)"
          value={form.startTime}
          onChange={handleChange}
        />
        <input
          name="maxHoursPerDriver"
          placeholder="Max Hours/Driver"
          value={form.maxHoursPerDriver}
          onChange={handleChange}
        />
        <button onClick={runSimulation}>Run</button>
      </div>

      {result && (
        <div className="result-cards">
          <div className="card">
            <h3>Total Profit</h3>
            <p>₹{result.totalProfit.toFixed(2)}</p>
          </div>
          <div className="card">
            <h3>Efficiency Score</h3>
            <p>{result.efficiencyScore}%</p>
          </div>
          <div className="card">
            <h3>On-time Deliveries</h3>
            <p>{result.onTimeDeliveries}</p>
          </div>
          <div className="card">
            <h3>Late Deliveries</h3>
            <p>{result.lateDeliveries}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Simulation;
