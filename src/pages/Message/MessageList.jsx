import React, { useState, useEffect } from "react";
import { Button } from "../../components/button";
import { Link } from "react-router-dom";
import './MessageList.css';

function MessageList() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/messages`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch messages");
            }

            const data = await response.json();
            setMessages(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="message-list-container">
            <div className="header-container">
                <h1 className="title">Message History</h1>
                <Link to="/messages/send">
                    <Button className="add-message-btn">
                        Send Message
                    </Button>
                </Link>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && messages.length === 0 && <p>No messages found.</p>}

            {!loading && !error && messages.length > 0 && (
                <div className="table-container">
                    <table className="message-table">
                        <thead>
                            <tr>
                                <th>Campaign</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((message) => (
                                <tr key={message._id} className="table-row">
                                    <td>{message.campaignName}</td>
                                    <td>{message.message}</td>
                                    <td>{message.status}</td>
                                    <td>{new Date(message.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default MessageList;
