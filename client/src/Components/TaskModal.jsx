import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { createTask, fetchTasks } from '../redux/taskSlice';
import useToast from '../hooks/useToast';  

const TaskModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();  

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stripHTML = (input) => input.replace(/<\/?[^>]+(>|$)/g, "");

  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const formatDueDate = (dateString) => {
    const localDate = new Date(dateString);
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const year = localDate.getFullYear();
    let hours = localDate.getHours();
    const minutes = String(localDate.getMinutes()).padStart(2, '0');
    const meridian = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedHours = String(hours).padStart(2, '0');
    return `${month}/${day}/${year} ${formattedHours}:${minutes} ${meridian}`;
  };

  const resetForm = () => {
    setTaskName('');
    setDescription('');
    setDueDate('');
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
      const result = await dispatch(createTask({
        taskName: trimmedTaskName,
        description: trimmedDescription,
        dueDate: formatDueDate(dueDate),
      })).unwrap();

      
      if (result && (result.code === 200 || result.code === 201)) {
        showSuccess(result.message);
        dispatch(fetchTasks()); 

        resetForm();
        onClose();
      } else {
        showError(result.message || "Something went wrong. Please try again.");
      }

    } catch (error) {
      console.error('Failed to create task:', error);
      showError(error.message || "Something went wrong. Please try again."); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-lg transition-all">
          <Dialog.Title className="text-2xl font-bold mb-6 text-center">Add New Task</Dialog.Title>

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

            {/* Description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                placeholder="e.g., Create a responsive landing page for the new product launch"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none h-28 resize-none"
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
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={dueDate}
                min={getMinDateTime()}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-md text-white transition
                  ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TaskModal;
