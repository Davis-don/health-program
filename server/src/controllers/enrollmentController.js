import prisma from "../config/dbConfig.js";

// 🏥 Enroll a client in a program
export const enrollClient = async (req, res) => {

  try {
    const { clientId, programId } = req.body;

    if (!clientId || !programId) {
      return res.status(400).json({ message: "Client ID and Program ID are required" });
    }

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
        program: true
      }
    });
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving enrollments", error: error.message });
  }
};
