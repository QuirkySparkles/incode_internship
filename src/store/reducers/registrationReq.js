import {
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED
} from "../actions/types";

const initialState = {
    status: false,
    serverMessage: ""
};

export default function registrationReq(state = initialState, action) {
    switch (action.type) {
        case REGISTRATION_REQUEST:
            return Object.assign({}, state, { status: true, serverMessage: "" });
        case REGISTRATION_SUCCESS:
            return Object.assign({}, state, { status: false });
        case REGISTRATION_FAILED:
            return Object.assign({}, state, { status: false, serverMessage: action.message });
        default:
            return state;
    }
}
