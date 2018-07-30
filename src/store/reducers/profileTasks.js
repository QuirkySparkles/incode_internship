import {
    USER_TASKS_REQUEST,
    USER_TASKS_RECEIVED,
    SET_ACTIVE_TASK,
    UPDATE_ACTIVE_TASK,
    LOGOUT
} from "../actions/types";

const initialState = {
    taskList: [],
    activeTask: {},
    isLoading: false
};

export default function profileTasks(state = initialState, action) {
    switch (action.type) {
        case USER_TASKS_REQUEST:
            return Object.assign({}, state, { isLoading: true });
        case USER_TASKS_RECEIVED:
            return Object.assign({}, state, { taskList: action.data, isLoading: false });
        case SET_ACTIVE_TASK:
            return (Object.assign({}, state, { activeTask: action.task }));
        case UPDATE_ACTIVE_TASK:
            return Object.assign({}, state, { activeTask: action.task });
        case LOGOUT:
            return Object.assign({}, state, initialState);
        default:
            return state;
        }
}
