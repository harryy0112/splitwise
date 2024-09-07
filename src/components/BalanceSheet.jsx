import React, { useMemo, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const BalanceSheet = ({ balances, transactions }) => {
  const [showDetails, setShowDetails] = useState(null);

  // Calculate details about who owes whom and who is owed by whom
  const calculateDetails = (person) => {
    let owes = [];
    let owedTo = [];

    transactions.forEach((transaction) => {
      const {
        paidBy,
        amount,
        splitAmong = [], // Default to empty array
      } = transaction;

      const numPeople = splitAmong.length;
      const amountPerPerson = amount / numPeople;

      if (paidBy === person) {
        splitAmong.forEach((splitPerson) => {
          if (splitPerson !== person) {
            // Update the amount owed
            const existingEntry = owedTo.find(
              (entry) => entry.to === splitPerson
            );
            if (existingEntry) {
              existingEntry.amount = (
                parseFloat(existingEntry.amount) + amountPerPerson
              ).toFixed(2);
            } else {
              owedTo.push({
                to: splitPerson,
                amount: amountPerPerson.toFixed(2),
              });
            }
          }
        });
      } else if (splitAmong.includes(person)) {
        // Update the amount owed
        const existingEntry = owes.find((entry) => entry.to === paidBy);
        if (existingEntry) {
          existingEntry.amount = (
            parseFloat(existingEntry.amount) + amountPerPerson
          ).toFixed(2);
        } else {
          owes.push({
            to: paidBy,
            amount: amountPerPerson.toFixed(2),
          });
        }
      }
    });

    return { owes, owedTo };
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Balance Sheet</h2>
      <TransitionGroup className="space-y-4">
        {Object.keys(balances).map((person) => {
          // Memoize the calculation to avoid unnecessary recalculations
          const { owes, owedTo } = useMemo(
            () => calculateDetails(person),
            [person, transactions]
          );

          return (
            <CSSTransition key={person} timeout={500} classNames="fade">
              <div className="flex flex-col p-4 border border-green-200 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-green-800">
                      {person}
                    </span>
                    {balances[person] >= 0 ? (
                      <FaArrowUp className="text-green-600" title="Credit" />
                    ) : (
                      <FaArrowDown className="text-red-600" title="Debit" />
                    )}
                  </div>
                  <span
                    className={`${
                      balances[person] >= 0 ? "text-green-600" : "text-red-600"
                    } font-medium`}
                  >
                    {balances[person] >= 0
                      ? `₹${balances[person].toFixed(2)}`
                      : `₹${Math.abs(balances[person]).toFixed(2)}`}
                  </span>
                </div>

                {/* View Details Button */}
                <button
                  className="mt-2 text-green-600 underline"
                  onClick={() =>
                    setShowDetails(showDetails === person ? null : person)
                  }
                >
                  {showDetails === person ? "Hide Details" : "View Details"}
                </button>

                {/* Show Owe Details */}
                {showDetails === person && (
                  <div className="mt-4 bg-gray-100 p-4 rounded-md">
                    <h3 className="text-lg font-semibold text-green-700 mb-2">
                      {person} Owes:
                    </h3>
                    {owes.length === 0 ? (
                      <p className="text-gray-500">No one</p>
                    ) : (
                      <ul className="list-disc list-inside">
                        {owes.map((debt, index) => (
                          <li key={index} className="text-gray-700">
                            Owes ₹{debt.amount} to {debt.to}
                          </li>
                        ))}
                      </ul>
                    )}

                    <h3 className="text-lg font-semibold text-green-700 mt-4 mb-2">
                      {person} Is Owed By:
                    </h3>
                    {owedTo.length === 0 ? (
                      <p className="text-gray-500">No one</p>
                    ) : (
                      <ul className="list-disc list-inside">
                        {owedTo.map((credit, index) => (
                          <li key={index} className="text-gray-700">
                            Owed ₹{credit.amount} by {credit.to}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default BalanceSheet;
