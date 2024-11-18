import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import "./EditOrder.css";

function EditOrder() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/orders/edit/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch order details");
            }

            const order = await response.json();

            setName(order.name);
            setAmount(order.amount);
            setOrderDate(order.orderDate.slice(0, 10));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updatedData = {
            name,
            amount,
            orderDate,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/orders/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Failed to update order");
            }

            alert("Order updated successfully!");
            navigate("/orders");
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    return (
        <div className="edit-order-container">
            <div className="header-container">
                <h1 className="title">Edit Order</h1>
            </div>

            <form onSubmit={handleUpdate} className="order-form">
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Order Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="amount">Amount</label>
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
                    <label className="form-label" htmlFor="orderDate">Order Date</label>
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
                        {loading ? "Updating..." : "Update Order"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditOrder;
