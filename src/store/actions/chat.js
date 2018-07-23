import {
    TOGGLE_CHAT,
    LOAD_CHAT_HISTORY,
    SEND_MESSAGE
} from "./types";

export function toggleChat(target) {
    return {
        type: TOGGLE_CHAT,
        target
    };
}

export function loadChat(history, target) {
    return {
        type: LOAD_CHAT_HISTORY,
        history,
        target
    };
}

export function sendMessage(message) {
    return {
        type: SEND_MESSAGE,
        message
    };
}
