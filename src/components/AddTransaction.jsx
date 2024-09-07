import React, { useState } from "react";

const AddTransaction = ({ addTransaction, participants }) => {
  const [paidBy, setPaidBy] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [splitRatios, setSplitRatios] = useState(
    (participants || []).reduce((acc, person) => ({ ...acc, [person]: "" }), {})
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paidBy || !amount || parseFloat(amount) <= 0) return;

    const totalRatio = Object.values(splitRatios).reduce(
      (sum, ratio) => sum + (parseFloat(ratio) || 0),
      0
    );

    if (totalRatio === 0) return;

    const splitAmong = Object.keys(splitRatios).filter(
      (person) => splitRatios[person] > 0
    );

    const newTransaction = {
      id: Date.now(),
      paidBy,
      amount: parseFloat(amount),
      description,
      splitAmong,
      splitRatios: splitAmong.reduce(
        (acc, person) => ({
          ...acc,
          [person]: parseFloat(splitRatios[person]),
        }),
        {}
      ),
    };

    addTransaction(newTransaction);
    setPaidBy("");
    setAmount("");
    setDescription("");
    setSplitRatios(
      participants.reduce((acc, person) => ({ ...acc, [person]: "" }), {})
    );
  };

  const handleSplitRatioChange = (e, person) => {
    const { value } = e.target;
    setSplitRatios((prev) => ({ ...prev, [person]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Add a Transaction
      </h2>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Paid By:
          </label>
          <select
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
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
          <label className="block text-sm font-medium text-gray-600">
            Amount:
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Description:
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-600">
          Split Ratios:
        </label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {participants.map((person) => (
            <div key={person} className="flex items-center space-x-2">
              <span className="text-gray-700">{person}</span>
              <input
                type="number"
                value={splitRatios[person]}
                onChange={(e) => handleSplitRatioChange(e, person)}
                className="w-20 p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                placeholder="%"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransaction;
