import {
    ALL_ASTROMON_URL, APOPHIS_TEAM_URL,
    APOPHIS_URL,
    DIMENSIONAL_GOLEM_URL, GOLEM_TEAM_URL,
    MEMBER_URL,
    MESSAGE_URL, TEAM_URL, TITAN_TEAM_URL, TITAN_URL
} from "../../constants/URLconstants";
import {unAuthFetchGET, unAuthFetchPOST} from "../../utils/NetworkUtils";
import {
    APOPHIS_LIST, APOPHIS_TEAM_LIST,
    ASTROMON_LIST,
    DIMENSIONAL_GOLEM_LIST, GOLEM_TEAM_LIST,
    INDIVIDUAL_ASTROMON,
    MEMBER_LIST,
    MESSAGE_LIST, TEAM_LIST, TITAN_LIST, TITAN_TEAM_LIST
} from "../../constants/WebDefine";

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

export const getCleanINDIVIDUAL_ASTROMON = () => {
    return dispatch => {
        try{
            dispatch({
                type: INDIVIDUAL_ASTROMON,
                payload: null
            });
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

export const getAllApophis = () => {
    return async dispatch => {
        try {
            const resData = await unAuthFetchGET(APOPHIS_URL);

            dispatch({
                type: APOPHIS_LIST,
                payload: resData
            });
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export const getAllDimensionalGolem = () => {
    return async dispatch => {
        try{
            const resData = await unAuthFetchGET(DIMENSIONAL_GOLEM_URL);

            dispatch({
                type: DIMENSIONAL_GOLEM_LIST,
                payload: resData
            });
        }catch(error){
            console.log(error)
            throw error
        }
    }
}

export const getAllTitan = () => {
    return async dispatch => {
        try{
            const resData = await unAuthFetchGET(TITAN_URL);

            dispatch({
                type: TITAN_LIST,
                payload: resData
            });
        }catch(error){
            console.log(error)
            throw error
        }
    }
}

export const getTitanTeam = (page,key) => {
    return async dispatch => {
        try{
            const resData = await unAuthFetchGET(TITAN_TEAM_URL + '/?state=' + key + '&page=' + page);

            dispatch({
                type: TITAN_TEAM_LIST,
                payload: resData
            });
        }catch(error){
            console.log(error)
            throw error
        }
    }
}

export const getApophisTeam = (page,key) => {
    return async dispatch => {
        try{
            const resData = await unAuthFetchGET(APOPHIS_TEAM_URL + '/?state=' + key + '&page=' + page);

            dispatch({
                type: APOPHIS_TEAM_LIST,
                payload: resData
            });
        }catch(error){
            console.log(error)
            throw error
        }
    }
}

export const getGolemTeam = (page,key) => {
    return async dispatch => {
        try{
            const resData = await unAuthFetchGET(GOLEM_TEAM_URL + '/?state=' + key + '&page=' + page);

            dispatch({
                type: GOLEM_TEAM_LIST,
                payload: resData
            });
        }catch(error){
            console.log(error)
            throw error
        }
    }
}