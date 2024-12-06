import React, { useState } from "react";
import OneForm from "./one-form";
import TwoForm from "./two-form";
import ThreeForm from "./three-form";
import "../App.css";

const MultiForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        email: "",
        address: "",
    });

    const [trackStep, setTrackStep] = useState(0);

    const stepsForms = [
        <OneForm formData={formData} setFormData={setFormData} />,
        <TwoForm formData={formData} setFormData={setFormData} />,
        <ThreeForm formData={formData} setFormData={setFormData} />,
    ];

    const nextStep = () =>
        setTrackStep((step) => Math.min(step + 1, stepsForms.length - 1));

    const prevStep = () =>
        setTrackStep((step) => Math.max(step - 1, 0));

    const handleSubmit = () => {
        alert("Formulario enviado: " + JSON.stringify(formData, null, 2));
    };

    return (
        <div>
            <h2>Multi Form Page</h2>
            {stepsForms[trackStep]}
            <div>
                {trackStep > 0 && <button onClick={prevStep}>Preview</button>}

                {trackStep < stepsForms.length - 1 ? (
                    <button onClick={nextStep}>Next</button>
                ) : (
                    <button onClick={handleSubmit}>Send</button>
                )}
            </div>
        </div>
    );
};

export default MultiForm;
