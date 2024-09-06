import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddTransaction from "./components/AddTransaction";
import BalanceSheet from "./components/BalanceSheet";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
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
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8 bg-gray-100">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <div className="h-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                      <div className="bg-white shadow-lg p-6 rounded-lg border border-green-200 h-full">
                        <AddTransaction
                          addTransaction={addTransaction}
                          participants={participants}
                        />
                      </div>
                      <div className="bg-white shadow-lg p-6 rounded-lg border border-green-200 h-full">
                        <BalanceSheet balances={balances} />
                        <button
                          onClick={settleUp}
                          className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition-colors duration-300 mt-4"
                        >
                          Settle Up
                        </button>
                      </div>
                    </div>
                  </div>
                }
              />
              <Route
                path="/history"
                element={
                  <div className="bg-white shadow-lg p-6 rounded-lg border border-green-200 h-full">
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
                }
              />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
