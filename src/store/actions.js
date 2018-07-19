import axios from "axios";

function postRequest() {
    return {
        type: "REQUEST_POST"
    };
}

export function postSuccess(data) {
    return {
        type: "POST_SUCCESS",
        data
    };
}

export function postFailure() {
    return {
        type: "POST_FAILURE"
    };
}

export function editUserInfo(newInfo) {
    return {
        type: "EDIT_INFO",
        newInfo
    };
}

function taskRequest() {
    return {
        type: "TASK_REQUEST"
    };
}

export function taskSuccess(data) {
    return {
        type: "TASK_SUCCESS",
        data
    };
}

export function taskFailure() {
    return {
        type: "TASK_FAILURE"
    };
}

export function changeTaskStatus(id, status) {
    return {
        type: "TASK_STATUS",
        id,
        status
    };
}

export function getPosts(dataType) {
    const requestType = {};
    if (dataType === "userProfile") {
        requestType.request = postRequest;
        requestType.success = postSuccess;
        requestType.failure = postFailure;
        requestType.api = "https://api.myjson.com/bins/cx25a";
    } else {
        requestType.request = taskRequest;
        requestType.success = taskSuccess;
        requestType.failure = taskFailure;
        requestType.api = "https://api.myjson.com/bins/1hbksu";
    }
    return function (dispatch) {
        dispatch(requestType.request());
        return axios.get(requestType.api)
            .then(response => dispatch(requestType.success(response.data)))
            .catch((error) => {
                dispatch(requestType.failure());
                console.log(error);
            });
        };
}
