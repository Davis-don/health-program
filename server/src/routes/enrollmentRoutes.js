import express from "express";

import { enrollClient, getEnrollments } from "../controllers/enrollmentController.js"; // 🔥 Import enrollment logic 

const enrollmentRoutes = express.Router();

// 📌 Enroll a client in a program
enrollmentRoutes.post("/new-enroll", enrollClient);

// 🔍 Get all enrollments
enrollmentRoutes.get("/enrollments", getEnrollments);

export { enrollmentRoutes }; // 🔥 Correctly exporting enrollment routes
