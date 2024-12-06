import React from "react";
import "../App.css";


const threeform = ({ formData, setFormData}) => {

    return (

            <form className="form-container">
                <label>
                    Address:
                    <input type="text" name="fname" value={formData.address} onChange={(event) => setFormData({...formData, address : event.target.value})}/>
                </label>

            </form>

    );
};

export default threeform;