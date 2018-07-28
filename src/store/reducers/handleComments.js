import {
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILED,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILED,
    CLEAR_COMMENT_SERVER_MESSAGE
} from "../actions/types";

const initialState = {
    serverMessage: "",
    status: false
};

export default function handleComments(state = initialState, action) {
    switch (action.type) {
        case ADD_COMMENT_REQUEST:
            return Object.assign({}, state, {
                status: true,
                serverMessage: ""
            });
        case ADD_COMMENT_SUCCESS:
            return Object.assign({}, state, {
                status: false
            });
        case ADD_COMMENT_FAILED:
            return Object.assign({}, state, {
                status: false,
                serverMessage: action.serverMessage
            });
        case DELETE_COMMENT_REQUEST:
            return Object.assign({}, state, {
                status: true,
                serverMessage: ""
            });
        case DELETE_COMMENT_SUCCESS:
            return Object.assign({}, state, {
                status: false
            });
        case DELETE_COMMENT_FAILED:
            return Object.assign({}, state, {
                status: false,
                serverMessage: action.serverMessage
            });
        case CLEAR_COMMENT_SERVER_MESSAGE:
            return Object.assign({}, state, {
                serverMessage: ""
            });
        default:
            return state;
    }
}
