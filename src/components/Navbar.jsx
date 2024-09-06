import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white flex justify-between items-center p-4">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold">Splitwise</h1>
      </div>
      <div>
        <button className="mx-2 py-1 px-4 bg-green-800 rounded hover:bg-green-700">
          Login
        </button>
        <button className="mx-2 py-1 px-4 bg-green-800 rounded hover:bg-green-700">
          Signup
        </button>
        <button className="mx-2 py-1 px-4 bg-green-800 rounded hover:bg-green-700">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
