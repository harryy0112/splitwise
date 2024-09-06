import React, { useEffect, useState } from "react";
import "./App.css";
import AddTransaction from "./components/AddTransaction";
import BalanceSheet from "./components/BalanceSheet";
import TransactionList from "./components/TransactionList";
import { dummyTransactions } from "./dummyData";

const participants = ["Rajneesh", "Harsit", "Nistha", "Ankesh"];

function App() {
  const [transactions, setTransactions] = useState([]);
  const [balances, setBalances] = useState({
    Rajneesh: 0,
    Harsit: 0,
    Nistha: 0,
    Ankesh: 0,
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setTransactions(dummyTransactions);
    dummyTransactions.forEach((transaction) => updateBalances(transaction));
  }, []);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    updateBalances(newTransaction);
  };

  const updateBalances = (transaction) => {
    const { paidBy, amount, splitAmong } = transaction;
    const splitAmount = amount / splitAmong.length;

    setBalances((prevBalances) => {
      const updatedBalances = { ...prevBalances };
      updatedBalances[paidBy] += amount;
      splitAmong.forEach((person) => {
        if (person !== paidBy) {
          updatedBalances[person] -= splitAmount;
        }
      });
      return updatedBalances;
    });
  };

  const settleUp = () => {
    setBalances({
      Rajneesh: 0,
      Harsit: 0,
      Nistha: 0,
      Ankesh: 0,
    });
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (!filter) return true; // Show all transactions if no filter is applied
    return (
      transaction.paidBy === filter || transaction.splitAmong.includes(filter)
    );
  });

  return (
    <div className="bg-green-50 min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-extrabold text-green-700 mb-8">Splitwise</h1>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white shadow-lg p-6 rounded-lg border border-green-200">
            <AddTransaction
              addTransaction={addTransaction}
              participants={participants}
            />
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg border border-green-200">
            <BalanceSheet balances={balances} />
            <button
              onClick={settleUp}
              className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition-colors duration-300 mt-4"
            >
              Settle Up
            </button>
          </div>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg border border-green-200">
          <div className="mb-4">
            <label className="block text-sm font-medium text-green-600 mb-2">
              Filter by Participant:
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full p-2 border border-green-300 rounded-md focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All</option>
              {participants.map((person) => (
                <option key={person} value={person}>
                  {person}
                </option>
              ))}
            </select>
          </div>
          <TransactionList transactions={filteredTransactions} />
        </div>
      </div>
    </div>
  );
}

export default App;
