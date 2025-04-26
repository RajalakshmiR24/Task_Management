// src/components/TaskModal.js

import React from 'react';
import { Dialog } from '@headlessui/react';

const TaskModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-8 rounded-lg w-full max-w-lg shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">Add Task</Dialog.Title>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Task Title"
              className="border p-2 rounded-md focus:outline-blue-500"
            />
            <textarea
              placeholder="Description"
              className="border p-2 rounded-md focus:outline-blue-500 h-24"
            ></textarea>
            <input
              type="datetime-local"
              className="border p-2 rounded-md focus:outline-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
              >
                Save
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TaskModal;
