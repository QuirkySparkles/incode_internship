import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT
} from "../actions/types";

const initialState = {
    status: false,
    serverMessage: ""
};

export default function loginStatus(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, { status: false, serverMessage: "" });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, { status: true });
        case LOGIN_FAILED:
            return Object.assign({}, state, { status: false, serverMessage: action.message });
        case LOGOUT: {
            return Object.assign({}, state, { status: false, serverMessage: "" });
        }
        default:
            return state;
    }
}
