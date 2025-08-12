import { Route,  Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Dashboard from "../pages/Dashboard/Dashboard";
import Simulation from "../pages/Simulation/Simulation";
import Drivers from "../pages/Drivers/Drivers";
import RoutesPage from "../pages/RoutesPage/RoutesPage";
import Orders from "../pages/Orders/Orders";

const MainRoute = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </>
  );
};

export default MainRoute;
