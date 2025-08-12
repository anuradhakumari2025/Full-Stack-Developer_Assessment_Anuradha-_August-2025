import { Route,  Routes } from "react-router-dom";
import Simulation from "../pages/Simulation";
import Drivers from "../pages/Drivers";
import RoutesPage from "../pages/RoutesPage";
import Orders from "../pages/Orders";
import Navbar from "../components/Navbar/Navbar";
import Dashboard from "../pages/Dashboard/Dashboard";

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
