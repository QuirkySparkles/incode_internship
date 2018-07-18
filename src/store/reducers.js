import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

function requestStatus(state = false, action) {
    switch (action.type) {
    case "REQUEST_POST":
        return true;
    case "POST_SUCCESS":
        return false;
    default:
        return state;
    }
}

function requestFailed(state = false, action) {
    switch (action.type) {
    case "POST_FAILED":
        return true;
    default:
        return state;
    }
}

function updateInfo(currentInfo, newInfo) {
    const skillList = newInfo.skillList.split(", ");
    Object.assign(currentInfo.results[0], newInfo, { skillList });
    return currentInfo;
}

function getFiles(state = {}, action) {
    let updatedInfo;
    switch (action.type) {
    case "POST_SUCCESS":
        return action.data;
    case "EDIT_INFO":
         updatedInfo = updateInfo(state, action.newInfo);
        return updatedInfo;
    default:
        return state;
    }
}

const reducers = combineReducers({
    requestStatus,
    requestFailed,
    getFiles,
    form: formReducer,
});

export default reducers;
