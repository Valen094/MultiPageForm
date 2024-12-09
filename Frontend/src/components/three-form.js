import React from "react";
import "../App.css";

const twoform = ({ formData, setFormData}) => {

    return (
        <form className="form-container">
            <label>
                Age:
                <input type="text" name="fname" value={formData.age} onChange={(event) => setFormData({...formData, age : event.target.value})}/>
            </label>
        </form>
    );
};

export default twoform;