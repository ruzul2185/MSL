import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Community = () => {

    const navigate = useNavigate();

    const accessToken = useSelector(state => state.auth.accessToken);

    useEffect(()=> {
        if(!accessToken){
            navigate('/login')
        }
    },[accessToken])

    return(
        <React.Fragment>
            <div>
                Community
            </div>
        </React.Fragment>
    );
}

export default Community;