import prisma from "../config/dbConfig.js"; 

// 📌 Create a new hospital program
export const createProgram = async (req, res) => {
  try {
    // Destructure and trim fields to remove whitespace from the input
    const { name, description, department, startDate, endDate, status } = req.body;

    // Trim each field to ensure no field is just whitespace
    const trimmedName = name?.trim();
    const trimmedDescription = description?.trim();
    const trimmedDepartment = department?.trim();
    const trimmedStartDate = startDate?.trim();
    const trimmedEndDate = endDate?.trim();
    const trimmedStatus = status?.trim();

    // 🔥 Ensure required fields are provided and not empty after trimming
    if (!trimmedName || !trimmedDescription || !trimmedDepartment || !trimmedStartDate || !trimmedEndDate || !trimmedStatus) {
      return res.status(400).json({ message: "All fields must be provided and cannot be empty" });
    }

    const newProgram = await prisma.program.create({
      data: {
        name: trimmedName,
        description: trimmedDescription,
        department: trimmedDepartment, // New field: Health department (e.g., Infectious Diseases, Maternal Health)
        startDate: new Date(trimmedStartDate),
        endDate: trimmedEndDate ? new Date(trimmedEndDate) : null, // handle optional endDate
        status: trimmedStatus,
      },
    });

    res.status(201).json({ message: "Hospital program created successfully", program: newProgram });
  } catch (error) {
    res.status(500).json({ message: "Error creating hospital program", error: error.message });
  }
};


// 📋 Get all hospital programs
export const getAllPrograms = async (_req, res) => {
  try {
    const programs = await prisma.program.findMany();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving hospital programs", error: error.message });
  }
};

// Get a hospital program by ID
export const getProgramById = async (req, res) => {
  try {
    const { id } = req.params;

    const program = await prisma.program.findUnique({
      where: { id: String(id) },
    });

    if (!program) return res.status(404).json({ message: "Hospital program not found" });

    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving hospital program", error: error.message });
  }
};

//✏️ Update a hospital program
export const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, department, startDate, endDate, status } = req.body;

    if (!name && !description && !department && !startDate && !endDate && !status) {
      return res.status(400).json({ message: "At least one field must be updated" });
    }

    const updatedProgram = await prisma.program.update({
      where: { id: String(id) },
      data: { name, description, department, startDate, endDate, status },
    });

    res.status(200).json({ message: "Hospital program updated successfully", program: updatedProgram });
  } catch (error) {
    res.status(500).json({ message: "Error updating hospital program", error: error.message });
  }
};

// 🗑️ Delete a hospital program
export const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.program.delete({
      where: { id: String(id) },
    });

    res.status(200).json({ message: "Hospital program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hospital program", error: error.message });
  }
};
