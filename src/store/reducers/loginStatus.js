import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT
} from "../actions/types";

const initialState = {
    isLoginIn: false,
    status: false,
    serverMessage: ""
};

export default function loginStatus(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, { isLoginIn: true, status: false, serverMessage: "" });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, { isLoginIn: false, status: true });
        case LOGIN_FAILED:
            return Object.assign({}, state, {
                isLoginIn: false,
                status: false,
                serverMessage: action.serverMessage
            });
        case LOGOUT: {
            return Object.assign({}, state, { status: false, serverMessage: "" });
        }
        default:
            return state;
    }
}
