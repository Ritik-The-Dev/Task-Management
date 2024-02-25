import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import ToDo from "./Components/ToDo/ToDo";

const AllRoutes = () => {
  return (
    <Routes>
      {/* Route for the ToDo component, which is rendered at the root path */}
      <Route path="/" element={<ToDo />} />
      {/* Route for the Login component, which is rendered at the /login path */}
      <Route path="/login" element={<Login />} />
      {/* Route for the SignUp component, which is rendered at the /signUp path */}
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
};

export default AllRoutes;
