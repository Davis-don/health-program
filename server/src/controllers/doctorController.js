import prisma from "../config/dbConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 📌 Create a new doctor
export const createDoctor = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All required fields (firstName, lastName, email, password) must be provided." });
    }

    // 🔒 Hash password before storing
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const newDoctor = await prisma.doctor.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Doctor created successfully", doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Error creating doctor", error: error.message });
  }
};

// 📋 Get all doctors
export const getAllDoctors = async (_req, res) => {
  try {
    const doctors = await prisma.doctor.findMany();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving doctors", error: error.message });
  }
};

// 🔍 Get a doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await prisma.doctor.findUnique({
      where: { id: String(id) },
    });

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving doctor", error: error.message });
  }
};

// ✏️ Update a doctor
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;

    const updateData = { firstName, lastName, email };

    // 🔒 Hash new password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password.trim(), 10);
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id: String(id) },
      data: updateData,
    });

    res.status(200).json({ message: "Doctor updated successfully", doctor: updatedDoctor });
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor", error: error.message });
  }
};

// 🗑️ Delete a doctor
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.doctor.delete({
      where: { id: String(id) },
    });

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor", error: error.message });
  }
};

// 🔍 Search doctors by name
export const getDoctorByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name query parameter is required" });
    }

    const nameParts = name.trim().split(/\s+/);
    const whereConditions = [];

    if (nameParts[0]) {
      whereConditions.push({ firstName: { contains: nameParts[0], mode: "insensitive" } });
    }

    if (nameParts[1]) {
      whereConditions.push({ lastName: { contains: nameParts[1], mode: "insensitive" } });
    }

    const doctors = await prisma.doctor.findMany({ where: { OR: whereConditions } });

    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found with the given name" });
    }

    res.status(200).json({ message: "Doctors found", doctors });
  } catch (error) {
    res.status(500).json({ message: "Error searching doctors", error: error.message });
  }
};

// 🔑 Doctor Login 

export const loginDoctor = async (req, res) => {
  try {
    // Check if the body exists and contains required properties
    const { email, password } = req.body || {}; // Default to empty object to avoid destructuring errors

    if (!email || !password) {
      return res.status(400).json({ message: "Please input email and password" });
    }

    const doctor = await prisma.doctor.findUnique({
      where: { email: email.trim() },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const passwordMatch = await bcrypt.compare(password, doctor.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    if (!process.env.SECRET_KEY) {
      console.error("Missing SECRET_KEY environment variable");
      return res.status(500).json({ message: "Internal server error" });
    }

    const token = jwt.sign({ id: doctor.id }, process.env.SECRET_KEY);

    const { id, firstName, lastName, email: doctorEmail } = doctor;
    res.status(200).json({
      message: "Doctor login successful",
      authToken: token,
      doctor: { id, firstName, lastName, email: doctorEmail },
    });

  } catch (error) {
    console.error("Error during doctor login:", error);
    res.status(500).json({ message: error.message });
  }
};


