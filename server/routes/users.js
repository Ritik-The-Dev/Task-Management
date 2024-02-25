import express from "express"; // Importing Express framework
import { login, signup } from "../controllers/auth.js"; // Importing login and signup controller functions from auth.js
import {
  AddTask,
  getAllTask,
  deleteTask,
  updateTask,
} from "../controllers/tasks.js"; // Importing task-related controller functions from tasks.js
import auth from "../middleware/auth.js"; // Importing authentication middleware

const router = express.Router(); // Creating a router object using Express.Router()

// Define routes with corresponding controller functions and middleware
router.post("/signup", signup); // Route for user signup
router.post("/login", login); // Route for user login
router.post("/AddTask", auth, AddTask); // Route for adding a new task (requires authentication)
router.get("/getTask", auth, getAllTask); // Route for retrieving all tasks (requires authentication)
router.delete("/deleteTask/:id", auth, deleteTask); // Route for deleting a task by ID (requires authentication)
router.put("/updateTask/:id", auth, updateTask); // Route for updating a task by ID (requires authentication)

export default router; // Exporting the router object to be used in other parts of the application
