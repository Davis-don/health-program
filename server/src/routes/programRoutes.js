import express from "express";
import { 
  createProgram, getAllPrograms, getProgramById, updateProgram, deleteProgram,getActiveInactivePrograms 
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

// Add this new route to your programs router
programRoutes.get('/active-inactive-programs', getActiveInactivePrograms);



export { programRoutes };


