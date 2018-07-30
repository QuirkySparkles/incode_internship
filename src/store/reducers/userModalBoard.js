import {
    OPEN_MODAL,
    CLOSE_MODAL
} from "../actions/types";

const initialState = {
    isActive: false,
    pickedProfile: {}
};

export default function boardModal(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return Object.assign({}, state, {
                isActive: true,
                pickedProfile: action.pickedProfile
            });
        case CLOSE_MODAL:
            return Object.assign({}, state, { isActive: false });
        default:
            return state;
    }
}
