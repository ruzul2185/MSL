
import {MEMBER_LIST, MESSAGE_LIST, ASTROMON_LIST, INDIVIDUAL_ASTROMON} from "../../constants/WebDefine";
import {ALL_ASTROMON_URL} from "../../constants/URLconstants";

const initialState = {
    memberList:null,
    messageList:null,
    allAstromonList:null,
    individualAstromon:null,
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

        default:
            return state;
    }
};
