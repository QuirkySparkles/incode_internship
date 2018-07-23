import {
    USER_TASK_REQUEST,
    USER_TASK_SUCCESS
} from "../actions/types";

export default function requestTasks(state = false, action) {
    switch (action.type) {
    case USER_TASK_REQUEST:
        return true;
    case USER_TASK_SUCCESS:
        return false;
    default:
        return state;
    }
}
