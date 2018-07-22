import {
    REQUEST_PROFILE,
    REQUEST_PROFILE_SUCCESS
} from "../actions/types";

export default function requestProfile(state = false, action) {
    switch (action.type) {
    case REQUEST_PROFILE:
        return true;
    case REQUEST_PROFILE_SUCCESS:
        return false;
    default:
        return state;
    }
}
