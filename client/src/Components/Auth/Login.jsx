import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_ROUTE } from "../../Api";
import { reducerCases, useStateProvider } from "../../context/StateContext";

function Login() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if email and password are provided
      if (!email || !password) {
        return alert("All Fields are Mandatory");
      }
      // Send login request
      const { data } = await axios.post(LOGIN_ROUTE, {
        email,
        password,
      });
      // If login is successful, update user info and navigate to home page
      if (data.success) {
        alert("Login Successful");
        dispatch({ type: reducerCases.SET_USER_INFO, userInfo: data });
        navigate("/");
      } else {
        // If login fails, display error message
        alert("Login Failed: " + data.message);
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          {/* Email input field */}
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          {/* Password input field */}
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
          {/* Login button */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
          {/* Link to signup page */}
          <Link to={"/signup"}>
            <span className="text-blue-400">Sign Up</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;