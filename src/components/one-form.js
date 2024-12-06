import React from "react";
import "../App.css";

const oneform = ({formData, setFormData }) => {

    return (
        <form className="form-container">
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })}/>
            </label>

            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={(event) => setFormData({...formData, email: event.target.value})} />
            </label>
        </form>
    );
};

export default oneform;