import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { storedata } from './controller/user.js';
// import { sendMail } from './controller/sendMail.js';


const app = express();
app.use(express.json());


const connectDB = async () => {

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        if (conn) {
            console.log('MongoDB connected');
        }
    }
    catch(e) {
        console.log(e.message);
    }
  
};
connectDB();

app.post("/storedata", storedata);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
