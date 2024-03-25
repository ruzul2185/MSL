
import {
    MEMBER_LIST,
    MESSAGE_LIST,
    ASTROMON_LIST,
    INDIVIDUAL_ASTROMON,
    APOPHIS_LIST,
    DIMENSIONAL_GOLEM_LIST,
    TITAN_LIST,
    TITAN_TEAM_LIST, APOPHIS_TEAM_LIST, GOLEM_TEAM_LIST,
} from "../../constants/WebDefine";


const initialState = {
    memberList:null,
    messageList:null,
    allAstromonList:null,
    individualAstromon:null,
    apophisList: null,
    dimensionalGolemList: null,
    titanList: null,
    titanTeamList: null,
    apophisTeamList: null,
    golemTeamList: null,
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
        case TITAN_TEAM_LIST:
            return {
                ...state,
                titanTeamList: action.payload,
            }
        case APOPHIS_TEAM_LIST:
            return {
                ...state,
                apophisTeamList: action.payload,
            }
        case GOLEM_TEAM_LIST:
            return {
                ...state,
                golemTeamList: action.payload,
            }

        default:
            return state;
    }
};
