import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

function requestStatus(state = { profileInfoStatus: false, tasksInfoStatus: false }, action) {
    switch (action.type) {
    case "REQUEST_POST":
        return Object.assign({}, state, { profileInfoStatus: true });
    case "POST_SUCCESS":
        return Object.assign({}, state, { profileInfoStatus: false });
    case "TASK_REQUEST":
        return Object.assign({}, state, { tasksInfoStatus: true });
    case "TASK_SUCCESS":
        return Object.assign({}, state, { tasksInfoStatus: false });
    default:
        return state;
    }
}

function requestFailed(state = { profileIsFailed: false, tasksIsFailed: false }, action) {
    switch (action.type) {
    case "POST_FAILED":
        return Object.assign({}, state, { profileIsFailed: true });
    case "TASKS_FAILED":
        return Object.assign({}, state, { tasksIsFailed: true });
    default:
        return state;
    }
}

function updateInfo(currentInfo, newInfo) {
    const skillList = newInfo.skillList.split(", ");
    Object.assign(currentInfo.results[0], newInfo, { skillList });
    return currentInfo;
}

function getProfileInfo(state = {}, action) {
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

function changeTaskStatus(state, id, status) {
     const newState = state.tasks.map((task) => {
        if (task.id === id) {
            return Object.assign({}, task, { status });
        }
        return task;
    });
    return Object.assign({}, state, { tasks: newState });
}

function getProfileTasks(state = {}, action) {
    let updatedStatus;
    switch (action.type) {
    case "TASK_SUCCESS":
        return action.data;
    case "TASK_STATUS":
        updatedStatus = changeTaskStatus(state, action.id, action.status);
        return updatedStatus;
    default:
        return state;
    }
}

const reducers = combineReducers({
    requestStatus,
    requestFailed,
    getProfileInfo,
    getProfileTasks,
    form: formReducer
});

export default reducers;
