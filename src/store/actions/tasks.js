import {
    USER_TASK_REQUEST,
    USER_TASK_SUCCESS,
    TASK_STATUS,
    ACTIVE_TASK,
    ADD_COMMENT
} from "./types";

export function taskRequest() {
    return {
        type: USER_TASK_REQUEST
    };
}

export function taskSuccess(data) {
    return {
        type: USER_TASK_SUCCESS,
        data
    };
}

export function changeTaskStatus(id, status) {
    return {
        type: TASK_STATUS,
        id,
        status
    };
}

export function getActiveTask(id) {
    return {
        type: ACTIVE_TASK,
        id
    };
}

export function addComment(newComment, id) {
    return {
        type: ADD_COMMENT,
        newComment,
        id
    };
}
