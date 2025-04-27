// components/EditTaskModal.jsx
import React, { useState, useEffect } from "react";

const EditTaskModal = ({ isOpen, onClose, task, onSave }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTaskName(task.taskName);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      taskName,
      description,
    };
    onSave(updatedTask);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96 relative">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            ></textarea>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
