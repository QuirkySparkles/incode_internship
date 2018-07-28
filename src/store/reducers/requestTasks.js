import {
    USER_TASK_REQUEST,
    USER_TASKS_RECEIVED
} from "../actions/types";

export default function requestTasks(state = false, action) {
    switch (action.type) {
    case USER_TASK_REQUEST:
        return true;
    case USER_TASKS_RECEIVED:
        return false;
    default:
        return state;
    }
}
