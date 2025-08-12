import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
// import "./Drivers.css"; // Import CSS file
function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    currentShiftHours: 0,
    past7DaysWorkHours: "",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchDrivers = async () => {
    const res = await axiosInstance.get("/drivers/get");
    if(res.status === 201) {
      setDrivers(res.data.drivers);
    }else{
      console.log("Error fetching drivers:", res.data.message);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      past7DaysWorkHours: form.past7DaysWorkHours
        .split(",")
        .map((num) => Number(num.trim())),
    };

    if (editingId) {
      axiosInstance.put(`/drivers/update/${editingId}`, payload).then(() => {
        setForm({ name: "", currentShiftHours: 0, past7DaysWorkHours: "" });
        setEditingId(null);
        fetchDrivers();
      });
    } else {
      axiosInstance.post("/drivers/create", payload).then(() => {
        setForm({ name: "", currentShiftHours: 0, past7DaysWorkHours: "" });
        fetchDrivers();
      });
    }
  };

  const handleEdit = (driver) => {
    setForm({
      name: driver.name,
      currentShiftHours: driver.currentShiftHours,
      past7DaysWorkHours: driver.past7DaysWorkHours.join(", "),
    });
    setEditingId(driver._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      axiosInstance.delete(`/drivers/delete/${id}`).then(() => fetchDrivers());
    }
  };

  return (
    <div className="drivers-container">
      <h2>Drivers Management</h2>

      <div className="form-container">
        <input
          name="name"
          placeholder="Driver Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="currentShiftHours"
          type="number"
          placeholder="Current Shift Hours"
          value={form.currentShiftHours}
          onChange={handleChange}
        />
        <input
          name="past7DaysWorkHours"
          placeholder="Past 7 Days Hours (comma separated)"
          value={form.past7DaysWorkHours}
          onChange={handleChange}
        />
        <button className="btn-primary" onClick={handleSubmit}>
          {editingId ? "Update Driver" : "Add Driver"}
        </button>
      </div>

      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Current Shift Hours</th>
              <th>Past 7 Days Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers?.map((driver) => (
              <tr key={driver._id}>
                <td>{driver.name}</td>
                <td>{driver.currentShiftHours}</td>
                <td>{driver.past7DaysWorkHours.join(", ")}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(driver)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(driver._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Drivers;
