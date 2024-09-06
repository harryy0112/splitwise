import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-green-100 h-full w-64 shadow-md flex-none">
      <div className="p-4 h-full flex flex-col">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul className="flex-1">
          <li className="mb-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-green-600 font-semibold" : "text-gray-700"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "text-green-600 font-semibold" : "text-gray-700"
              }
            >
              History
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
