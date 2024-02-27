import React, { useState } from "react";
import { ADD_TASK_ROUTE, EDIT_TASK_ROUTE } from "../../Api";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import { reducerCases, useStateProvider } from "../../context/StateContext";

function AddToDo({ editTask = undefined, setHandleEdit, setAddToDos }) {
  const [{ userInfo }, dispatch] = useStateProvider();
  const[enable,setEnable] = useState(true)
  // State variables for title, date, description, and completion status
  const [title, setTitle] = useState(editTask ? editTask?.TaskTitle : "");
  const [date, setDate] = useState(
    editTask ? editTask?.dueDate.substring(0, 10) : ""
  );
  const [description, setDescription] = useState(
    editTask ? editTask?.TaskBody : ""
  );
  const [completed, setCompleted] = useState(editTask?.Completed);

  // Function to handle adding a new task
  const handleClick = async (e) => {
    e.preventDefault();
    setEnable(false)
    try {
      if (!title || !date || !description || !userInfo) {
        return alert("All Fields are Mandatory");
      }

      // Set headers with token
      const headers = {
        Authorization: `Bearer ${userInfo?.token}`,
      };
      const { data } = await axios.post(
        ADD_TASK_ROUTE,
        { title, date, description },
        { headers }
      );
      if (data.message === "Task added successfully") {
        alert("Task Added Successfully");
        const tasks = data?.user?.tasks;
        dispatch({ type: reducerCases.SET_USER_TASK, userTask: { tasks } });
        setAddToDos(undefined);
      }
    setEnable(true)
  } catch (err) {
      setEnable(true)
      console.log(err);
    }
  };

  // Function to handle editing an existing task
  const EdithandleClick = async (e) => {
    e.preventDefault();
    setEnable(false)
    try {
      if (!title || !date || !description || !userInfo) {
        return alert("All Fields are Mandatory");
      }

      // Set headers with token
      const headers = {
        Authorization: `Bearer ${userInfo?.token}`,
      };
      const { data } = await axios.put(
        `${EDIT_TASK_ROUTE}/${editTask?._id}`,
        { title, date, description, completed },
        { headers }
      );
      if (data.message === "Task successfully updated") {
        alert("Task updated Successfully");
        const tasks = data?.updatedTask?.tasks;
        dispatch({ type: reducerCases.SET_USER_TASK, userTask: { tasks } });
        setHandleEdit(undefined);
      }
    setEnable(true)
  } catch (err) {
      setEnable(true)
      console.log(err);
    }
  };

  // Function to handle date change
  const handleDateChange = (newDate) => {
    // Validate if the newDate falls within the allowed range
    const minDate = new Date().toISOString().split("T")[0]; // Get today's date
    const maxDate = "2099-12-31"; // Set maximum date as 2099-12-31
    if (newDate < minDate || newDate > maxDate) {
      // If the new date is outside the range, set it to the closest boundary
      newDate = newDate < minDate ? minDate : maxDate;
    }
    // Update the date state
    setDate(newDate);
  };

  return (
    <>
      {editTask ? (
        // Render form for editing an existing task within a modal
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
            <div className="flex items-center justify-end">
              <IoMdCloseCircle
                onClick={() => setHandleEdit(undefined)}
                className="text-3xl hover:text-gray-500"
              />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-center">
              Edit Todo Task
            </h1>
            <form>
              {/* Title input field */}
              <label htmlFor="title" className="text-1xl font-bold">
                Title
              </label>
              <input
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {/* Due date input field */}
              <label htmlFor="date" className="text-1xl font-bold">
                Due Date
              </label>
              <input
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                type="date"
                placeholder="Due Date"
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
                min={new Date().toISOString().split("T")[0]} // Set minimum date as today
                max="2099-12-31" // Set maximum date as 2099-12-31
              />
              {/* Description input field */}
              <label htmlFor="description" className="text-1xl font-bold">
                Description
              </label>
              <textarea
                className="w-full h-[20vh] mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {/* Checkbox to toggle completion status */}
              <label className="block mb-4">
                <input
                  type="checkbox"
                  checked={completed === "true"} // Convert completed to boolean
                  onChange={(e) =>
                    setCompleted(e.target.checked ? "true" : "false")
                  } // Convert to string "true" or "false"
                  className="mr-2"
                />
                Completed
              </label>
              {/* Button to edit task */}
              <button
                className={`w-full px-4 py-2 ${enable ? "bg-blue-500 focus:bg-blue-600 hover:bg-blue-600" : "bg-gray-500 focus:bg-gray-600 hover:bg-gray-600"} text-white rounded-md focus:outline-none`}
                onClick={enable ? EdithandleClick : undefined}
              >
                Edit Task
              </button>
            </form>
          </div>
        </div>
      ) : (
        // Render form for adding a new task within a modal
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
            <div className="flex items-center justify-end">
              <IoMdCloseCircle
                onClick={() => setAddToDos(undefined)}
                className="text-3xl hover:text-gray-500"
              />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-center">
              Add Todo Task
            </h1>
            <form>
              {/* Title input field */}
              <label htmlFor="title" className="text-1xl font-bold">
                Title
              </label>
              <input
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {/* Due date input field */}
              <label htmlFor="date" className="text-1xl font-bold">
                Due Date
              </label>
              <input
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                type="date"
                placeholder="Due Date"
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
                min={new Date().toISOString().split("T")[0]} // Set minimum date as today
                max="2099-12-31" // Set maximum date as 2099-12-31
              />
              {/* Description input field */}
              <label htmlFor="description" className="text-1xl font-bold">
                Description
              </label>
              <textarea
                className="w-full h-[20vh] mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {/* Button to add task */}
              <button
                className={`w-full px-4 py-2 text-white rounded-md ${enable ? "bg-blue-500 focus:bg-blue-600 hover:bg-blue-600" : "bg-gray-500 focus:bg-gray-600 hover:bg-gray-600"} focus:outline-none`}
                onClick={enable ? handleClick : undefined}
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddToDo;