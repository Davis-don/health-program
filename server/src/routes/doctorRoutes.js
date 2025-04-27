import express from "express";
import { createDoctor, getAllDoctors, getDoctorById, getDoctorByName, updateDoctor, deleteDoctor } from "../controllers/doctorController.js";

const doctorRoutes = express.Router();

// 🩺 Create a new doctor
doctorRoutes.post("/new-doctor", createDoctor);

// 📋 Get all doctors
doctorRoutes.get("/all-doctors", getAllDoctors);

// 🔍 Get a specific doctor by ID
doctorRoutes.get("/get/:id", getDoctorById);

// 🔍 Search for a doctor by name
doctorRoutes.get("/search", getDoctorByName); // New search route

// ✏️ Update a doctor
doctorRoutes.put("/doctor/:id", updateDoctor);

// 🗑️ Delete a doctor
doctorRoutes.delete("/remove/:id", deleteDoctor);

export { doctorRoutes };
