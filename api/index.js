import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.models.js';
import userRoutes from './routes/user.route.js';
dotenv.config();



mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB!!!');
}).catch((err) => {
    console.log('Connection Failed');
});
const app = express();

app.listen(3900, () => {
    console.log('Server is running on port 3900');
    });


app.get('/api/user',userRoutes);    

