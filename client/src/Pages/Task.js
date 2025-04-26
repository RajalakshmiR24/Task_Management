import React, { useEffect, useState } from "react";
import { Plus, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/taskSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TaskTable from "../Components/Table";
import TaskModal from "../Components/TaskModal";
import Pagination from "../Components/Pagination";

const Task = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [isOpen, setIsOpen] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  useEffect(() => {
    dispatch(fetchTasks())
      .unwrap()
      .then((data) => {
        toast.success(data.message || "Tasks loaded successfully!");
      })
      .catch((err) => {
        toast.error(err || "Failed to load tasks");
      });
  }, [dispatch]);
  

  const validTasks = Array.isArray(tasks) ? tasks : [];

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = validTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(validTasks.length / tasksPerPage);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-blue-700">Tasks Management</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-800"
          >
            <Plus size={20} /> Add Task
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <TaskTable
            tasks={currentTasks}
            menuOpenId={menuOpenId}
            setMenuOpenId={setMenuOpenId}
            indexOfFirstTask={indexOfFirstTask}
          />

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </>
      )}

      <TaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Task;
