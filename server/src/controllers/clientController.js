import prisma from "../config/dbConfig.js";

// 📌 Create a new client
export const createClient = async (req, res) => {
  try {
    const { firstName, middleName, lastName, age, gender, phone, email, address, medicalHistory } = req.body;

    if (
      !firstName.trim() ||
      !middleName.trim() ||
      !lastName.trim() ||
      age === undefined || age === null || isNaN(Number(age)) || Number(age) <= 0 ||
      !gender.trim() ||
      !phone.trim() ||
      !address.trim()
    ) {
      return res.status(400).json({ message: "All required fields must be provided and must be valid" });
    }

    const newClient = await prisma.client.create({
      data: {
        firstName,
        middleName,
        lastName,
        age: Number(age),
        gender,
        phone,
        email,
        address,
        medicalHistory,
      },
    });

    res.status(201).json({ message: "Client created successfully", client: newClient });
  } catch (error) {
    res.status(500).json({ message: "Error creating client", error: error.message });
  }
};

// 📋 Get all clients with enrollments and programs
export const getAllClients = async (_req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: {
        enrollments: {
          include: {
            program: true, // 🔥 Fetch related programs for each client
          },
        },
      },
    });

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving clients", error: error.message });
  }
};

// 🔍 Get a client by ID with enrollments and linked programs
export const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await prisma.client.findUnique({
      where: { id: String(id) },
      include: {
        enrollments: {
          include: {
            program: true, // 🔥 Fetch linked programs
          },
        },
      },
    });

    if (!client) return res.status(404).json({ message: "Client not found" });

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving client", error: error.message });
  }
};

// ✏️ Update a client
export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, middleName, lastName, age, gender, phone, email, address, medicalHistory } = req.body;

    const updatedClient = await prisma.client.update({
      where: { id: String(id) },
      data: { firstName, middleName, lastName, age, gender, phone, email, address, medicalHistory },
    });

    res.status(200).json({ message: "Client updated successfully", client: updatedClient });
  } catch (error) {
    res.status(500).json({ message: "Error updating client", error: error.message });
  }
};

// 🗑️ Delete a client
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.client.delete({
      where: { id: String(id) },
    });

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting client", error: error.message });
  }
};

// 🔍 Get a client by name (first, middle, or last name)
// 🔍 Get a client by name (supports one, two, or three names in the same input field)
export const getClientByName = async (req, res) => {
  try {
    const { name } = req.query;  // Expecting the name as a single query parameter

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name query parameter is required" });
    }

    // Split the name input by spaces
    const nameParts = name.trim().split(/\s+/);

    // Dynamically build search conditions based on how many parts are provided
    const whereConditions = [];

    // First name search (always first part of the input)
    if (nameParts[0]) {
      whereConditions.push({
        firstName: {
          contains: nameParts[0],
          mode: "insensitive", // Case-insensitive search
        },
      });
    }

    // Middle name search (optional, second part of the input)
    if (nameParts[1]) {
      whereConditions.push({
        middleName: {
          contains: nameParts[1],
          mode: "insensitive",
        },
      });
    }

    // Last name search (optional, third part of the input)
    if (nameParts[2]) {
      whereConditions.push({
        lastName: {
          contains: nameParts[2],
          mode: "insensitive",
        },
      });
    }

    // Search for clients based on the dynamically constructed conditions
    const clients = await prisma.client.findMany({
      where: {
        OR: whereConditions,
      },
    });

    // If no clients were found, return a message indicating so
    if (clients.length === 0) {
      return res.status(404).json({ message: "No clients found with the given name" });
    }

    // Return the found clients
    res.status(200).json({ message: "Clients found", clients });
  } catch (error) {
    res.status(500).json({ message: "Error searching clients", error: error.message });
  }
};

