import mongoose from "mongoose";
import User from "../models/User.js"; // Importing the User model

// Controller function to add a new task
export const AddTask = async (req, res) => {
  const { title, date, description } = req.body;
  const userId = req.userId;

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new task object
    const newTask = {
      TaskTitle: title,
      dueDate: date,
      TaskBody: description
    };

    // Add the new task to the tasks array
    user.tasks.push(newTask);
    
    // Save the updated user object
    await user.save();

    res.status(200).json({ message: "Task added successfully", user:{name:user.name,email:user.email,_id:user._id,tasks:user.tasks,joinedOn:user.joinedOn} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get all tasks for a user
export const getAllTask = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve the tasks array from the user object
    const taskList = user.tasks;

    res.status(200).json(taskList);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to delete a task
export const deleteTask = async (req, res) => {
  const { id: TaskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(TaskId)) {
    return res.status(404).send("Task ID is invalid...");
  }

  try {
    const userId = req.userId;
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { tasks: { _id: TaskId } }
    }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve the tasks array from the user object
    const taskList = user.tasks;

    res.status(200).json({ message: "Task successfully deleted" , updatedTask: taskList });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update a task
export const updateTask = async (req, res) => {
  const { id: TaskId } = req.params;
  const { title:TaskTitle, description:TaskBody, completed:Completed, date:dueDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(TaskId)) {
    return res.status(404).send("Task ID is invalid...");
  }

  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const task = user.tasks.find(task => task._id.toString() === TaskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update task properties if provided in the request body
    if (TaskTitle) task.TaskTitle = TaskTitle;
    if (TaskBody) task.TaskBody = TaskBody;
    if (Completed) task.Completed = Completed;
    if (dueDate) task.dueDate = dueDate;

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: "Task successfully updated", updatedTask: {name:user.name,email:user.email,_id:user._id,tasks:user.tasks,joinedOn:user.joinedOn} });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
