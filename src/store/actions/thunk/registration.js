import axios from "axios";
import {
    loginSuccess,
    registrationRequest,
    registrationSuccess,
    registrationFailed
} from "..";
import { loadProfile } from "./profile";
import loadBoardData from "./loadBoardData";


export default function tryRegistration(data) {
    return function (dispatch) {
        dispatch(registrationRequest());
        return axios({
            url: "http://localhost:3030/users/registration",
            method: "post",
            data,
            withCredentials: true
        })
        .then((response) => {
            dispatch(registrationSuccess());
            localStorage.setItem("token", response.data.token); // eslint-disable-line no-undef
            dispatch(loadProfile());
            dispatch(loadBoardData());
            dispatch(loginSuccess());
        })
        .catch((error) => {
            dispatch(registrationFailed("Something went wrong. Try again later"));
            if (error.response) {
                if (error.response.status === 400) {
                    dispatch(registrationFailed(error.response.data));
                } else dispatch(registrationFailed("Something went wrong. Try again later"));
            }
        });
    };
}
