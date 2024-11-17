import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../../components/button";
import './AudienceList.css';

function AudienceList() {
    const [audiences, setAudiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchAudiences = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/audiences/list`, {
                method: 'GET',
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
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (audienceId) => {
        if (window.confirm("Are you sure you want to delete this audience?")) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/audiences/delete/${audienceId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to delete audience");
                }

                setAudiences(audiences.filter((audience) => audience._id !== audienceId));
            } catch (error) {
                alert(`Error deleting audience: ${error.message}`);
            }
        }
    };

    const handleEdit = (audienceId) => {
        navigate(`/audiences/edit/${audienceId}`);
    };

    useEffect(() => {
        fetchAudiences();
    }, []);

    return (
        <div className="audience-list-container">
            <div className="header-container">
                <h1 className="title">Audience List</h1>
                <Link to="/audiences/create">
                    <Button className="create-audience-btn">
                        Create Audience
                    </Button>
                </Link>
            </div>
            <div className="audience-table-container">
                <table className="audience-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Conditions</th>
                            <th>Size</th>
                            <th>Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {audiences.map((audience) => (
                            <tr key={audience._id}>
                                <td>{audience.name}</td>
                                <td>
                                    {audience.conditions.map((condition, index) => (
                                        <p key={index}>
                                            {condition.field} {condition.operator} {condition.value}
                                        </p>
                                    ))}
                                </td>
                                <td>{audience.size}</td>
                                <td>
                                    <Link to={`/audiences/${audience._id}`} className="view-details-btn">
                                        View Details
                                    </Link>
                                </td>
                                <td className="action-buttons">
                                    <Button
                                        className="edit-btn"
                                        onClick={() => handleEdit(audience._id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className="delete-btn"
                                        onClick={() => handleDelete(audience._id)}
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

export default AudienceList;
