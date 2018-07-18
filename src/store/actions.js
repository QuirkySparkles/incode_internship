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

export function getPosts() {
    return function (dispatch) {
        dispatch(postRequest());
        return axios.get("https://api.myjson.com/bins/cx25a")
            .then(response => dispatch(postSuccess(response.data)))
            .catch((error) => {
                dispatch(postFailure());
                console.log(error);
            });
    };
}
