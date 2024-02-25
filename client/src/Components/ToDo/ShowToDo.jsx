import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

function ShowToDo({ showTask, setshowTask }) {
  return (
    // Render form for viewing a task within a modal
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        {/* Close button */}
        <div className="flex items-center justify-end">
          <IoMdCloseCircle
            onClick={() => setshowTask(undefined)}
            className="text-3xl hover:text-gray-500"
          />
        </div>
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-center">Todo Task</h1>
        <form>
          {/* Title input */}
          <label htmlFor="title" className="text-1xl font-bold">
            Title
          </label>
          <input
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Title"
            defaultValue={showTask?.TaskTitle}
            readOnly
          />
          {/* Due date input */}
          <label htmlFor="date" className="text-1xl font-bold">
            Due Date
          </label>
          <input
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="date"
            placeholder="Due Date"
            defaultValue={showTask?.dueDate.substring(0, 10)}
            readOnly
          />
          {/* Description input */}
          <label htmlFor="description" className="text-1xl font-bold">
            Description
          </label>
          <textarea
            className="w-full h-[20vh] mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Description"
            defaultValue={showTask?.TaskBody}
            readOnly
          />
          {/* Checkbox to display completion status */}
          <label
            className={`block mb-4 ${
              showTask?.Completed === "true" ? "text-green-600" : "text-red-600"
            }`}
          >
            <input
              type="checkbox"
              disabled={true}
              defaultChecked={showTask?.Completed === "true"} // Convert completed to boolean
              className="mr-2"
            />
            <span className="text-black font-bold">Completed :</span>{" "}
            {showTask?.Completed === "true"
              ? "Task Marked as Completed"
              : "Task is Incomplete"}
          </label>
          {/* Display task creation date */}
          <span className="text-black font-bold ">
            Task Create on :{" "}
            <span className="text-blue-500 font-semibold">
              {showTask?.addedOn.substring(0, 10)}
            </span>
          </span>
        </form>
      </div>
    </div>
  );
}

export default ShowToDo;
