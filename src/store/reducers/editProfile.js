import {
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILED,
    CLEAR_EDIT_MESSAGE
} from "../actions/types";

const initialState = {
    status: false,
    serverMessage: ""
};

export default function editProfile(state = initialState, action) {
    switch (action.type) {
        case EDIT_PROFILE_REQUEST:
            return Object.assign({}, state, { status: true, serverMessage: "" });
        case EDIT_PROFILE_SUCCESS:
            return Object.assign({}, state, { status: false, serverMessage: action.serverMessage });
        case EDIT_PROFILE_FAILED:
            return Object.assign({}, state, { status: false, serverMessage: action.serverMessage });
        case CLEAR_EDIT_MESSAGE:
            return Object.assign({}, state, { serverMessage: "" });
        default:
            return state;
    }
}
