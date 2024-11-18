import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './AudienceView.css';

function AudienceView() {
    const { id } = useParams();
    const [audience, setAudience] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAudience = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/audiences/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch audience details");
            }

            const data = await response.json();
            setAudience(data);
            setCustomers(data.customers || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAudience();
    }, [id]);

    if(loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="audience-view-container">
            <div className="header">
                <h1 className="audience-name">{audience.name}</h1>
                <div className="audience-details">
                    <div className="audience-size">Audience Size: {audience.size}</div>
                    <div className="conditions-section">
                        <h2 className="section-title">Conditions:</h2>
                        <ul className="conditions-list">
                            {audience.conditions.map((condition, index) => (
                                <li key={index} className="condition-item">
                                    {condition.field} {condition.operator} {condition.value}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Customers:</h2>
                <div className="table-container">
                    <table className="audience-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Total Spending</th>
                                <th>Visits</th>
                                <th>Last Visit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer._id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.totalSpending}</td>
                                    <td>{customer.visitCount}</td>
                                    <td>{customer.lastVisit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AudienceView;
