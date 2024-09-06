import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./BalanceSheet.css"; // Ensure you create this CSS file for animations

const BalanceSheet = ({ balances }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Balance Sheet</h2>
      <TransitionGroup className="space-y-4">
        {Object.keys(balances).map((person) => (
          <CSSTransition key={person} timeout={500} classNames="fade">
            <div className="flex items-center justify-between p-4 border border-green-200 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-green-800">
                  {person}
                </span>
                {balances[person] >= 0 ? (
                  <FaArrowUp className="text-green-600" title="Credit" />
                ) : (
                  <FaArrowDown className="text-red-600" title="Debt" />
                )}
              </div>
              <p
                className={`text-xl font-semibold ${
                  balances[person] >= 0 ? "text-green-700" : "text-red-700"
                }`}
              >
                ₹{balances[person].toFixed(2)}
              </p>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default BalanceSheet;
