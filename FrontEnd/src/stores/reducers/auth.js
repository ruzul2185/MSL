
import {MEMBER_LIST, MESSAGE_LIST} from "../../constants/WebDefine";
import {MESSAGE_URL} from "../../constants/URLconstants";

const initialState = {
    memberList:null,
    messageList:null,
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

        default:
            return state;
    }
};
