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
        // Verificar si todos los campos están completos
        if (!formData.name || !formData.age || !formData.email || !formData.address) {
            alert("Por favor completa todos los campos");
            return;
        }
    
        // Indicar que la solicitud está en curso
        setIsSubmitting(true);
    
        // Enviar los datos al backend
        axios
            .post("http://localhost:5001/api/users", formData)
            .then((response) => {
                console.log("Usuario creado:", response.data);
                alert("Usuario creado con éxito!");
                navigate("/users"); // Navegar a la página de usuarios
            })
            .catch((error) => {
                console.error("Error al enviar el formulario:", error.response?.data || error.message);
                alert(error.response?.data?.message || "Error al enviar los datos, por favor intenta nuevamente.");
            })
            .finally(() => {
                // Finalizar la solicitud
                setIsSubmitting(false);
            });
    };

    const users = () => {
        navigate("/users"); // Navegar a la página de usuarios
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
