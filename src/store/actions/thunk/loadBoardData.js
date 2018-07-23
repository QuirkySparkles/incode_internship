import axios from "axios";
import getBoardData from "../boardData";

export function loadBoardData() {
    return function (dispatch) {
        return axios.get("https://api.myjson.com/bins/n0gsa")
            .then(response => dispatch(getBoardData(response.data)))
            .catch(error => console.log(error));
    };
}
