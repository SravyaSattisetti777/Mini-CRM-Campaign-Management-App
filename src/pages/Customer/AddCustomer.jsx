import React, { useState } from "react";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import './AddCustomer.css';

function AddCustomer() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [totalSpending, setTotalSpending] = useState("");
    const [visitCount, setVisitCount] = useState("");
    const [lastVisit, setLastVisit] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const customerData = {
            name,
            email,
            totalSpending,
            visitCount,
            lastVisit,
        };
    
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/customers`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(customerData),
            });
    
            if (!response.ok) {
                throw new Error("Failed to add customer");
            }
            navigate("/customers");

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-customer-container">
            <div className="header-container">
                <h1 className="title">Add New Customer</h1>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit}>
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
                            required
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
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Customer"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCustomer;
