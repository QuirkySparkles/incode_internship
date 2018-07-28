import {
    PROFILE_SUCCESS,
    LOGOUT
} from "../actions/types";


export default function profileInfo(state = {}, action) {
    switch (action.type) {
    case PROFILE_SUCCESS:
        return action.data;
    case LOGOUT:
        return {};
    default:
        return state;
    }
}
