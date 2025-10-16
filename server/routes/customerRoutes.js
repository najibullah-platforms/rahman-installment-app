import express from "express";
import Customer from "../models/Customer.js";

const router = express.Router();

// GET all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ADD a new customer
router.post("/", async (req, res) => {
  try {
    const { name, product, totalPrice, paid, months } = req.body;

    if (!name || !product || !totalPrice || !paid || !months) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCustomer = new Customer({ name, product, totalPrice, paid, months });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ message: "Error creating customer" });
  }
});

export default router;
