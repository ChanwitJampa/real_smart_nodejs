import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import auth  from './middleware/auth.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import  cors from 'cors';
import userRoute from './routes/userRouters.js'
import loginRoute from './routes/loginRouters.js'
dotenv.config();


connectDB()
const port = 5000
const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))




app.use('/api/users',userRoute)
app.use('/api/login',loginRoute)





app.use(errorHandler)

app.listen(port, () => console.log('server startedon port', port))