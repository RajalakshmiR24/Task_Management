// src/Pages/Task.js

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskTable from '../Components/Table';
import TaskModal from '../Components/TaskModal';
import Pagination from '../Components/Pagination';

const tasksData = [
  {
    id: 1,
    date: '2/02/2024 2:00 PM',
    title: 'Design Navaratri poster',
    description: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero',
  },
  {
    id: 2,
    date: '2/02/2024 2:00 PM',
    title: 'Design Navaratri poster',
    description: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero',
  },
  {
    id: 3,
    date: '2/02/2024 2:00 PM',
    title: 'Design Navaratri poster',
    description: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero',
  },
  {
    id: 4,
    date: '2/02/2024 2:00 PM',
    title: 'Design Navaratri poster',
    description: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero',
  },
  {
    id: 5,
    date: '2/02/2024 2:00 PM',
    title: 'Design Navaratri poster',
    description: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero',
  },
  {
    id: 6,
    date: '2/02/2024 2:00 PM',
    title: 'Design Navaratri poster',
    description: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero',
  },
];

const Task = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasksData.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasksData.length / tasksPerPage);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-blue-700">Tasks Management</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-800"
        >
          <Plus size={20} /> Add Task
        </button>
      </div>

      {/* Task Table */}
      <TaskTable
        tasks={currentTasks}
        menuOpenId={menuOpenId}
        setMenuOpenId={setMenuOpenId}
        indexOfFirstTask={indexOfFirstTask}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* Add Task Modal */}
      <TaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Task;
