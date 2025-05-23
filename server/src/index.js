import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clientRoutes } from './routes/clientRoutes.js';
import { programRoutes } from './routes/programRoutes.js';
import { enrollmentRoutes } from './routes/enrollmentRoutes.js'; 
import { doctorRoutes } from './routes/doctorRoutes.js';

const app = express();
dotenv.config();

const port = process.env.PORT || 4000; // <--- Default to 4000 if PORT not set



//cors used here
app.use(cors({
  // origin:"http://localhost:5173",
  origin:"https://health-program.onrender.com",
  methods:['GET','POST','PATCH','DELETE','PUT'],
  credentials: true,
}))

app.use(express.json());

// Routes
app.use("/clients", clientRoutes);
app.use("/programs", programRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/doctors", doctorRoutes);
app.get('/', (_req, res) => {
  res.send('SERVER IS RUNNING');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
