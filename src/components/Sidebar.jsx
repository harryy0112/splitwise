import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <button className="md:hidden p-4 text-green-600" onClick={toggleSidebar}>
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-green-100 h-full w-64 shadow-md fixed top-0 left-0 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="p-4 h-full flex flex-col">
          <button
            className="md:hidden p-2 text-green-600"
            onClick={closeSidebar}
          >
            <FaTimes size={24} />
          </button>
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
