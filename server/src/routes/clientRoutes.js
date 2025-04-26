import express from "express";
import { createClient, getAllClients, getClientById, getClientByName, updateClient, deleteClient } from "../controllers/clientController.js";

const clientRoutes = express.Router();

// 🏥 Create a new client
clientRoutes.post("/new-client", createClient);

// 📌 Get all clients
clientRoutes.get("/all-clients", getAllClients);

// 🔍 Get a specific client by ID
clientRoutes.get("/get/:id", getClientById);

// 🔍 Search for a client by name
clientRoutes.get("/search", getClientByName);  // New search route

// // ✏️ Update a client (🔥 Fixed route)
// clientRoutes.put("/client/:id", updateClient);

// 🗑️ Delete a client
clientRoutes.delete("/remove/:id", deleteClient);

export { clientRoutes };


