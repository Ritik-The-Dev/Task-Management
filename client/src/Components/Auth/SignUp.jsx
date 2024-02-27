import React, { useState } from "react";
import axios from "axios";
import { SIGNUP_ROUTE } from "../../Api";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  // State variables for username, email, and password
  const navigate = useNavigate();
  const[enable,setEnable] = useState(true)
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnable(false)
    try {
      // Check if username, email, and password are provided
      if (!userName || !email || !password) {
        return alert("All Fields are Mandatory");
      }
      // Send signup request
      const { data } = await axios.post(SIGNUP_ROUTE, {
        userName,
        email,
        password,
      });
      // If signup is successful, show success message and navigate to login page
      if (data.success) {
        alert("Sign Up Successful");
        navigate("/login");
      } else {
        console.log(data);
      }
    setEnable(true)
  } catch (err) {
      setEnable(true)
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={enable ? handleSubmit : undefined}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Username input field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="userName"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userName"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        {/* Email input field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Password input field */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          {/* Submit button */}
          <button
            className={`${enable ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-500 hover:bg-gray-700"} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="submit"
          >
            Sign Up
          </button>
          {/* Link to login page */}
          <Link to={"/login"}>
            <span className="text-blue-400">Log In</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
