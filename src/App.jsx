import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddTransaction from "./components/AddTransaction";
import BalanceSheet from "./components/BalanceSheet";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TransactionList from "./components/TransactionList";
import { dummyTransactions } from "./dummyData";

// List of participants
const participants = ["Rajneesh", "Harsit", "Nistha", "Ankesh"];

function App() {
  // State to store transactions
  const [transactions, setTransactions] = useState([]);

  // State to store balances of participants
  const [balances, setBalances] = useState({
    Rajneesh: 0,
    Harsit: 0,
    Nistha: 0,
    Ankesh: 0,
  });

  // State for filtering transactions
  const [filter, setFilter] = useState("");

  // Initialize transactions and balances on component mount
  useEffect(() => {
    setTransactions(dummyTransactions);
    const initialBalances = {};
    participants.forEach((person) => (initialBalances[person] = 0));
    dummyTransactions.forEach((transaction) => {
      updateBalances(transaction, initialBalances);
    });
    setBalances(initialBalances);
  }, []);

  // Add a new transaction and update balances accordingly
  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    const updatedBalances = { ...balances };
    updateBalances(newTransaction, updatedBalances);
    setBalances(updatedBalances);
  };

  // Calculate split ratios for the transaction
  const getSplitRatios = (splitAmong) => {
    const ratioPerPerson = 100 / splitAmong.length;
    const splitRatios = {};
    splitAmong.forEach((person) => {
      splitRatios[person] = ratioPerPerson;
    });
    return splitRatios;
  };

  // Update balances based on a transaction
  const updateBalances = (transaction, updatedBalances) => {
    const {
      paidBy,
      amount,
      splitRatios: originalSplitRatios,
      splitAmong,
    } = transaction;

    const splitRatios = originalSplitRatios || getSplitRatios(splitAmong);

    if (!transaction || !splitRatios) {
      console.error("Invalid transaction or splitRatios object", transaction);
      return;
    }

    if (typeof splitRatios !== "object" || splitRatios === null) {
      console.error("splitRatios must be a valid object", splitRatios);
      return;
    }

    updatedBalances[paidBy] += amount;

    Object.keys(splitRatios).forEach((person) => {
      const ratio = splitRatios[person];
      const personAmount = (amount * ratio) / 100;

      if (person !== paidBy && ratio) {
        updatedBalances[person] -= personAmount;
      }
    });
  };

  // Reset balances and transactions
  const settleUp = () => {
    setBalances({
      Rajneesh: 0,
      Harsit: 0,
      Nistha: 0,
      Ankesh: 0,
    });
    setTransactions([]);
  };

  // Filter transactions based on the selected filter
  const filteredTransactions = transactions.filter((transaction) => {
    if (!filter) return true;
    return (
      transaction.paidBy === filter || transaction.splitAmong.includes(filter)
    );
  });

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1 flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 p-4 md:p-8 bg-gray-100">
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
                        <BalanceSheet
                          balances={balances}
                          transactions={transactions}
                        />
                        <button
                          onClick={settleUp}
                          className="w-full mt-4 bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
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
                  <TransactionList
                    transactions={filteredTransactions}
                    setFilter={setFilter}
                    participants={participants}
                  />
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
