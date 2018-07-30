import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILED,
    CLEAR_TASK_SERVER_MESSAGE,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILED,
    CHANGE_TASK_STATUS_REQ,
    CHANGE_TASK_STATUS_FAIL,
    UPDATE_ACTIVE_TASK
} from "../actions/types";

const initialState = {
    isChanging: false,
    message: ""
};

export default function addTask(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK_REQUEST:
            return Object.assign({}, state, { isChanging: true, serverMessage: "" });
        case ADD_TASK_SUCCESS:
            return Object.assign({}, state, {
                isChanging: false,
                serverMessage: action.serverMessage
            });
        case ADD_TASK_FAILED:
            return Object.assign({}, state, {
                isChanging: false,
                serverMessage: action.serverMessage
            });
        case DELETE_TASK_REQUEST:
            return Object.assign({}, state, { isChanging: true });
        case DELETE_TASK_SUCCESS:
            return Object.assign({}, state, { isChanging: false });
        case DELETE_TASK_FAILED:
            return Object.assign({}, state, { isChanging: false });
        case CHANGE_TASK_STATUS_REQ:
            return Object.assign({}, state, { isChanging: true });
        case UPDATE_ACTIVE_TASK:
            return Object.assign({}, state, { isChanging: false });
        case CHANGE_TASK_STATUS_FAIL:
            return Object.assign({}, state, { isChanging: false });
        case CLEAR_TASK_SERVER_MESSAGE:
            return Object.assign({}, state, { serverMessage: "" });
        default:
            return state;
    }
}
