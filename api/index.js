import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.models.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
dotenv.config();



mongoose.connect('mongodb://0.0.0.0/DNK').then(() => {
    console.log('Connected to MongoD!!!');
}).catch((err) => {
    console.log('Connection Failed', err);
    // console.log('Connection Failed');
});

const app = express();
app.use(express.json());

app.listen(3900, () => {
    console.log('Server is running on port 3900');
    });

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/api/user',userRoutes);    
app.use('/api/auth',authRoutes);

app.use((err,req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
