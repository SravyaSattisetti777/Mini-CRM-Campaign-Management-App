import React, { useState, useEffect } from "react";
import { Button } from "../../components/button";
import { Link } from "react-router-dom";
import './CampaignHistory.css';

function CampaignHistory() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCampaigns = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/campaigns/history`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch campaigns");
            }

            const data = await response.json();
            setCampaigns(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    return (
        <div className="campaign-history-container">
            <div className="header-container">
                <h1 className="title">Campaign History & Stats</h1>
                <Link to="/campaigns/create">
                    <Button className="add-campaign-btn">
                        Add Campaign
                    </Button>
                </Link>
            </div>

            <div className="table-container">
                <table className="campaign-table">
                    <thead>
                        <tr>
                            <th>Campaign Name</th>
                            <th>Message</th>
                            <th>Audience</th>
                            <th>Date</th>
                            <th>Sent</th>
                            <th>Failed</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((campaign) => (
                            <tr key={campaign._id} className="table-row">
                                <td>{campaign.name}</td>
                                <td>{campaign.message}</td>
                                <td>{campaign.audienceId?.name} (Size: {campaign.audienceId?.size})</td>
                                <td>{new Date(campaign.createdAt).toLocaleDateString()}</td>
                                <td>{campaign.sentCount || 0}</td>
                                <td>{campaign.failedCount || 0}</td>
                                <td>
                                    <Link to={`/campaigns/${campaign._id}`} className="view-details-btn">
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CampaignHistory;
