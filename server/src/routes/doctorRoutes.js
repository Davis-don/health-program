import express from "express";
import { 
  createDoctor, 
  getAllDoctors, 
  getDoctorById, 
  getDoctorByName, 
  updateDoctor, 
  deleteDoctor, 
  loginDoctor // 👉 Import loginDoctor
} from "../controllers/doctorController.js";

const doctorRoutes = express.Router();

// 🩺 Create a new doctor
doctorRoutes.post("/new-doctor", createDoctor);

// 🔑 Login a doctor
doctorRoutes.post("/login", loginDoctor); // 👉 Added Login route

// 📋 Get all doctors
doctorRoutes.get("/all-doctors", getAllDoctors);

// 🔍 Get a specific doctor by ID
doctorRoutes.get("/get/:id", getDoctorById);

// 🔍 Search for a doctor by name
doctorRoutes.get("/search", getDoctorByName);

// ✏️ Update a doctor
doctorRoutes.put("/doctor/:id", updateDoctor);

// 🗑️ Delete a doctor
doctorRoutes.delete("/remove/:id", deleteDoctor);

export { doctorRoutes };
