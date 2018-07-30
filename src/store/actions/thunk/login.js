import axios from "axios";
import { loginRequest, loginSuccess, loginFailed } from "..";
import { loadProfile } from "./profile";
import loadBoardData from "./loadBoardData";


export default function tryLogin(data) {
    return function (dispatch) {
        dispatch(loginRequest());
        return axios({
            url: "http://localhost:3030/users/login",
            method: "post",
            data,
            withCredentials: true
        })
        .then((response) => {
            localStorage.setItem("token", response.data.token); // eslint-disable-line no-undef
            dispatch(loginSuccess());
            dispatch(loadProfile());
            dispatch(loadBoardData());
        })
        .catch((error) => {
            dispatch(loginFailed("Something went wrong. Try again later"));
            if (error.response) {
                if (error.response.status === 401) {
                    dispatch(loginFailed(error.response.data));
                    localStorage.removeItem("token"); // eslint-disable-line no-undef
                } else if (error.response.status === 400) {
                    dispatch(loginFailed(error.response.data));
                } else {
                    dispatch(loginFailed("Something went wrong. Try again later"));
                }
            }
        });
    };
}
