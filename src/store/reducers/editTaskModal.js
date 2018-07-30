import {
    OPEN_EDIT_MODAL,
    EDIT_TASK_REQUEST,
    EDIT_TASK_SUCCESS,
    EDIT_TASK_FAILED,
    CLOSE_EDIT_MODAL
} from "../actions/types";

const initialState = {
    isApplyingChanges: false,
    isOpened: false,
    taskToEdit: {},
    serverMessage: ""
};

export default function editTaskModal(state = initialState, action) {
    switch (action.type) {
        case OPEN_EDIT_MODAL:
            return Object.assign({}, state, { isOpened: true, taskToEdit: action.taskToEdit, serverMessage: "" });
        case EDIT_TASK_REQUEST:
            return Object.assign({}, state, { isApplyingChanges: true, serverMessage: "" });
        case EDIT_TASK_SUCCESS:
            return Object.assign({}, state, {
                isApplyingChanges: false,
                serverMessage: action.serverMessage
            });
        case EDIT_TASK_FAILED:
            return Object.assign({}, state, {
                isApplyingChanges: false,
                serverMessage: action.serverMessage
            });
        case CLOSE_EDIT_MODAL:
            return Object.assign({}, state, { isOpened: false, serverMessage: "" });
        default:
            return state;
    }
}
