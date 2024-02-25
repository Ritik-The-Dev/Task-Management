import express from "express"; // Importing Express framework
import cors from "cors"; // Importing CORS middleware for cross-origin requests
import dotenv from "dotenv"; // Importing dotenv for environment variables
import cookieParser from "cookie-parser"; // Importing cookie-parser middleware for handling cookies
import userRoutes from "./routes/users.js"; // Importing user routes from users.js
import connectDB from "./connectMongoDb.js"; // Importing database connection function

dotenv.config(); // Loading environment variables from .env file
connectDB(); // Connecting to MongoDB database
const app = express(); // Creating an Express application

// Middleware setup
app.use(cookieParser()); // Using cookie-parser middleware to parse cookies
app.use(express.json({ limit: "30mb", extended: true })); // Parsing incoming requests with JSON payloads
app.use(express.urlencoded({ limit: "30mb", extended: true })); // Parsing incoming requests with URL-encoded payloads
app.use(cors()); // Enabling CORS for all routes

// Route setup
app.use("/user", userRoutes); // Using user routes defined in users.js

const PORT = process.env.PORT || 5000; // Setting up the port number from environment variables or defaulting to 5000

// Starting the server and listening on the specified port
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Handling a GET request to the root endpoint
app.get("/", (req, res) => {
  res.send("This is a Task Management API"); // Sending a response for the root endpoint
});
