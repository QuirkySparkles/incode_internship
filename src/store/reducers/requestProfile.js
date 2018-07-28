import {
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAILED
} from "../actions/types";

const initialState = {
    serverMessage: "",
    status: false
};

export default function requestProfile(state = initialState, action) {
    switch (action.type) {
        case PROFILE_REQUEST:
            return Object.assign({}, state, {
                status: true,
                serverMessage: ""
            });
        case PROFILE_SUCCESS:
            return Object.assign({}, state, {
                status: false
            });
        case PROFILE_FAILED:
            return Object.assign({}, state, {
                status: false,
                serverMessage: action.serverMessage
            });
        default:
            return state;
    }
}
