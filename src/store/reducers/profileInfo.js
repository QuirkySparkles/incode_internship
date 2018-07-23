import {
    REQUEST_PROFILE_SUCCESS,
    EDIT_PROFILE
} from "../actions/types";

function updateInfo(currentInfo, newInfo) {
    const skillList = newInfo.skillList.split(", ");
    Object.assign(currentInfo.results[0], newInfo, { skillList });
    return currentInfo;
}

export default function profileInfo(state = {}, action) {
    let updatedInfo;
    switch (action.type) {
    case REQUEST_PROFILE_SUCCESS:
        return action.data;
    case EDIT_PROFILE:
         updatedInfo = updateInfo(state, action.newInfo);
        return updatedInfo;
    default:
        return state;
    }
}
