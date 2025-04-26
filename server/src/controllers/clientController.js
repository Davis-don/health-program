import prisma from "../config/dbConfig.js";

// 📌 Create a new client
export const createClient = async (req, res) => {
  try {
    const { firstName, middleName, lastName, age, gender, phone, email, address, medicalHistory } = req.body;

    // 🔥 Ensure required fields are provided
    if (!firstName || !age || !gender || !phone || !address) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const newClient = await prisma.client.create({
      data: {
        firstName,
        middleName,
        lastName,
        age,
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

