import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign.css";

const Sign = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        alert(isSignUp ? "Sign Up Successful!" : "Login Successful!");
        navigate("/form");
    };

    return (
        <div className="sign-container">
            <div className="sign-form-box">
                <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />
                    {isSignUp && <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />}
                    <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
                </form>
                <p onClick={() => setIsSignUp(!isSignUp)} className="toggle-text">
                    {isSignUp ? "SIGN IN" : "SIGN UP"}
                </p>
            </div>
        </div>
    );
};

export default Sign;
