
import {
    MEMBER_LIST,
    MESSAGE_LIST,
    ASTROMON_LIST,
    INDIVIDUAL_ASTROMON,
    APOPHIS_LIST,
    DIMENSIONAL_GOLEM_LIST,
    TITAN_LIST,
    TITAN_ADVICE,
    APOPHIS_ADVICE,
    GOLEM_ADVICE,
} from "../../constants/WebDefine";


const initialState = {
    memberList:null,
    messageList:null,
    allAstromonList:null,
    individualAstromon:null,
    apophisList: null,
    dimensionalGolemList: null,
    titanList: null,
    titanAdvice: null,
    apophisAdvice: null,
    golemAdvice: null,
};

export default (state = initialState, action) => {
    switch (action.type) {

        case MEMBER_LIST:
            return {
                ...state,
                memberList: action.payload,
            }
        case MESSAGE_LIST:
            return {
                ...state,
                messageList: action.payload,
            }
        case ASTROMON_LIST:
            return {
                ...state,
                allAstromonList: action.payload,
            }
        case INDIVIDUAL_ASTROMON:
            return {
                ...state,
                individualAstromon: action.payload,
            }
        case APOPHIS_LIST:
            return {
                ...state,
                apophisList: action.payload,
            }
        case DIMENSIONAL_GOLEM_LIST:
            return {
                ...state,
                dimensionalGolemList: action.payload,
            }
        case TITAN_LIST:
            return {
                ...state,
                titanList: action.payload,
            }
        case TITAN_ADVICE:
            return {
                ...state,
                titanAdvice: action.payload,
            }
        case APOPHIS_ADVICE:
            return {
                ...state,
                apophisAdvice: action.payload,
            }
        case GOLEM_ADVICE:
            return {
                ...state,
                golemAdvice: action.payload,
            }

        default:
            return state;
    }
};
