import {
    USER_TASK_SUCCESS,
    TASK_STATUS,
    ACTIVE_TASK,
    ADD_COMMENT
} from "../actions/types";

export default function profileTasks(state = { taskList: {}, activeTask: {} }, action) {
    let assignTask;
    let assignTaskInList;
    let pushComment;
    switch (action.type) {
    case USER_TASK_SUCCESS:
        return Object.assign({}, state, { taskList: action.data });
    case TASK_STATUS:
        assignTask = Object.assign({}, state.taskList[action.id], { status: action.status });
        assignTaskInList = Object.assign({}, state.taskList, { [action.id]: assignTask });
        return Object.assign({}, state, { taskList: assignTaskInList });
    case ACTIVE_TASK:
        return (Object.assign({}, state, { activeTask: state.taskList[action.id] }));
    case ADD_COMMENT:
        pushComment = Object.assign({},
            state.taskList[action.id], {
            comments: [
                ...state.activeTask.comments,
                action.newComment
            ]
        });
        assignTaskInList = Object.assign({}, state.taskList, { [action.id]: pushComment });
        return (Object.assign({}, state, { taskList: assignTaskInList, activeTask: pushComment }));
    default:
        return state;
    }
}

