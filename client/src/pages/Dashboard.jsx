import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "https://fazalinstallmentapi-emhnbrvu.b4a.run/api/customers";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    product: "",
    totalPrice: "",
    paid: "",
    months: "",
  });

  // Fetch customers
  const fetchCustomers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API);
      setCustomers(res.data || []);
    } catch (err) {
      console.error("Fetch customers error:", err);
      setError("Failed to fetch customers. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Input change for both add and edit (edit handled inline)
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add customer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API, formData);
      // If backend returns the created customer
      if (res?.data?._id) {
        setCustomers((prev) => [res.data, ...prev]);
      } else {
        // fallback: refetch
        fetchCustomers();
      }
      setFormData({
        name: "",
        product: "",
        totalPrice: "",
        paid: "",
        months: "",
      });
      setShowForm(false);
      alert("Customer added successfully!");
    } catch (err) {
      console.error("Add customer error:", err);
      alert("Error adding customer");
    }
  };

  // Delete customer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
      alert("Customer deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting customer");
    }
  };

  // Open edit modal
  const handleEdit = (customer) => {
    // create a shallow copy to avoid mutating the list directly
    setEditData({ ...customer });
  };

  // Save edited customer
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API}/${editData._id}`, editData);
      const updated = res?.data || editData;
      setCustomers((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
      setEditData(null);
      alert("Customer updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating customer");
    }
  };

  const filteredCustomers = customers.filter((c) =>
    (c.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">Customers</h2>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {showForm ? "Close Form" : "Add Customer"}
          </button>
        </div>

        {/* Add Customer Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-5 rounded-lg shadow-md mb-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="name"
                placeholder="Customer Name"
                className="border p-2 rounded-md"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="product"
                placeholder="Product Name"
                className="border p-2 rounded-md"
                value={formData.product}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="totalPrice"
                placeholder="Total Price (Rs)"
                className="border p-2 rounded-md"
                value={formData.totalPrice}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="paid"
                placeholder="Amount Paid (Rs)"
                className="border p-2 rounded-md"
                value={formData.paid}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="months"
                placeholder="Installment Months"
                className="border p-2 rounded-md"
                value={formData.months}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Save Customer
            </button>
          </form>
        )}

        {/* Search bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by customer name..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Customer Table */}
        {loading ? (
          <p className="text-center text-gray-600">Loading customers...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Product</th>
                  <th className="py-2 px-4 text-left">Total Price</th>
                  <th className="py-2 px-4 text-left">Paid</th>
                  <th className="py-2 px-4 text-left">Remaining</th>
                  <th className="py-2 px-4 text-left">Months</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((c) => (
                    <tr
                      key={c._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-2 px-4">{c.name}</td>
                      <td className="py-2 px-4">{c.product}</td>
                      <td className="py-2 px-4">Rs {c.totalPrice}</td>
                      <td className="py-2 px-4">Rs {c.paid}</td>
                      <td className="py-2 px-4 text-red-600 font-semibold">
                        Rs {c.totalPrice - c.paid}
                      </td>
                      <td className="py-2 px-4">{c.months} months</td>
                      <td className="py-2 px-4 space-x-2">
                        <button
                          onClick={() => handleEdit(c)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-4 text-gray-500 italic"
                    >
                      No customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Edit Customer</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="border p-2 w-full mb-3"
                required
              />
              <input
                type="text"
                placeholder="Product"
                value={editData.product}
                onChange={(e) =>
                  setEditData({ ...editData, product: e.target.value })
                }
                className="border p-2 w-full mb-3"
                required
              />
              <input
                type="number"
                placeholder="Total Price"
                value={editData.totalPrice}
                onChange={(e) =>
                  setEditData({ ...editData, totalPrice: e.target.value })
                }
                className="border p-2 w-full mb-3"
                required
              />
              <input
                type="number"
                placeholder="Paid"
                value={editData.paid}
                onChange={(e) =>
                  setEditData({ ...editData, paid: e.target.value })
                }
                className="border p-2 w-full mb-3"
                required
              />
              <input
                type="number"
                placeholder="Months"
                value={editData.months}
                onChange={(e) =>
                  setEditData({ ...editData, months: e.target.value })
                }
                className="border p-2 w-full mb-3"
                required
              />

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditData(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
