import {
    OPEN_MODAL,
    CLOSE_MODAL
} from "./types";

export function openModal(pickedProfile) {
    return {
        type: OPEN_MODAL,
        pickedProfile
    };
}

export function closeModal() {
    return {
        type: CLOSE_MODAL
    };
}
