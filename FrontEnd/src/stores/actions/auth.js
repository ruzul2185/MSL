import {ALL_ASTROMON_URL, MEMBER_URL, MESSAGE_URL} from "../../constants/URLconstants";
import {unAuthFetchGET, unAuthFetchPOST} from "../../utils/NetworkUtils";
import {ASTROMON_LIST, INDIVIDUAL_ASTROMON, MEMBER_LIST, MESSAGE_LIST} from "../../constants/WebDefine";

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

export const getAllAstromons = (element,star,leaderSkill,passiveSkill,activeSkill,page) => {
    return async dispatch => {
        try{
            const postBody = {
                element,star,leaderSkill,passiveSkill,activeSkill,page
            }
            const resData = await unAuthFetchPOST(ALL_ASTROMON_URL,postBody)

            dispatch({
                type:  ASTROMON_LIST,
                payload: resData
            });
        }catch(error){
            console.log(error);
            throw error;
        }
    }
};

export const getIndividualAstromons = (name) => {
    return async dispatch => {
        try{
            const resData = await unAuthFetchGET(ALL_ASTROMON_URL + '/?name=' + name);

            dispatch({
               type: INDIVIDUAL_ASTROMON,
                payload: resData
            });
        }catch(error){
            console.log(error);
            throw error;
        }
    }
};

