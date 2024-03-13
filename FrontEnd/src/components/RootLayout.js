import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import {useSelector} from "react-redux";

import classes from '../styles/RootLayout.module.css';

const RootLayout = () => {
    // const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    // const navigate = useNavigate();
    // useEffect(()=>{
    //     console.log(isLoggedIn);
    //     if(!isLoggedIn){
    //         navigate('/',{replace: true});
    //     }
    // },[isLoggedIn])
    return (
        <React.Fragment>
            <NavigationBar/>
            <div className={classes.mainContainer}>
                <Outlet/>
            </div>
        </React.Fragment>
    )
};

export default RootLayout;
