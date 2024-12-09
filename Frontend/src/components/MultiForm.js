import React, { useState } from "react";
import OneForm from "./one-form";
import TwoForm from "./two-form";
import ThreeForm from "./three-form";
import "../App.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const MultiForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        email: "",
        address: "",
    });

    const [trackStep, setTrackStep] = useState(0);
    const navigate = useNavigate();

    const stepsForms = [
        <OneForm formData={formData} setFormData={setFormData} />,
        <TwoForm formData={formData} setFormData={setFormData} />,
        <ThreeForm formData={formData} setFormData={setFormData} />,
    ];

    const nextStep = () =>
        setTrackStep((step) => Math.min(step + 1, stepsForms.length - 1));

    const prevStep = () =>
        setTrackStep((step) => Math.max(step - 1, 0));

    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = () => {
        if (!formData.name || !formData.age || !formData.email || !formData.address) {
            alert("Please complete all fields");
            return;
        }
    
        setIsSubmitting(true);

        // console.log("Data sent to backend:", formData);
    
        
        axios
            .post("http://localhost:5001/api/users", formData)
            .then((response) => {
                console.log("User created:", response.data);
                alert("User created successfully!");
                navigate("/users");
            })
            .catch((error) => {
                console.error("Error submitting form:", error.response?.data || error.message);
                alert(error.response?.data?.message || "Error sending data, please try again.");
            })
            .finally(() => {
               
                setIsSubmitting(false);
            });
    };

    const users = () => {
        navigate("/users");
    }
    

    return (
        <div>
            <button onClick={users}>Users</button>
            
            <h2>Multi Form Page</h2>

            {stepsForms[trackStep]}
            <div>
                {trackStep > 0 && <button onClick={prevStep}>Preview</button>}

                {trackStep < stepsForms.length - 1 ? (
                    <button onClick={nextStep}>Next</button>
                ) : (
                    <button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send"}
                    </button>

                )}
            </div>
        </div>
    );
};

export default MultiForm;
