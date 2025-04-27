import React from "react";
import { MoreVertical } from "lucide-react";

const TaskTable = ({ tasks, menuOpenId, setMenuOpenId, indexOfFirstTask, onDelete }) => {
  // Ensure tasks is always an array and each task has a valid dueDate
  const safeTasks = Array.isArray(tasks) ? tasks.filter(task => task?.dueDate) : [];

  const toggleMenu = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="w-full text-left">
          <thead className="text-blue-700">
            <tr>
              <th className="py-2">No</th>
              <th className="py-2">Date & Time</th>
              <th className="py-2">Task</th>
              <th className="py-2">Description</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {safeTasks.map((task, index) => (
              <tr
                key={task._id}  // Using _id to ensure unique key for each task
                className="bg-white shadow-md rounded-md my-2 hover:shadow-lg transition"
              >
                <td className="p-4">{indexOfFirstTask + index + 1}</td>
                <td className="p-4">{new Date(task.dueDate).toLocaleString()}</td>
                <td className="p-4 font-semibold">{task.taskName}</td>
                <td className="p-4">{task.description}</td>
                <td className="p-4 relative">
                  <button onClick={() => toggleMenu(task._id)}>
                    <MoreVertical />
                  </button>
                  {menuOpenId === task._id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10">
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Edit
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => onDelete(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {safeTasks.map((task) => (
          <div
            key={task._id}  // Using _id to ensure unique key for each task
            className="bg-white shadow-md rounded-md p-4 mb-4 relative"
          >
            <h2 className="font-semibold text-lg">{task.taskName}</h2>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(task.dueDate).toLocaleString()}
            </p>

            <div className="absolute top-4 right-4">
              <button onClick={() => toggleMenu(task._id)}>
                <MoreVertical />
              </button>
              {menuOpenId === task._id && (
                <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Edit
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => onDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskTable;
