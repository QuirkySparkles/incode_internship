import {
    USER_TASKS_RECEIVED,
    SET_ACTIVE_TASK,
    CHANGE_TASK_STATUS_REQ,
    CHANGE_TASK_STATUS_FAIL,
    UPDATE_ACTIVE_TASK,
    LOGOUT
} from "../actions/types";

const initialState = {
    taskList: [],
    activeTask: {},
    changeStatusReq: false
};

export default function profileTasks(state = initialState, action) {
    switch (action.type) {
        case USER_TASKS_RECEIVED:
            return Object.assign({}, state, { taskList: action.data });
        case SET_ACTIVE_TASK:
            return (Object.assign({}, state, {
                activeTask: action.task
            }));
        case CHANGE_TASK_STATUS_REQ:
            return Object.assign({}, state, { changeStatusReq: true });
        case CHANGE_TASK_STATUS_FAIL:
            return Object.assign({}, state, { changeStatusReq: false });
        case UPDATE_ACTIVE_TASK:
            return Object.assign({}, state, { activeTask: action.task, changeStatusReq: false });
        case LOGOUT:
            return Object.assign({}, state, initialState);
        default:
            return state;
        }
}
