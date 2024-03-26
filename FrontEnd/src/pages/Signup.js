import React, {useEffect, useState} from 'react';
import classes from "../styles/Login.module.css";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import {signup} from "../stores/actions/auth";

const Signup = () => {

    const navigate = useNavigate();
    const accessToken = Cookies.get('accessToken');
    const dispatch = useDispatch();

    const signupData = useSelector(state => state.auth.signup);

    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const changeUsername = (event) => {
        setUsername(event.target.value);
    };
    const changePassword = (event) => {
        setPassword(event.target.value);
    };
    const changeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            // Passwords don't match, show an error message
            setError('Passwords do not match');
            return; // Exit the function without dispatching login action
        }
        // Dispatch login action if passwords match
        dispatch(signup(username, password));

    };

    const statusResponse = (item) => {
        if(item.response.status === 409){
            return <p style={{ color: 'red' }}>{signupData.resData.message}</p>
        }
        if(item.response.status === 201){
            return <p style={{ color: 'green' }}>{signupData.resData.message}</p>
        }
    };

    return (
        <React.Fragment>
            {accessToken === "null" && (
                <div className={classes.container}>
                    <h2>Signup</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {signupData && statusResponse(signupData)}
                    <form onSubmit={handleSubmit}>
                        <label>
                            MSL Username:
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={changeUsername}
                                required
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={changePassword}
                                required
                            />
                        </label>
                        <label>
                            Confirm Password:
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={changeConfirmPassword}
                                required
                            />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                    <p>Already have an account? <a href="/login">Log In</a></p>
                </div>
            )}
        </React.Fragment>
    );
};

export default Signup;