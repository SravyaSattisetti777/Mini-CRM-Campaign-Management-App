import React, { useState, useEffect } from "react";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import "./AddCampaign.css";

function AddCampaign() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [audiences, setAudiences] = useState([]);
    const [audienceId, setAudienceId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchAudiences = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/audiences/list`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch audiences");
            }

            const data = await response.json();
            setAudiences(data);
        } catch (error) {
            console.error("Error fetching audiences:", error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchAudiences();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const campaignData = {
            name,
            message,
            audienceId,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/campaigns`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(campaignData),
            });

            if (!response.ok) {
                throw new Error("Failed to create campaign");
            }

            navigate("/campaign");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-campaign-container">
            <div className="header-container">
                <h1 className="title">Create Campaign</h1>
            </div>

            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label className="form-label" htmlFor="campaignName">
                        Campaign Name
                    </label>
                    <input
                        type="text"
                        id="campaignName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="audience">
                        Select Audience
                    </label>
                    <select
                        id="audience"
                        value={audienceId}
                        onChange={(e) => setAudienceId(e.target.value)}
                        className="form-input"
                        required
                    >
                        <option value="" disabled>
                            Select an audience
                        </option>
                        {audiences.map((audience) => (
                            <option key={audience._id} value={audience._id}>
                                {audience.name} (Size: {audience.size})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="button-container">
                    <Button
                        variant="solid"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Campaign"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddCampaign;
