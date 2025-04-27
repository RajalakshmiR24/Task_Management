import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { formatDueDate, getMinDateTime, formatDate } from "../utils/dateUtils";

const TaskTable = ({
  tasks,
  menuOpenId,
  setMenuOpenId,
  indexOfFirstTask,
  onDelete,
  onEdit,
}) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    taskName: "",
    description: "",
    dueDate: "",
  });

  const safeTasks = Array.isArray(tasks)
    ? tasks.filter((task) => task?.dueDate)
    : [];

  const toggleMenu = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditedTask({
      taskName: task.taskName,
      description: task.description,
      dueDate: new Date(task.dueDate).toISOString().slice(0, 16),
    });
    setMenuOpenId(null);
  };

  const handleSaveEdit = (taskId) => {
    const formattedDueDate = formatDueDate(editedTask.dueDate);

    const updatedTask = { taskId, ...editedTask, dueDate: formattedDueDate };

    console.log("Updated Task Payload:", updatedTask);

    onEdit(updatedTask);
    setEditingTaskId(null);
    setMenuOpenId(null);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setMenuOpenId(null);
  };

  return (
    <>
      {/* Desktop View */}
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
                key={task._id}
                className="bg-white shadow-md rounded-md my-2 hover:shadow-lg transition"
              >
                <td className="p-4">{indexOfFirstTask + index + 1}</td>
                <td className="p-4">
                  {editingTaskId === task._id ? (
                    <div className="flex flex-col">
                      <label htmlFor="dueDate" className="font-medium mb-1">
                        Due Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="dueDate"
                        type="datetime-local"
                        value={editedTask.dueDate}
                        min={getMinDateTime()}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            dueDate: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                  ) : (
                    formatDate(task.dueDate)
                  )}
                </td>

                <td className="p-4 font-semibold">
                  {editingTaskId === task._id ? (
                    <input
                      type="text"
                      value={editedTask.taskName}
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          taskName: e.target.value,
                        })
                      }
                      className="p-2 border rounded-md"
                    />
                  ) : (
                    task.taskName
                  )}
                </td>
                <td className="p-4">
                  {editingTaskId === task._id ? (
                    <textarea
                      value={editedTask.description}
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          description: e.target.value,
                        })
                      }
                      className="p-2 border rounded-md w-full"
                    />
                  ) : (
                    task.description
                  )}
                </td>
                <td className="p-4">
                  <div className="relative">
                    <button onClick={() => toggleMenu(task._id)}>
                      <MoreVertical />
                    </button>
                    {menuOpenId === task._id && !editingTaskId && (
                      <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10">
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleEditClick(task)}
                        >
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

                    {editingTaskId === task._id && (
                      <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10">
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleSaveEdit(task._id)}
                        >
                          Save
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {safeTasks.map((task, index) => (
          <div
            key={task._id}
            className="bg-white shadow-md rounded-md p-4 mb-4 relative"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">
                {editingTaskId === task._id ? (
                  <input
                    type="text"
                    value={editedTask.taskName}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, taskName: e.target.value })
                    }
                    className="p-2 border rounded-md w-full"
                  />
                ) : (
                  task.taskName
                )}
              </h2>
              <button onClick={() => toggleMenu(task._id)}>
                <MoreVertical />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {formatDate(task.dueDate)}
            </p>
            <div className="mt-2">
              {editingTaskId === task._id ? (
                <textarea
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
                  className="p-2 border rounded-md w-full"
                />
              ) : (
                <p>{task.description}</p>
              )}
            </div>

            {editingTaskId === task._id && (
              <div className="flex flex-col mt-4">
                <label htmlFor="dueDate" className="font-medium mb-1">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="dueDate"
                  type="datetime-local"
                  value={editedTask.dueDate}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, dueDate: e.target.value })
                  }
                  className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            )}

            {menuOpenId === task._id && !editingTaskId && (
              <div className="absolute right-4 top-12 w-28 bg-white border rounded shadow-lg z-10">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleEditClick(task)}
                >
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

            {editingTaskId === task._id && (
              <div className="absolute right-4 top-12 w-28 bg-white border rounded shadow-lg z-10">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSaveEdit(task._id)}
                >
                  Save
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskTable;
