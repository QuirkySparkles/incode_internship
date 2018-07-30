import {
    OPEN_EDIT_MODAL,
    EDIT_TASK_REQUEST,
    EDIT_TASK_SUCCESS,
    EDIT_TASK_FAILED,
    CLOSE_EDIT_MODAL
} from "./types";

export function openEditModal(taskToEdit) {
    return {
        type: OPEN_EDIT_MODAL,
        taskToEdit
    };
}

export function editTaskRequest() {
    return {
        type: EDIT_TASK_REQUEST,
    };
}

export function editTaskSuccess(serverMessage) {
    return {
        type: EDIT_TASK_SUCCESS,
        serverMessage
    };
}

export function editTaskFailed(serverMessage) {
    return {
        type: EDIT_TASK_FAILED,
        serverMessage
    };
}

export function closeEditModal() {
    return {
        type: CLOSE_EDIT_MODAL
    };
}
