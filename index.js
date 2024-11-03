import express from "express";
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js"; // Make sure your socket server is set up correctly

dotenv.config();

const PORT = process.env.PORT || 5000; // Default to port 5000 if not specified

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Allow your frontend origin (adjust as needed for production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
};

// Middleware
app.use(cors(corsOptions)); // Use the CORS middleware first
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoute); 
app.use("/api/v1/message", messageRoute);

// Health check or simple route
app.get('/', (req, res) => {
    res.send("Server is working");
});

// 404 handling for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const startServer = async () => {
    await connectDB(); // Connect to the database
    server.listen(PORT, () => {
        console.log(`Server listening at port ${PORT}`);
    });
};

// Call the startServer function to initiate the server
startServer().catch(err => {
    console.error("Failed to start the server:", err);
});
