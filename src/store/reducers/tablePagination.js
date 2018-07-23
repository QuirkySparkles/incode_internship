import {
    FIRST_PAGE,
    LAST_PAGE,
    PREV_PAGE,
    NEXT_PAGE,
    PAGE_CHANGE
} from "../actions/types";

export default function tablePagination(state = 0, action) {
    const rowsPerPage = 10;
    switch (action.type) {
        case FIRST_PAGE:
            return 0;
        case LAST_PAGE:
            return Math.max(0, Math.ceil(action.amount / rowsPerPage) - 1);
        case PREV_PAGE:
            return state - 1;
        case NEXT_PAGE:
            return state + 1;
        case PAGE_CHANGE:
        default:
            return state;
    }
}
