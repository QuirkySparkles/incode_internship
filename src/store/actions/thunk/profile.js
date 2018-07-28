import axios from "axios";
import {
    loginFailed,
    profileRequest,
    profileSuccess,
    profileFailed,
    editProfileRequest,
    editProfileSuccess,
    editProfileFailed
} from "..";
import { getProfileTasks } from "./tasks";

export function loadProfile() {
    axios.defaults.headers.common.Authorization = localStorage.getItem("token"); // eslint-disable-line no-undef
    return function (dispatch) {
        dispatch(profileRequest());
        return axios.get("http://localhost:3030/users/profile")
            .then((response) => {
                dispatch(profileSuccess(response.data));
                dispatch(getProfileTasks(response.data._id));
            })
            .catch((error) => {
                dispatch(profileFailed("Something went wrong. Try again later"));
                if (error.response) {
                    if (error.response.status === 401) {
                        dispatch(loginFailed("You aren't logged in"));
                        localStorage.removeItem("token"); // eslint-disable-line no-undef
                        dispatch(profileFailed("You aren't logged in"));
                    }
                }
            });
        };
}

export function editProfile(profile) {
    axios.defaults.headers.common.Authorization = localStorage.getItem("token"); // eslint-disable-line no-undef
    return function (dispatch) {
        dispatch(editProfileRequest());
        return axios.put("http://localhost:3030/users/edit", profile)
            .then((response) => {
                dispatch(editProfileSuccess(response.data.message));
                dispatch(profileSuccess(response.data.user));
            })
            .catch((error) => {
                dispatch(editProfileFailed("Server error. Profile hasn't been updated."));
                if (error.response) {
                    if (error.response.status === 401) {
                        dispatch(loginFailed("You aren't logged in"));
                        dispatch(editProfileFailed("You must be logged in to perform this action!"));
                        localStorage.removeItem("token"); // eslint-disable-line no-undef
                        dispatch(profileFailed());
                    } else {
                        dispatch(editProfileFailed("Server error. Profile hasn't been updated."));
                    }
                }
            });
        };
}
