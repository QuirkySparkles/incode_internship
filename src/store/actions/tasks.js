import {
    USER_TASKS_REQUEST,
    USER_TASKS_RECEIVED,
    SET_ACTIVE_TASK,
    CHANGE_TASK_STATUS_REQ,
    CHANGE_TASK_STATUS_FAIL,
    UPDATE_ACTIVE_TASK,
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILED,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILED,
    CLEAR_TASK_SERVER_MESSAGE
} from "./types";

export function profileTasksRequest() {
    return {
        type: USER_TASKS_REQUEST
    };
}

export function profileTasksSuccess(data) {
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

export function clearTaskServerMessage() {
    return {
        type: CLEAR_TASK_SERVER_MESSAGE
    };
}

export function deleteTaskRequest() {
    return {
        type: DELETE_TASK_REQUEST
    };
}

export function deleteTaskSuccess() {
    return {
        type: DELETE_TASK_SUCCESS
    };
}

export function deleteTaskFailed() {
    return {
        type: DELETE_TASK_FAILED
    };
}
