import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT
} from "./types";

export function loginRequest() {
    return {
        type: LOGIN_REQUEST
    };
}

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    };
}

export function loginFailed(serverMessage) {
    return {
        type: LOGIN_FAILED,
        serverMessage
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
}
