import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // Importing the User model
import dotenv from 'dotenv';
dotenv.config();

// Controller function for user signup
export const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    // Check if a user with the provided email already exists
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create a new user record in the database
    const newUser = await User.create({
      name:userName,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token for the newly created user
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      {  expiresIn: "30d" }
    );
    // Return success response with the newly created user and token
    res.status(200).json({ result: {name:newUser.name,email:newUser.email,_id:newUser._id,tasks:newUser.tasks,joinedOn:newUser.joinedOn}, token, success:true });
  } catch (error) {
    // Handle errors
    res.status(500).json("Something went wrong...");
  }
};

// Controller function for user login
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find the user with the provided email
    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }
    // Check if the provided password matches the hashed password stored in the database
    const isPasswordCorrect = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      {  expiresIn: "3d" }
    ); 

    // Return success response with the authenticated user and token
    res.status(200).json({ result: {name:existinguser.name,email:existinguser.email,_id:existinguser._id,tasks:existinguser.tasks,joinedOn:existinguser.joinedOn}, token, success:true });
  } catch (error) {
    console.log(error)
    // Handle errors
    res.status(500).json("Something went wrong...", error);
  }
};
