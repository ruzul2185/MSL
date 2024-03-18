import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import classes from '../styles/IndividualAstromon.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getIndividualAstromons} from "../stores/actions/auth";

const IndividualAstromon = () => {

    let { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIndividualAstromons(id));
    },[dispatch]);

    const astromon = useSelector(state => state.auth.individualAstromon);

    return(
        <React.Fragment>
            {astromon.map((item)=>(
                <div>
                    hi
                </div>
            ))}
        </React.Fragment>
    );
};

export default IndividualAstromon;
