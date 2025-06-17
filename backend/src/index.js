import express from 'express';
const app = express();
import { connectDB } from './db/dbConnection.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import './utils/Config.js';
import userRouter from './routes/authRoute.js'
import foodRoute from './routes/foodRoute.js'
import path from 'path';

const __dirname = path.resolve();

connectDB();
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
}));

app.use(cookieParser())
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use('/api/user', userRouter)
app.use('/api/food', foodRoute)

app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})