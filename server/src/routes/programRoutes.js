import express from "express";
import { 
  createProgram, getAllPrograms, getProgramById, updateProgram, deleteProgram 
} from "../controllers/programControllers.js";  

const programRoutes = express.Router();

// 📌 Create a new program
programRoutes.post("/new-program", createProgram);

// 📋 Get all programs
programRoutes.get("/all-programs", getAllPrograms);

// 🔍 Get a specific program by ID
programRoutes.get("/get/:id", getProgramById);

// ✏️ Update a program
programRoutes.put("/program/:id", updateProgram);

// 🗑️ Delete a program
programRoutes.delete("/remove/:id", deleteProgram);



export { programRoutes };


