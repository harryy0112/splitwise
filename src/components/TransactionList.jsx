import React from "react";

const TransactionList = ({ transactions }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-xl font-semibold text-green-700 mb-4">
        Transactions
      </h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet</p>
      ) : (
        transactions.map((transaction) => (
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
