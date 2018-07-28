import {
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED
} from "./types";

export function registrationRequest(data) {
    return {
        type: REGISTRATION_REQUEST,
        data
    };
}

export function registrationSuccess() {
    return {
        type: REGISTRATION_SUCCESS
    };
}

export function registrationFailed(serverMessage) {
    return {
        type: REGISTRATION_FAILED,
        serverMessage
    };
}
