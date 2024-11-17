import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [totals, setTotals] = useState({
    customers: 0,
    orders: 0,
    audiences: 0,
    campaigns: 0,
    messages: {
      sent: 0,
      failed: 0,
    },
  });

  const fetchDashboardData = async () => {
    try {
      const customerTotal = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/dashboard/total/customers`, {
        credentials: 'include',
      });
      const orderTotal = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/dashboard/total/orders`, {
        credentials: 'include',
      });
      const audienceTotal = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/dashboard/total/audiences`, {
        credentials: 'include',
      });
      const campaignTotal = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/dashboard/total/campaigns`, {
        credentials: 'include',
      });
      const messageTotal = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/dashboard/total/messages`, {
        credentials: 'include',
      });

      const customers = await customerTotal.json();
      const orders = await orderTotal.json();
      const audiences = await audienceTotal.json();
      const campaigns = await campaignTotal.json();
      const messages = await messageTotal.json();

      setTotals({
        customers: customers.total,
        orders: orders.total,
        audiences: audiences.total,
        campaigns: campaigns.total,
        messages: {
          sent: messages.sent,
          failed: messages.failed,
        },
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
      </header>

      <div className="dashboard-main">
        <div className="welcome-section">
          <h2 className="welcome-title">Welcome to your Dashboard</h2>
          <p className="welcome-text">Track, analyze, and manage your performance and data effortlessly in one centralized location.</p>
        </div>

        <div className="stats-overview">
          <div className="stat-card bg-indigo">
            <h3 className="stat-title">Total Customers</h3>
            <p className="stat-number">{totals.customers}</p>
          </div>
          <div className="stat-card bg-green">
            <h3 className="stat-title">Total Orders</h3>
            <p className="stat-number">{totals.orders}</p>
          </div>
          <div className="stat-card bg-blue">
            <h3 className="stat-title">Total Audiences</h3>
            <p className="stat-number">{totals.audiences}</p>
          </div>
          <div className="stat-card bg-orange">
            <h3 className="stat-title">Total Campaigns</h3>
            <p className="stat-number">{totals.campaigns}</p>
          </div>
        </div>

        <div className="recent-activities">
          <h3 className="recent-activities-title">Message Sent/Failed</h3>
          <ul className="activities-list">
            <li className="activity-item">
              <span>Sent: {totals.messages.sent}</span>
            </li>
            <li className="activity-item">
              <span>Failed: {totals.messages.failed}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
