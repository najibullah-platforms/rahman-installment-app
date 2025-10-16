import Customer from "../models/Customer.js";

// ✅ Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Add new customer
export const addCustomer = async (req, res) => {
  try {
    const { name, product, totalPrice, paid, months } = req.body;
    const customer = new Customer({ name, product, totalPrice, paid, months });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: "Error adding customer" });
  }
};

// ✅ Update customer
export const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ message: "Error updating customer" });
  }
};

// ✅ Delete customer
export const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting customer" });
  }
};
