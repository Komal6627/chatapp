import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import userRoutes from "./routes/userRoutes.js"


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connected Succesfully");    
})
.catch((err) => {
    console.log(err);
    
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT ${process.env.PORT}`);
    
})

