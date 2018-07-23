import axios from "axios";
import { loadChat } from "../chat";

export function loadChatHistory() {
    return function (dispatch) {
        return axios.get("https://api.myjson.com/bins/n0gsa")
            .then(response => dispatch(loadChat(response.data)))
            .catch(error => console.log(error));
    };
}
