import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white flex flex-col md:flex-row justify-between items-center p-4">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold">Splitwise</h1>
      </div>
      <div className="mt-2 md:mt-0">
        <button className="mx-1 md:mx-2 py-1 px-3 md:px-4 bg-green-800 rounded hover:bg-green-700">
          Login
        </button>
        <button className="mx-1 md:mx-2 py-1 px-3 md:px-4 bg-green-800 rounded hover:bg-green-700">
          Signup
        </button>
        <button className="mx-1 md:mx-2 py-1 px-3 md:px-4 bg-green-800 rounded hover:bg-green-700">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
