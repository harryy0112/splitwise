import React, { useState } from "react";

const AddTransaction = ({ addTransaction, participants }) => {
  const [paidBy, setPaidBy] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [splitAmong, setSplitAmong] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !paidBy ||
      !amount ||
      splitAmong.length === 0 ||
      parseFloat(amount) <= 0
    )
      return;

    const newTransaction = {
      id: Date.now(),
      paidBy,
      amount: parseFloat(amount),
      description,
      splitAmong,
    };

    addTransaction(newTransaction);
    setPaidBy("");
    setAmount("");
    setDescription("");
    setSplitAmong([]);
  };

  const handleSplitAmongChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSplitAmong([...splitAmong, value]);
    } else {
      setSplitAmong(splitAmong.filter((person) => person !== value));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-3 bg-white rounded-md">
      <h2 className="text-xl font-semibold text-green-800 mb-3">
        Add a Transaction
      </h2>

      <div>
        <label className="block text-sm font-medium text-green-600">
          Paid By:
        </label>
        <select
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          className="w-full mt-1 p-2 border border-green-300 rounded-md focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Select Person</option>
          {participants.map((person) => (
            <option key={person} value={person}>
              {person}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-green-600">
          Amount:
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full mt-1 p-2 border border-green-300 rounded-md focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-green-600">
          Description:
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full mt-1 p-2 border border-green-300 rounded-md focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-green-600">
          Split Among:
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {participants.map((person) => (
            <label key={person} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={person}
                checked={splitAmong.includes(person)}
                onChange={handleSplitAmongChange}
                className="rounded"
              />
              <span>{person}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransaction;
