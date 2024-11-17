import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import './OrderList.css';

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}.onrender.com/api/orders/list`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }

            const data = await response.json();
            setOrders(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/orders/delete/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to delete order");
                }

                setOrders(orders.filter(order => order._id !== id));
                alert("Order deleted successfully!");
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const handleEdit = (orderId) => {
        navigate(`/orders/edit/${orderId}`);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="order-list-container">
            <div className="header-container">
                <h1 className="title">Order List</h1>
                <Link to="/orders/create">
                    <Button className="add-order-btn">
                        Add Order
                    </Button>
                </Link>
            </div>

            <div className="table-container">
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Order Date</th>
                            <th>Customer</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="table-row">
                                <td>{order.name}</td>
                                <td>$ {order.amount}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>{order.customerId?.name}</td>
                                <td className="action-buttons">
                                    <Button
                                        className="edit-btn"
                                        onClick={() => handleEdit(order._id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className="delete-btn"
                                        onClick={() => handleDelete(order._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderList;
