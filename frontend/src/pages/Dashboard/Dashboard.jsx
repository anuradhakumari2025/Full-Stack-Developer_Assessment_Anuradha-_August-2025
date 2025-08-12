import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [kpi, setKpi] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/simulation/latest")
      .then((res) => setKpi(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!kpi) return <p className="loading-text">Loading...</p>;

  const chartData = {
    labels: ["On-Time", "Late"],
    datasets: [
      {
        label: "Deliveries",
        data: [kpi.onTimeDeliveries, kpi.lateDeliveries],
        backgroundColor: ["#34a853", "#ea4335"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard Overview</h2>

      <div className="kpi-cards">
        <div className="card">
          <h3>Total Profit</h3>
          <p>₹{kpi.totalProfit.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Efficiency Score</h3>
          <p>{kpi.efficiencyScore}%</p>
        </div>
      </div>

      <div className="chart-container">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
