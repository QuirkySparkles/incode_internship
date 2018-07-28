import {
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAILED,
    SWITCH_EDIT,
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILED,
    CLEAR_EDIT_MESSAGE
} from "./types";

export function profileRequest() {
    return {
        type: PROFILE_REQUEST
    };
}

export function profileSuccess(data) {
    return {
        type: PROFILE_SUCCESS,
        data
    };
}

export function profileFailed(serverMessage) {
    return {
        type: PROFILE_FAILED,
        serverMessage
    };
}


export function switchEdit() {
    return {
        type: SWITCH_EDIT
    };
}

export function editProfileRequest() {
    return {
        type: EDIT_PROFILE_REQUEST
    };
}

export function editProfileSuccess(serverMessage) {
    return {
        type: EDIT_PROFILE_SUCCESS,
        serverMessage
    };
}

export function editProfileFailed(serverMessage) {
    return {
        type: EDIT_PROFILE_FAILED,
        serverMessage
    };
}

export function clearEditMessage() {
    return {
        type: CLEAR_EDIT_MESSAGE
    };
}
