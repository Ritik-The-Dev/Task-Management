import jwt from "jsonwebtoken"; // Importing jwt for token verification

// Middleware function for user authentication
const auth = (req, res, next) => {
  try {
    // Extract token from request headers
    const token = req.headers.authorization.split(" ")[1];
    
    // Verify the token using JWT and extract decoded data
    let decodeData = jwt.verify(token, process.env.JWT_SECRET);
    
    // Extract userId from decoded data and add it to request object
    req.userId = decodeData?.id;
    
    // Call next middleware function
    next();
  } catch (error) {
    console.log(error); // Log any errors
  }
};

export default auth; // Export the middleware function
