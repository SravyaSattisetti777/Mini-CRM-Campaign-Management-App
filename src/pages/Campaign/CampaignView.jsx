import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CampaignView.css';

function CampaignView() {
    const { id } = useParams();
    const [campaignDetails, setCampaignDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCampaignDetails = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/campaigns/${id}/details`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch campaign details');
            }

            const data = await response.json();
            setCampaignDetails(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaignDetails();
    }, [id]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="campaign-view-container">
            <div className="header">
                <h1 className="campaign-name">{campaignDetails.campaignName}</h1>
                <div className="campaign-details">
                    <div className="audience-size">Audience Size: {campaignDetails.audienceSize}</div>
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Campaign Message</h2>
                <p className="message-text">{campaignDetails.message}</p>
            </div>

            <div className="section">
                <h2 className="section-title">Communication Logs</h2>
                <div className="table-container">
                    <table className="campaign-table">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Customer Email</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaignDetails.logs.map((log) => (
                                <tr key={log._id}>
                                    <td>{log.customerName}</td>
                                    <td>{log.customerEmail}</td>
                                    <td>{log.message}</td>
                                    <td>{log.status}</td>
                                    <td>{new Date(log.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CampaignView;
