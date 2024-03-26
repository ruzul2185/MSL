import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const Community = () => {
    const accessToken = Cookies.get('accessToken');
    const navigate = useNavigate();

    useEffect(() => {
        if(accessToken === 'null'){
            navigate('/login')
        }
    },[])

    return(
        <React.Fragment>
            <div>
                Community
            </div>
        </React.Fragment>
    );
}

export default Community;