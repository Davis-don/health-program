import express from "express";

import { enrollClient, getEnrollments, deleteEnrollment } from "../controllers/enrollmentController.js"; // 🔥 Import enrollment logic 

const enrollmentRoutes = express.Router();

// 📌 Enroll a client in a program
enrollmentRoutes.post("/new-enroll", enrollClient);

// 🔍 Get all enrollments
enrollmentRoutes.get("/enrollments", getEnrollments);

// 🗑️ Delete an enrollment by ID
enrollmentRoutes.delete("/remove/:id", deleteEnrollment);

export { enrollmentRoutes }; // 🔥 Correctly exporting enrollment routes
