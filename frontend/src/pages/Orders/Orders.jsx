import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res =await axiosInstance.get("/orders/get");
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2 className="page-title">Orders</h2>

      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Value (₹)</th>
              <th>Assigned Route</th>
              <th>Delivery Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.valueRs}</td>
                <td>{order.assignedRoute}</td>
                <td>
                  {new Date(order.deliveryTimestamp).toLocaleString("en-IN", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
