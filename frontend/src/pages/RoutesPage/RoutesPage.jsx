import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./RoutesPage.css";

const RoutesPage = () => {
  const [routes, setRoutes] = useState([]);

  const fetchRoutes = async () => {
    try {
      const res = await axiosInstance.get("/routes/get");
      if(res.status == 200){
        setRoutes(res.data.routes)
      }else{
        console.log(res.error)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <div className="routes-container">
      <h2 className="page-title">Routes</h2>

      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Route ID</th>
              <th>Distance (km)</th>
              <th>Traffic Level</th>
              <th>Base Time (mins)</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route._id}>
                <td>{route.routeId}</td>
                <td>{route.distanceKm}</td>
                <td>{route.trafficLevel}</td>
                <td>{route.baseTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoutesPage;
