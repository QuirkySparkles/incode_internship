import { SWITCH_EDIT } from "../actions/types";

export default function switchEdit(state = false, action) {
    switch (action.type) {
        case SWITCH_EDIT:
            return !state;
        default:
            return state;
    }
}
