import { GET_BOARD_DATA } from "./types";

export default function getBoardData(data) {
    return {
        type: GET_BOARD_DATA,
        data
    };
}
