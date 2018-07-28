import {
    USER_TASK_REQUEST,
    USER_TASKS_RECEIVED,
    SET_ACTIVE_TASK,
    CHANGE_TASK_STATUS_REQ,
    CHANGE_TASK_STATUS_FAIL,
    UPDATE_ACTIVE_TASK,
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILED,
    CLEAR_ADD_TASK_MESSAGE
} from "./types";

export function taskRequest() {
    return {
        type: USER_TASK_REQUEST
    };
}

export function taskSuccess(data) {
    return {
        type: USER_TASKS_RECEIVED,
        data
    };
}

export function changeTaskStatusReq() {
    return {
        type: CHANGE_TASK_STATUS_REQ
    };
}

export function changeTaskStatusFail() {
    return {
        type: CHANGE_TASK_STATUS_FAIL
    };
}

export function getActiveTask(task) {
    return {
        type: SET_ACTIVE_TASK,
        task
    };
}

export function updateActiveTask(task) {
    return {
        type: UPDATE_ACTIVE_TASK,
        task
    };
}

export function addTaskRequest() {
    return {
        type: ADD_TASK_REQUEST
    };
}

export function addTaskSuccess(serverMessage) {
    return {
        type: ADD_TASK_SUCCESS,
        serverMessage
    };
}

export function addTaskFailed(serverMessage) {
    return {
        type: ADD_TASK_FAILED,
        serverMessage
    };
}

export function clearAddTaskMessage() {
    return {
        type: CLEAR_ADD_TASK_MESSAGE
    };
}
