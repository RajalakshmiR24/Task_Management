import React from 'react';
import { MoreVertical } from 'lucide-react';

const TaskTable = ({ tasks, menuOpenId, setMenuOpenId, indexOfFirstTask }) => {
  return (
    <>
      {/* Desktop Table */}
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
            {tasks.map((task, index) => (
              <tr
                key={task.id}
                className="bg-white shadow-md rounded-md my-2 hover:shadow-lg transition"
              >
                <td className="p-4">{indexOfFirstTask + index + 1}</td>
                <td className="p-4">{task.date}</td>
                <td className="p-4 font-semibold">{task.title}</td>
                <td className="p-4">{task.description}</td>
                <td className="p-4 relative">
                  <button onClick={() => setMenuOpenId(menuOpenId === task.id ? null : task.id)}>
                    <MoreVertical />
                  </button>
                  {menuOpenId === task.id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10">
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="bg-white shadow-md rounded-md p-4 mb-4 relative"
          >
            <h2 className="font-semibold text-lg">{task.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            <p className="text-sm text-gray-500 mt-2">{task.date}</p>

            <div className="absolute top-4 right-4">
              <button onClick={() => setMenuOpenId(menuOpenId === task.id ? null : task.id)}>
                <MoreVertical />
              </button>
              {menuOpenId === task.id && (
                <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Delete</button>
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
