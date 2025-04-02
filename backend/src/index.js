import express from 'express'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import dotenv from 'dotenv'

import {connectDB} from './lib/db.js'
import cookieParser from 'cookie-parser';

import cors from "cors";


const app = express();

app.use(express.json());
app.use(cookieParser());

dotenv.config();
const PORT = process.env.PORT;

app.use(cors({
  origin: "http://localhost:5173",  // Allow frontend origin
  credentials: true,  // Allow cookies/auth headers
}));
 
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
    connectDB();
})

