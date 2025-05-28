import express from 'express';
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser'
import path from 'path';

import { fileURLToPath } from 'url';

// Get __filename and __dirname equivalents in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config()

const imageDir = path.join(process.cwd(), 'src', 'images');

app.use('/images', express.static(imageDir));

app.use('/api/auth',authRoutes)

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
})