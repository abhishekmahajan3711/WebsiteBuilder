import express from "express";
import dbCon from "./utils/db.js";
import dotenv from 'dotenv';
import cors from "cors";
import authRoutes from './routes/auth.js';
import websitesRoutes from './routes/websites.js';
import templatesRoutes from './routes/templates.js';
import previewRoutes from './routes/preview.js';
import contactRoutes from './routes/contact.js';
import paymentRoutes from './routes/payments.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api/auth', authRoutes);
app.use('/api/websites', websitesRoutes);
app.use('/api/templates', templatesRoutes);
app.use('/api/preview', previewRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dbCon();
});