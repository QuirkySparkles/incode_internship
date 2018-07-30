import {
    BOARD_DATA_REQUEST,
    BOARD_DATA_SUCCESS,
    BOARD_DATA_FAILED,
    GET_ALL_TASKS,
    GET_ALL_USERS
} from "./types";

export function boardDataRequest() {
    return {
        type: BOARD_DATA_REQUEST,
    };
}

export function boardDataSuccess(data) {
    return {
        type: BOARD_DATA_SUCCESS,
        data
    };
}

export function boardDataFailed(serverMessage) {
    return {
        type: BOARD_DATA_FAILED,
        serverMessage
    };
}

export function getAllTasks(tasks) {
    return {
        type: GET_ALL_TASKS,
        tasks
    };
}

export function getAllUsers(users) {
    return {
        type: GET_ALL_USERS,
        users
    };
}
