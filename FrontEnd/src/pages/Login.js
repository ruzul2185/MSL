import React, {useEffect, useState} from 'react';
import classes from '../styles/Login.module.css';
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "../stores/actions/auth";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate();
    const accessToken = Cookies.get('accessToken');
    const Username = Cookies.get('username');
    const role = Cookies.get('role');
    const dispatch = useDispatch();

    const loginData = useSelector(state => state.auth.login);


    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (loginData && Array.isArray(loginData) && !loginData.includes('message')) {
            navigate('/community');
        }
    }, [loginData, navigate]);


    const changeUsername = (event) => {
        setUsername(event.target.value);
    };
    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(username,password));
    };

    return(
        <React.Fragment>
            {accessToken === "null" &&<div className={classes.container}>
                <h2>Login</h2>
                {loginData && loginData.message && <p style={{color:'red'}}>
                    {loginData.message}
                </p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
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
                    <input type="submit" value="Submit" />
                </form>
            </div>}
            {accessToken !== "null" && <div className={classes.container}>
                <h2>username: {Username}</h2>
                <h2>role: {role}</h2>
            </div>}
        </React.Fragment>
    );
};

export default Login;