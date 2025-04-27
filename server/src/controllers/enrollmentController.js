import prisma from "../config/dbConfig.js";

// 🏥 Enroll a client in a program
export const enrollClient = async (req, res) => {
  try {
    const { clientId, programId } = req.body;

    if (!clientId || !programId) {
      return res.status(400).json({ message: "Client ID and Program ID are required" });
    }

    // Check if enrollment already exists
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        clientId,
        programId,
      },
    });

    if (existingEnrollment) {
      return res.status(200).json({ message: "Client already enrolled", enrollment: existingEnrollment });
    }

    // Create new enrollment
    const enrollment = await prisma.enrollment.create({
      data: { clientId, programId },
    });

    res.status(201).json({ message: "Client successfully enrolled", enrollment });
  } catch (error) {
    res.status(500).json({ message: "Error enrolling client", error: error.message });
  }
};

// 📋 Get all enrollments
export const getEnrollments = async (_req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        client: true,
        program: true,
      },
    });
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving enrollments", error: error.message });
  }
};

// 🗑️ Delete an enrollment by ID
export const deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the enrollment exists first
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: String(id) },
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // If it exists, delete it
    await prisma.enrollment.delete({
      where: { id: String(id) },
    });

    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting enrollment", error: error.message });
  }
};

