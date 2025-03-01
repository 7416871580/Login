import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
    // State for signup form
    const [signupData, setSignupData] = useState({
        company_name: "",
        company_address: "",
        email: "",
        contact_no: "",
        password: "",
        num_employees: ""
    });
    const [signupMessage, setSignupMessage] = useState("");

    // State for login form
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [loginMessage, setLoginMessage] = useState("");

    // Handle Signup Input Change
    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    // Handle Login Input Change
    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    // Signup API Call
    const handleSignup = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5001/signup", signupData)
            .then(response => {
                setSignupMessage(response.data.message);
                setSignupData({
                    company_name: "",
                    company_address: "",
                    email: "",
                    contact_no: "",
                    password: "",
                    num_employees: ""
                });
            })
            .catch(error => {
                setSignupMessage(error.response?.data?.error || "Signup failed");
            });
    };

    // Login API Call
    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5001/login", loginData)
            .then(response => {
                setLoginMessage(`Welcome, ${response.data.user.company_name}!`);
                setLoginData({
                    email: "",
                    password: ""
                });
            })
            .catch(error => {
                setLoginMessage(error.response?.data?.error || "Login failed");
            });
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input type="text" name="company_name" placeholder="Company Name" value={signupData.company_name} onChange={handleSignupChange} required />
                <input type="text" name="company_address" placeholder="Company Address" value={signupData.company_address} onChange={handleSignupChange} required />
                <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} required />
                <input type="text" name="contact_no" placeholder="Contact Number" value={signupData.contact_no} onChange={handleSignupChange} required />
                <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} required />
                <input type="number" name="num_employees" placeholder="Number of Employees" value={signupData.num_employees} onChange={handleSignupChange} required />
                <button type="submit">Signup</button>
            </form>
            <p>{signupMessage}</p>

            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
                <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
                <button type="submit">Login</button>
            </form>
            <p>{loginMessage}</p>
        </div>
    );
};

export default Signup;
