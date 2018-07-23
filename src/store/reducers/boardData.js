import { GET_BOARD_DATA } from "../actions/types";

const initialState = {
    allUsers: {},
    allTasks: {}
};

export default function boardData(state = initialState, action) {
    switch (action.type) {
    case GET_BOARD_DATA:
        return Object.assign({}, state, {
            allUsers: action.data.allUsers,
            allTasks: action.data.allTasks
        });
    default:
        return state;
    }
}
