
import {
    MEMBER_LIST,
    MESSAGE_LIST,
    ASTROMON_LIST,
    INDIVIDUAL_ASTROMON,
    APOPHIS_LIST,
    DIMENSIONAL_GOLEM_LIST
} from "../../constants/WebDefine";


const initialState = {
    memberList:null,
    messageList:null,
    allAstromonList:null,
    individualAstromon:null,
    apophisList: null,
    dimensionalGolemList: null,
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

        default:
            return state;
    }
};
