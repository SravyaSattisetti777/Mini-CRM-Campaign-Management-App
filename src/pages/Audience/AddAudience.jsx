import React, { useState } from "react";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import './AddAudience.css';

function AddAudience() {
    const [name, setName] = useState("");
    const [conditions, setConditions] = useState([{ field: "", operator: "", value: "" }]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleAddCondition = () => {
        setConditions([...conditions, { field: "", operator: "", value: "" }]);
    };

    const handleRemoveCondition = (index) => {
        const newConditions = conditions.filter((_, i) => i !== index);
        setConditions(newConditions);
    };

    const handleChangeCondition = (index, field, value) => {
        const newConditions = [...conditions];
        newConditions[index][field] = value;
        setConditions(newConditions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const audienceData = {
            name,
            conditions,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/audiences`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(audienceData),
            });

            if (!response.ok) {
                throw new Error("Failed to create audience");
            }

            navigate("/audience");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 mt-16 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Create New Audience</h1>
            </div>

            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label className="form-label">Audience Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                        placeholder="Enter audience name"
                        required
                    />
                </div>

                {conditions.map((condition, index) => (
                    <div key={index} className="form-group">
                        <div className="condition-container">
                            <select
                                value={condition.field}
                                onChange={(e) => handleChangeCondition(index, "field", e.target.value)}
                                className="form-input"
                            >
                                <option value="" disabled>Select Condition</option>
                                <option value="totalSpending">Total Spending</option>
                                <option value="visitCount">Visits</option>
                                <option value="lastVisit">Last Visit</option>
                            </select>
                            <select
                                value={condition.operator}
                                onChange={(e) => handleChangeCondition(index, "operator", e.target.value)}
                                className="form-input"
                            >
                                <option value="" disabled>Select Operator</option>
                                <option value="=">Equal to</option>
                                <option value="<">Less than</option>
                                <option value=">">Greater than</option>
                                <option value="!=">Not Equal to</option>
                                <option value="<=">Less than and Equal to</option>
                                <option value=">=">Greater than and Equal to</option>
                            </select>
                            <input
                                type="text"
                                value={condition.value}
                                onChange={(e) => handleChangeCondition(index, "value", e.target.value)}
                                className="form-input"
                                placeholder="Value"
                            />
                            {conditions.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveCondition(index)}
                                    className="remove-condition-button"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                <div className="button-container">
                    <Button
                        variant="outline"
                        className="add-condition-button"
                        type="button"
                        onClick={handleAddCondition}
                    >
                        Add Condition
                    </Button>
                    <Button
                        variant="solid"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Audience"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddAudience;
