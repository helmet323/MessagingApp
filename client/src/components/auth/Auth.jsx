import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import "./auth.scss";

const cookies = new Cookies();

const initialState = {
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    avatarURL: "",
};

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fullName, username, password, phoneNumber, avatarURL } = form;
        
        const URL = 'http://localhost:5000/auth';

        const { data : { token, userId, hashedPassword } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName, phoneNumber, avatarURL,
        })

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if (isSignup){
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    };



    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    return (
        <div className="form-container">
            <div className="fields">
                <div className="content">
                    <p className="title">
                        {isSignup ? "Create your account" : "Sign In"}
                    </p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="item">
                                <label htmlfor="fullName">Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="item">
                            <label htmlfor="username">Username</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (
                            <div className="item">
                                <label htmlfor="phoneNumber">
                                    Phone Number
                                </label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="item">
                                <label htmlfor="avatarURL">Avatar URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="item">
                            <label htmlfor="passwordL">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (
                            <div className="item">
                                <label htmlfor="confirmPassword">
                                    Confirm Password
                                </label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="submit">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="account">
                        <p>
                            {isSignup
                                ? "Already have an account? "
                                : "Don't have an account? "}
                        </p>
                        <span onClick={switchMode}>
                            {isSignup ? "Sign In" : "Sign Up"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
