import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { createTask, fetchTasks } from "../redux/taskSlice";
import { formatDueDate, getMinDateTime } from "../utils/dateUtils";
import useToast from "../hooks/useToast";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";  // Import icons for mobile buttons

const TaskModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stripHTML = (input) => input.replace(/<\/?[^>]+(>|$)/g, "");

  const resetForm = () => {
    setTaskName("");
    setDescription("");
    setDueDate("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTaskName = stripHTML(taskName.trim());
    const trimmedDescription = stripHTML(description.trim());

    if (!trimmedTaskName || !dueDate) {
      showError("Task Title and Due Date are required.");
      return;
    }

    if (new Date(dueDate) < new Date()) {
      showError("Due Date cannot be in the past.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await dispatch(
        createTask({
          taskName: trimmedTaskName,
          description: trimmedDescription,
          dueDate: formatDueDate(dueDate),
        })
      ).unwrap();

      if (result && (result.code === 200 || result.code === 201)) {
        showSuccess(result.message);
        dispatch(fetchTasks());

        resetForm();
        onClose();
      } else {
        showError(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Failed to create task:", error);
      showError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-lg transition-all">
          <Dialog.Title className="text-2xl font-bold mb-6 text-center">
            Add New Task
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Task Title */}
            <div className="flex flex-col">
              <label htmlFor="taskName" className="font-medium mb-1">
                Task Title <span className="text-red-500">*</span>
              </label>
              <input
                id="taskName"
                type="text"
                placeholder="e.g., Design Landing Page"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </div>

            {/* Task Description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                placeholder="e.g., Create the homepage design using Figma."
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Due Date */}
            <div className="flex flex-col">
              <label htmlFor="dueDate" className="font-medium mb-1">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                id="dueDate"
                type="datetime-local"
                min={getMinDateTime()}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center mt-4 space-x-3">
              <button
                type="button"
                className="bg-gray-300 text-black rounded-md px-4 py-2 text-sm w-full sm:w-auto sm:text-xs sm:px-3 sm:py-1 flex justify-center items-center space-x-2"
                onClick={onClose}
              >
                <span className="hidden sm:block">Cancel</span>
                <span className="sm:hidden"><FaSignOutAlt /></span>
              </button>
              <button
                type="submit"
                className={`bg-blue-600 text-white rounded-md px-4 py-2 text-sm w-full sm:w-auto sm:text-xs sm:px-3 sm:py-1 flex justify-center items-center space-x-2 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                <span className="hidden sm:block">{isSubmitting ? "Submitting..." : "Add Task"}</span>
                <span className="sm:hidden">{isSubmitting ? <FaPlus className="animate-spin" /> : <FaPlus />}</span>
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TaskModal;
