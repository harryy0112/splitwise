import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="md:hidden p-4 text-green-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`bg-green-100 h-full w-64 shadow-md flex-none fixed top-0 left-0 transform transition-transform duration-300 md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
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
    </div>
  );
};

export default Sidebar;
