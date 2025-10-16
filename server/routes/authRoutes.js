import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerAdmin); // only use once to create admin
router.post("/login", loginAdmin);

export default router;
