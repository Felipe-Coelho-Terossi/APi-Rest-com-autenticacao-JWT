import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://a-pi-rest-com-autenticacao-jwt.vercel.app'
  ]
}));

app.use(express.json());
app.use('/auth', authRoutes);

export default app;