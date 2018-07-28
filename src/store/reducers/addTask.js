import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILED,
    CLEAR_ADD_TASK_MESSAGE
} from "../actions/types";

const initialState = {
    status: false,
    message: ""
};

export default function addTask(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK_REQUEST:
            return Object.assign({}, state, { status: true, serverMessage: "" });
        case ADD_TASK_SUCCESS:
            return Object.assign({}, state, { status: false, serverMessage: action.serverMessage });
        case ADD_TASK_FAILED:
            return Object.assign({}, state, { status: false, serverMessage: action.serverMessage });
        case CLEAR_ADD_TASK_MESSAGE:
            return Object.assign({}, state, { serverMessage: "" });
        default:
            return state;
    }
}
