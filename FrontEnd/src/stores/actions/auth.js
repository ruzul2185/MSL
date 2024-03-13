import {MEMBER_URL, MESSAGE_URL} from "../../constants/URLconstants";
import {unAuthFetchGET} from "../../utils/NetworkUtils";
import {MEMBER_LIST, MESSAGE_LIST} from "../../constants/WebDefine";

export const getMemberList = () => {
    return async dispatch => {
        try{
            const resData = await unAuthFetchGET(MEMBER_URL);
            dispatch({
                type:MEMBER_LIST,
                payload: resData
            });
        }catch(error){
            console.log(error);
            throw error;
        }
    }
};

export const getMessageList = () => {
    return async dispatch => {
        try{
            const resData = await unAuthFetchGET(MESSAGE_URL);

            dispatch({
                type:MESSAGE_LIST,
                payload: resData
            });
        }catch(error){
            console.log(error);
            throw error;
        }
    }
};
