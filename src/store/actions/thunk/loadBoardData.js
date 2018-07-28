import axios from "axios";
import {
    loginFailed,
    boardDataRequest,
    boardDataSuccess,
    boardDataFailed
} from "..";


export default function loadBoardData() {
    axios.defaults.headers.common.Authorization = localStorage.getItem("token"); // eslint-disable-line no-undef
    return function (dispatch) {
        dispatch(boardDataRequest());
        return axios.get("http://localhost:3030/board")
            .then((response) => {
            dispatch(boardDataSuccess(response.data));
        })
            .catch((error) => {
                dispatch(boardDataFailed("Server hasn't responded. Try again later"));
                if (error.response) {
                    if (error.response.status === 401) {
                        dispatch(loginFailed("You must be logged in to see this page"));
                        localStorage.removeItem("token"); // eslint-disable-line no-undef
                    } else {
                        boardDataFailed("Server error. Try again later");
                    }
                }
            });
    };
}
