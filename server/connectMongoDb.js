import mongoose from "mongoose"; // Importing Mongoose for MongoDB interaction

// Async function to establish connection with MongoDB
const connectDB = async () => {
  try {
    // Using await to asynchronously connect to MongoDB using the connection URL from environment variables
    await mongoose.connect(process.env.CONNECTION_URL)
      .then(() => console.log(`MongoDB Connected...`)) // Logging success message if connection is successful
      .catch((err) => console.log(err)); // Logging error if connection fails
  } catch (error) {
    console.error(error); // Logging any errors that occur during connection
    process.exit(1); // Exiting the process with an error code if connection fails
  }
};

export default connectDB; // Exporting the connectDB function to be used elsewhere
