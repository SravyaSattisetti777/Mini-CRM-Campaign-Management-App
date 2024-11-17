import React, { useState, useEffect } from "react";
import { Button } from "../../components/button";
import { Link, useNavigate } from "react-router-dom";
import './CustomerList.css';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchCustomers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/customers/list`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch customers");
            }

            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (customerId) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/customers/delete/${customerId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to delete customer");
                }

                setCustomers(customers.filter((customer) => customer._id !== customerId));
            } catch (error) {
                alert(`Error deleting customer: ${error.message}`);
            }
        }
    };

    const handleEdit = (customerId) => {
        navigate(`/customers/edit/${customerId}`);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="customer-list-container">
            <div className="header-container">
                <h1 className="title">Customer List</h1>
                <Link to="/customers/create">
                    <Button className="add-customer-btn">
                        Add Customer
                    </Button>
                </Link>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && customers.length === 0 && <p>No customers found.</p>}

            {!loading && !error && customers.length > 0 && (
                <div className="table-container">
                    <table className="customer-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Total Spending</th>
                                <th>Visits</th>
                                <th>Last Visit</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer._id} className="table-row">
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>$ {customer.totalSpending}</td>
                                    <td>{customer.visitCount}</td>
                                    <td>{new Date(customer.lastVisit).toLocaleDateString()}</td>
                                    <td>
                                        <div className="button-group">
                                            <button
                                                onClick={() => handleEdit(customer._id)}
                                                className="edit-btn"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(customer._id)}
                                                className="delete-btn"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CustomerList;
