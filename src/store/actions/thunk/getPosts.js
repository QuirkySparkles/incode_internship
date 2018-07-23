import axios from "axios";
import { profileRequest, profileSuccess } from "../profile";
import { taskRequest, taskSuccess } from "../tasks";

export function getPosts(dataType) {
    const requestType = {};
    if (dataType === "userProfile") {
        requestType.request = profileRequest;
        requestType.success = profileSuccess;
        requestType.api = "https://api.myjson.com/bins/cx25a";
    } else {
        requestType.request = taskRequest;
        requestType.success = taskSuccess;
        requestType.api = "https://api.myjson.com/bins/18t3p6";
    }
    return function (dispatch) {
        dispatch(requestType.request());
        return axios.get(requestType.api)
            .then(response => dispatch(requestType.success(response.data)))
            .catch((error) => {
                console.log(error);
            });
        };
}
