import axios from "axios";
import {
    loginFailed,
    taskRequest,
    taskSuccess,
    changeTaskStatusReq,
    changeTaskStatusFail,
    updateActiveTask,
    addTaskRequest,
    addTaskSuccess,
    addTaskFailed,
    addCommentRequest,
    addCommentSuccess,
    addCommentFailed
} from "..";
import { getAllTasks } from "../boardData";

export function getProfileTasks(performerId) {
    return function (dispatch) {
        dispatch(taskRequest());
        return axios.post("http://localhost:3030/tasks/user_tasks", { performerId })
            .then((response) => {
            dispatch(taskSuccess(response.data.tasks));
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        dispatch(loginFailed(""));
                        localStorage.removeItem("token"); // eslint-disable-line no-undef
                    }
                }
        });
    };
}

export function changeTaskStatus(id, status, performerId) {
    return function (dispatch) {
        dispatch(changeTaskStatusReq());
        return axios.put("http://localhost:3030/tasks/status", { id, status, performerId })
            .then((response) => {
                dispatch(taskSuccess(response.data.tasks));
                dispatch(updateActiveTask(response.data.updTask));
            })
            .catch((error) => {
                dispatch(changeTaskStatusFail());
                if (error.response) {
                    if (error.response.status === 401) {
                        dispatch(loginFailed(""));
                        localStorage.removeItem("token"); // eslint-disable-line no-undef
                    }
                }
        });
    };
}

export function addComment(comment, id) {
    return function (dispatch) {
        dispatch(addCommentRequest());
        return axios.put("http://localhost:3030/tasks/comment", { comment, id })
            .then((response) => {
                dispatch(addCommentSuccess());
                dispatch(updateActiveTask(response.data.task));
            })
            .catch((error) => {
                dispatch(addCommentFailed("Something went wrong. Try again later"));
                if (error.response) {
                    if (error.response.status === 401) {
                        dispatch(loginFailed(""));
                        localStorage.removeItem("token"); // eslint-disable-line no-undef
                    }
                }
        });
    };
}

export function addTask(newTask) {
    return function (dispatch) {
        dispatch(addTaskRequest());
        return axios.post("http://localhost:3030/tasks/add", newTask)
            .then((response) => {
                dispatch(addTaskSuccess(response.data.message));
                dispatch(getAllTasks(response.data.tasks));
        })
            .catch((error) => {
                dispatch(addTaskFailed("Something went wrong."));
                if (error.response) {
                    if (error.response.status === 500) {
                        dispatch(addTaskFailed("Server error, task hasn't been created."));
                    } else if (error.response.status === 401) {
                        dispatch(loginFailed(""));
                        localStorage.removeItem("token"); // eslint-disable-line no-undef
                    }
                }
        });
    };
}


export function deleteTask(id) {
    return function (dispatch) {
        return axios.delete(`http://localhost:3030/tasks/delete/${id}`)
            .then(response => dispatch(getAllTasks(response.data.tasks))) // add cb
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    if (error.response.status === 400) {
                        console.log(error);
                    }
                }
        });
    };
}
