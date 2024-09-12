import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { wallet_backend } from 'declarations/wallet_backend';

const Navbar = ({ userName }) => (
  <div className="navbar">
    <div className="logo">Dashboard</div>
    <div className="user-info">
      <div className="user-icon">&#128100;</div>
      <div className="user-name">{userName}</div> {/* User's name */}
    </div>
  </div>
);

const Sidebar = () => (
  <div className="sidebar">
    <ul>
      <li><a href="#dashboard">Dashboard</a></li>
      <li><a href="#smart-wallet">Smart Wallet</a></li>
      <li><a href="#deposit">Deposit</a></li>
      <li><a href="#withdraw">Withdraw</a></li>
      <li><a href="#transfer">Transfer</a></li>
      <li><a href="#pay-bills">Pay Bills</a></li>
      <li><a href="#profile">Profile</a></li>
      <li><a href="#logout">Logout</a></li>
    </ul>
  </div>
);

const Card = ({ currency, balance }) => (
  <div className="card">
    <h3>{currency}</h3>
    <p>Balance: {balance}</p>
    <button>Exchange</button>
  </div>
);

const CurrencyCards = ({ balances }) => (
  <div className="currency-cards">
    <Card currency="Zambian Kwacha" balance={`${balances.zambianKwacha} ZMW`} />
    <Card currency="Malawian Kwacha" balance={`${balances.malawianKwacha} MWK`} />
    <Card currency="Zimbabwean Dollar" balance={`${balances.zimbabweanDollar} ZWL`} />
    <Card currency="US Dollar" balance={`${balances.usDollar} USD`} />
  </div>
);

const TransactionHistory = () => (
  <div className="transaction-history">
    <h2>Transaction History</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Currency</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2024-08-01</td>
          <td>Deposit</td>
          <td>500</td>
          <td>USD</td>
          <td>Completed</td>
        </tr>
        <tr>
          <td>2024-07-30</td>
          <td>Withdraw</td>
          <td>200</td>
          <td>ZMW</td>
          <td>Pending</td>
        </tr>
        <tr>
          <td>2024-07-25</td>
          <td>Pay Bills</td>
          <td>100</td>
          <td>MWK</td>
          <td>Completed</td>
        </tr>
        <tr>
          <td>2024-07-20</td>
          <td>Deposit</td>
          <td>300</td>
          <td>ZWL</td>
          <td>Completed</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Dashboard = () => {
  const [balances, setBalances] = useState({
    zambianKwacha: 0,
    malawianKwacha: 0,
    zimbabweanDollar: 0,
    usDollar: 0,
  });

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const userId = 'user_id_here'; // Replace with actual user ID or fetch from context/state
        const result = await wallet_backend.getBalance(userId);
        if (result.ok) {
          setBalances(result.ok);
        } else {
          console.error('Failed to fetch balances:', result.err);
        }
      } catch (error) {
        console.error('Error fetching balances:', error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const userId = 'user_id_here'; // Replace with actual user ID or fetch from context/state
        const result = await wallet_backend.getUserInfo(userId); // Assuming this is a method to fetch user info
        if (result.ok) {
          setUserName(result.ok.fullName);
        } else {
          console.error('Failed to fetch user info:', result.err);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchBalances();
    fetchUserInfo();
  }, []);

  return (
    <div className="dashboard">
      <Navbar userName={userName} />
      <Sidebar />
      <div className="main-content">
        <CurrencyCards balances={balances} />
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Dashboard;
