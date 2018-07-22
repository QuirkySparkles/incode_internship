import {
    REQUEST_PROFILE,
    REQUEST_PROFILE_SUCCESS,
    SWITCH_EDIT,
    EDIT_PROFILE
} from "./types";

export function profileRequest() {
    return {
        type: REQUEST_PROFILE
    };
}

export function profileSuccess(data) {
    return {
        type: REQUEST_PROFILE_SUCCESS,
        data
    };
}

export function switchEdit() {
    return {
        type: SWITCH_EDIT
    };
}

export function editProfile(newInfo) {
    return {
        type: EDIT_PROFILE,
        newInfo
    };
}
