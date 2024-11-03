// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({});



 
const PORT = process.env.PORT;

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
// const corsOption={
//     origin:'http://localhost:3000',
//     credentials:true
// };
// app.use(cors(corsOption)); 

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
  }));
// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
app.get('/temp',(req,res)=>{
    res.send("this is working")
})

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at prot ${PORT}`);
});

