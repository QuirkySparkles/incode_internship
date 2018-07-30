import {
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILED,
    SWITCH_EDIT
} from "../actions/types";

const initialState = {
    isChanging: false,
    serverMessage: ""
};

export default function editProfile(state = initialState, action) {
    switch (action.type) {
        case EDIT_PROFILE_REQUEST:
            return Object.assign({}, state, { isChanging: true, serverMessage: "" });
        case EDIT_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                isChanging: false,
                serverMessage: action.serverMessage
            });
        case EDIT_PROFILE_FAILED:
            return Object.assign({}, state, {
                isChanging: false,
                serverMessage: action.serverMessage
            });
        case SWITCH_EDIT:
            return Object.assign({}, state, { serverMessage: "" });
        default:
            return state;
    }
}
