import React, { useState } from "react";

const TransactionList = ({ transactions }) => {
  const [selectedParticipant, setSelectedParticipant] = useState("");

  // Filter transactions based on the selected participant
  const filteredTransactions = transactions.filter((transaction) =>
    selectedParticipant === ""
      ? true
      : transaction.splitAmong.includes(selectedParticipant)
  );

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-xl font-semibold text-green-700 mb-4">
        Transactions
      </h2>

      {/* Participant Filter Dropdown */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mr-2">
          Filter by participant:
        </label>
        <select
          value={selectedParticipant}
          onChange={(e) => setSelectedParticipant(e.target.value)}
          className="border border-green-200 rounded-md p-2"
        >
          <option value="">All Participants</option>
          {/* Generate dropdown options dynamically */}
          {[
            ...new Set(
              transactions.flatMap((transaction) => transaction.splitAmong)
            ),
          ].map((participant) => (
            <option key={participant} value={participant}>
              {participant}
            </option>
          ))}
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="text-gray-500">No transactions available</p>
      ) : (
        filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-green-50 p-4 mb-4 border border-green-200 rounded-md shadow-sm"
          >
            <p className="text-sm text-green-600">{transaction.description}</p>
            <p className="font-semibold">
              Amount: ₹{transaction.amount.toFixed(2)}
            </p>
            <p>
              Paid by:{" "}
              <span className="text-green-600 font-medium">
                {transaction.paidBy}
              </span>
            </p>
            <p>Split among: {transaction.splitAmong.join(", ")}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;
