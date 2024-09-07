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

  const getSplitRatios = (splitAmong) => {
    const ratioPerPerson = 100 / splitAmong.length;
    const splitRatios = {};
    splitAmong.forEach((person) => {
      splitRatios[person] = ratioPerPerson;
    });
    return splitRatios;
  };

  const updateBalances = (transaction) => {
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

    setBalances((prevBalances) => {
      const updatedBalances = { ...prevBalances };
      updatedBalances[paidBy] += amount;

      Object.keys(splitRatios).forEach((person) => {
        const ratio = splitRatios[person];
        const personAmount = (amount * ratio) / 100;

        if (person !== paidBy && ratio) {
          updatedBalances[person] -= personAmount;
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
