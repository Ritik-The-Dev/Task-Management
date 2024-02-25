import React, { useEffect, useState } from "react";
import { reducerCases, useStateProvider } from "../../context/StateContext";
import { useNavigate } from "react-router-dom";
import AddToDo from "./AddToDo";
import axios from "axios";
import { DELETE_TASK_ROUTE, GET_TASK_ROUTE } from "../../Api";
import ShowToDo from "./ShowToDo";
import { IoMdAddCircleOutline } from "react-icons/io";

function ToDo() {
  const navigate = useNavigate();
  const [{ userInfo, userTask }, dispatch] = useStateProvider();
  const [handleEdit, setHandleEdit] = useState(undefined);
  const [showTask, setshowTask] = useState(undefined);
  const [AddToDos, setAddToDos] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("addedOn"); // Default sorting by addedOn

  useEffect(() => {
    // Check if user is logged in, if not redirect to login page
    if (!userInfo) {
      const profileString = localStorage.getItem("userInfo");
      if (!profileString || profileString === "undefined") {
        alert("You Need to Login or SignUp to add or View task");
        navigate("/login");
        return;
      }
      const profile = profileString ? JSON.parse(profileString) : null;
      if (!profile) {
        alert("You Need to Login or SignUp to add or View task");
        navigate("/login");
        return;
      }
      dispatch({
        type: reducerCases.SET_USER_INFO,
        userInfo: profile,
      });
    }
    // Fetch tasks if userTask state is empty
    if (!userTask) {
      getTask();
    }
  }, [userInfo, userTask, dispatch, navigate]);

  const getTask = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${userInfo?.token}`,
      };
      const { data } = await axios.get(GET_TASK_ROUTE, { headers });
      const tasks = data;
      dispatch({ type: reducerCases.SET_USER_TASK, userTask: { tasks } });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${userInfo.token}`,
      };
      const { data } = await axios.delete(`${DELETE_TASK_ROUTE}/${id}`, {
        headers,
      });
      const tasks = data.updatedTask;
      dispatch({ type: reducerCases.SET_USER_TASK, userTask: { tasks } });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    alert("Logout Successfully");
    navigate("/login");
    dispatch({
      type: reducerCases.SET_USER_INFO,
      userInfo: null,
    });
    dispatch({
      type: reducerCases.SET_USER_TASK,
      userTask: null,
    });
    localStorage.clear();
  };

  const handleLogin = async () => {
    navigate("/login");
  };

  // Filter tasks based on search query and sort them based on selected option
  const filteredTasks = userTask?.tasks?.filter((task) =>
    task.TaskTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = filteredTasks?.sort((a, b) => {
    switch (sortBy) {
      case "dueDate":
        return new Date(a.dueDate) - new Date(b.dueDate);
      case "completed":
        return (a.Completed === "true" ? 1 : 0) - (b.Completed === "true" ? 1 : 0);
      case "addedOn":
      default:
        return new Date(b.addedOn) - new Date(a.addedOn);
    }
  });

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome message */}
        <h1 className="lg:text-3xl md:text-3xl text-2xl font-bold mb-4 flex text-center w-full items-center justify-center">Welcome {userInfo?.result?.name}</h1><br />
        {/* Task management section */}
        <div className="flex items-center justify-between">
          <div>
            {/* Title and Add Task button */}
            <h1 className="text-3xl font-bold mb-4">Todo Tasks</h1>
            <button
              onClick={() => setAddToDos(true)}
              className="text-blue-500 mb-4 inline-block hover:text-blue-900"
            >
              <span className="flex items-center justify-center text-1xl font-bold mb-4 text-center">Add Todo <span><IoMdAddCircleOutline className="text-2xl"/></span></span>
            </button>
          </div>
          <div>
            {/* Login/Logout button */}
            <button
              className={`w-full px-4 py-2 ${userInfo?"bg-red-500":"bg-blue-500"} text-white rounded-md ${userInfo?"hover:bg-red-800":"hover:bg-blue-600"} focus:outline-none focus:${userInfo?"bg-red-600":"bg-blue-600"}`}
              onClick={userInfo ? handleLogout : handleLogin}
            >
              {userInfo ? "Logout" : "Login"}
            </button>
          </div>
        </div>
        {/* Search and sort section */}
        <div className="md:flex items-center justify-center lg:flex ">
          <input
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search Tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="w-full md:w-[30%] lg:w-[22%] mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="addedOn">Sort by Added On</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="completed">Sort by Completion</option>
          </select>
        </div>
        {/* Task list */}
        <ul className="space-y-4">
          {sortedTasks?.map((task) => (
            <li
              key={task._id}
              className="flex flex-col md:flex-row justify-between items-center bg-gray-100 rounded-lg p-4 shadow-md"
            >
              <span className={`text-lg w-full ${task.Completed === "true" ? "line-through font-bold" : "font-semibold"} mb-2 md:mb-0 md:mr-4 hover:cursor-pointer hover:text-blue-500`} onClick={() => setshowTask(task)}>
                {task.TaskTitle}
              </span>
              <div className="flex">
                {/* Edit and Delete buttons */}
                <button
                  onClick={() => setHandleEdit(task)}
                  className="text-blue-500 hover:text-blue-600 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Modals for adding, editing, and viewing tasks */}
      {handleEdit && <AddToDo editTask={handleEdit} setHandleEdit={setHandleEdit} />}
      {AddToDos && <AddToDo setAddToDos={setAddToDos} />}
      {showTask && <ShowToDo showTask={showTask} setshowTask={setshowTask} />}
    </>
  );
}

export default ToDo;
