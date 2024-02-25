import mongoose from "mongoose"; // Importing mongoose for schema creation

// Define the schema for the user model
const userSchema = mongoose.Schema({
  name: { type: String, required: true }, // Name of the user (required)
  email: { type: String, required: true }, // Email of the user (required)
  password: { type: String, required: true }, // Password of the user (required)
  joinedOn: { type: Date, default: Date.now }, // Date when user joined (default is current date)
  tasks: [ // Array of tasks associated with the user
    {
      TaskId: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId }, // Unique identifier for the task (default generated ObjectId)
      TaskTitle: { type: String, required: "Task must have a title" }, // Title of the task (required)
      TaskBody: { type: String, required: "Task must have a body" }, // Body of the task (required)
      Completed: { type: String, default: false }, // Completion status of the task (default is false)
      addedOn: { type: Date, default: Date.now }, // Date when the task was added (default is current date)
      dueDate: { type: Date }, // Due date of the task
    }
  ]
});

// Export the mongoose model based on the user schema
export default mongoose.model("User", userSchema);