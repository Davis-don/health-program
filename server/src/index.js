import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clientRoutes } from './routes/clientRoutes.js';
import { programRoutes } from './routes/programRoutes.js';
import { enrollmentRoutes } from './routes/enrollmentRoutes.js'; 
const app = express();

dotenv.config();

const port = process.env.PORT



//cors used here
app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET','POST','PATCH','DELETE','PUT'],
    credentials: true,
}))
app.use(express.json()); 


app.use("/clients", clientRoutes);
app.use("/programs", programRoutes);
app.use("/enrollments", enrollmentRoutes);

app.get('/', (_req, res) => {
  res.send('SERVER IS TUNNING');
}   );

app.listen(port, () => {
  console.log('Server is running on port 4000');
});