import React, { useEffect, useState, useRef } from "react";
import { Plus, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../redux/taskSlice";
import { useNavigate } from "react-router-dom";
import TaskTable from "../Components/Table";
import TaskModal from "../Components/TaskModal";
import Pagination from "../Components/Pagination";
import useToast from "../hooks/useToast"; // ✅ Custom toast hook

const Task = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast(); // ✅ Use custom hook
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [isOpen, setIsOpen] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      dispatch(fetchTasks())
        .unwrap()
        .then((data) => {
          showSuccess(data?.message);
        })
        .catch((err) => {
          showError(err);
        });
    }
  }, [dispatch, showSuccess, showError]);

  const validTasks = Array.isArray(tasks) ? tasks : [];
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = validTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(validTasks.length / tasksPerPage);

  const handleLogout = () => {
    localStorage.removeItem("token");
    showSuccess("Logged out successfully!");
    navigate("/");
  };

  const handleAddTask = () => {
    setIsOpen(true);
  };

  const handleDeleteConfirmation = (taskId) => {
    setDeleteTaskId(taskId);
  };

  const handleDelete = async () => {
    if (!deleteTaskId) return;
  
    const idToDelete = deleteTaskId;
    setDeleteTaskId(null);
  
    try {
      const deleteResponse = await dispatch(deleteTask(idToDelete)).unwrap();
      showSuccess(deleteResponse.message); // ✅ Dynamic message
  
      await dispatch(fetchTasks()).unwrap();
    } catch (error) {
      showError(error);
    }
  };
  

  const handleCancelDelete = () => {
    setDeleteTaskId(null);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-blue-700">
          Tasks Management
        </h1>

        <div className="flex gap-4">
          <button
            onClick={handleAddTask}
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
            onDelete={handleDeleteConfirmation}
          />

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </>
      )}

      <TaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {deleteTaskId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>Are you sure you want to delete this task?</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
