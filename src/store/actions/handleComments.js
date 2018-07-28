import {
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILED,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILED,
    CLEAR_COMMENT_SERVER_MESSAGE
} from "./types";

export function addCommentRequest() {
    return {
        type: ADD_COMMENT_REQUEST
    };
}

export function addCommentSuccess() {
    return {
        type: ADD_COMMENT_SUCCESS
    };
}

export function addCommentFailed(serverMessage) {
    return {
        type: ADD_COMMENT_FAILED,
        serverMessage
    };
}

export function deleteCommentRequest() {
    return {
        type: DELETE_COMMENT_REQUEST
    };
}

export function deleteCommentSuccess() {
    return {
        type: DELETE_COMMENT_SUCCESS
    };
}

export function deleteCommentFailed(serverMessage) {
    return {
        type: DELETE_COMMENT_FAILED,
        serverMessage
    };
}

export function clearCommentServerMessage() {
    return {
        type: CLEAR_COMMENT_SERVER_MESSAGE
    };
}
