import { TOGGLE_CHAT, LOAD_CHAT_HISTORY, SEND_MESSAGE } from "../actions/types";

const initialState = {
    history: [],
    isOpen: false,
    toSend: ""
};

export default function chatInteractions(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_CHAT:
            return Object.assign({}, state, { isOpen: !state.isOpen });
        case LOAD_CHAT_HISTORY:
            return Object.assign({}, state, { history: action.history });
        //case SEND_MESSAGE:
        default:
            return state;
    }
}
