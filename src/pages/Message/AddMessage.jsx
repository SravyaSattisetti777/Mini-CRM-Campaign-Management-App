import React, { useState, useEffect } from "react";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import './AddMessage.css';

function AddMessage() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState("");
    const navigate = useNavigate();

    const fetchCampaigns = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/campaigns/history`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch campaigns");
            }

            const data = await response.json();
            setCampaigns(data);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleCampaignChange = (e) => {
        setSelectedCampaign(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const messageData = {
            message,
            campaignId: selectedCampaign,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/messages/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(messageData),
            });

            if (!response.ok) {
                throw new Error("Failed to send messages");
            }

            navigate("/messages");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    return (
        <div className="add-message-container">
            <div className="header-container">
                <h1 className="title">Send Message</h1>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label className="form-label" htmlFor="campaign">Select Campaign</label>
                        <select
                            id="campaign"
                            value={selectedCampaign}
                            onChange={handleCampaignChange}
                            className="form-input"
                            required
                        >
                            <option value="">Select a Campaign</option>
                            {campaigns.map((campaign) => (
                                <option key={campaign._id} value={campaign._id}>
                                    {campaign.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="button-container">
                        <Button
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMessage;
