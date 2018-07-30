import {
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAILED
} from "../actions/types";

const initialState = {
    serverMessage: "",
    isLoading: false
};

export default function requestProfile(state = initialState, action) {
    switch (action.type) {
        case PROFILE_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                serverMessage: ""
            });
        case PROFILE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false
            });
        case PROFILE_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                serverMessage: action.serverMessage
            });
        default:
            return state;
    }
}
