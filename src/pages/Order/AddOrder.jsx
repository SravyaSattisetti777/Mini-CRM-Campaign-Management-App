import React, { useState, useEffect } from "react";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import "./AddOrder.css"; // Import the CSS file

function AddOrder() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [orderName, setOrderName] = useState("");
    const [amount, setAmount] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [loading, setLoading] = useState(false);
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
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = {
            email: selectedCustomer,
            name: orderName,
            amount,
            orderDate,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            navigate("/orders");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-order-container">
            <div className="header-container">
                <h1 className="title">Create New Order</h1>
            </div>

            <form onSubmit={handleSubmit} className="order-form">
                <div className="form-group">
                    <label className="form-label" htmlFor="customer">
                        Select Customer (Email)
                    </label>
                    <select
                        id="customer"
                        value={selectedCustomer}
                        onChange={(e) => setSelectedCustomer(e.target.value)}
                        className="form-select"
                        required
                    >
                        <option value="" disabled>
                            Select a customer
                        </option>
                        {customers.map((customer) => (
                            <option key={customer._id} value={customer.email}>
                                {customer.email}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="orderName">
                        Order Name
                    </label>
                    <input
                        type="text"
                        id="orderName"
                        value={orderName}
                        onChange={(e) => setOrderName(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="amount">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="orderDate">
                        Order Date
                    </label>
                    <input
                        type="date"
                        id="orderDate"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="submit-btn-container">
                    <Button
                        variant="solid"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Order"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddOrder;
