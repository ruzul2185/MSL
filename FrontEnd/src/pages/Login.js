import React, {useEffect, useState} from 'react';
import classes from '../styles/Login.module.css';
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "../stores/actions/auth";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginData = useSelector(state => state.auth.login);
    const accessGranter = useSelector(state => state.auth.accessToken);

    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(accessGranter){
            navigate('/community');
        }
    },[accessGranter])

    useEffect(() => {
        dispatch(logout())
    },[])

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
            <div className={classes.container}>
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
            </div>
        </React.Fragment>
    );
};

export default Login;