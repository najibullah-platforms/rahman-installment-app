import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    product: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    paid: { type: Number, required: true },
    months: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
