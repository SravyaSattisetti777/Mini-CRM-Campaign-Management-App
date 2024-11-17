import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import './EditCustomer.css';

function EditCustomer() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [totalSpending, setTotalSpending] = useState("");
    const [visitCount, setVisitCount] = useState("");
    const [lastVisit, setLastVisit] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCustomer = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/customers/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch customer details");
            }

            const customer = await response.json();
            setName(customer.name);
            setEmail(customer.email);
            setTotalSpending(customer.totalSpending);
            setVisitCount(customer.visitCount);
            setLastVisit(customer.lastVisit ? customer.lastVisit.split("T")[0] : "");
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
            email,
            totalSpending,
            visitCount,
            lastVisit,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/customers/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Failed to update customer");
            }
            navigate("/customers");
            alert("Customer updated successfully!");
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomer();
    }, []);

    return (
        <div className="edit-customer-container">
            <div className="header-container">
                <h1 className="title">Edit Customer</h1>
            </div>

            <form onSubmit={handleUpdate} className="form-container">
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Name</label>
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
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="totalSpending">Total Spending</label>
                    <input
                        type="number"
                        id="totalSpending"
                        value={totalSpending}
                        onChange={(e) => setTotalSpending(e.target.value)}
                        className="form-input"
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="visitCount">Visits</label>
                    <input
                        type="number"
                        id="visitCount"
                        value={visitCount}
                        onChange={(e) => setVisitCount(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="lastVisit">Last Visit</label>
                    <input
                        type="date"
                        id="lastVisit"
                        value={lastVisit}
                        onChange={(e) => setLastVisit(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="button-container">
                    <Button
                        variant="solid"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Customer"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditCustomer;
