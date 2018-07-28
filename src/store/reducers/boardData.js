import {
    BOARD_DATA_REQUEST,
    BOARD_DATA_SUCCESS,
    BOARD_DATA_FAILED,
    GET_ALL_TASKS
} from "../actions/types";

const initialState = {
    isLoading: false,
    serverMessage: "",
    allUsers: [],
    allTasks: []
};

export default function boardData(state = initialState, action) {
    switch (action.type) {
        case BOARD_DATA_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                serverMessage: ""
            });
        case BOARD_DATA_SUCCESS:
            return Object.assign({}, state, {
                allUsers: action.data.allUsers,
                allTasks: action.data.allTasks,
                isLoading: false
            });
        case GET_ALL_TASKS:
            return Object.assign({}, state, {
                allTasks: action.tasks
            });
        case BOARD_DATA_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                serverMessage: action.serverMessage
            });
        default:
            return state;
    }
}
