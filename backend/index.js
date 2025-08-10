import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'
import counterRoutes from './routes/counter.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/counter', counterRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});