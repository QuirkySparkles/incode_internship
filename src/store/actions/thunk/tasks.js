import axios from "axios";
import {
    loginFailed,
    profileTasksRequest,
    profileTasksSuccess,
    changeTaskStatusReq,
    changeTaskStatusFail,
    updateActiveTask,
    addTaskRequest,
    addTaskSuccess,
    addTaskFailed,
    deleteTaskRequest,
    deleteTaskSuccess,
    deleteTaskFailed,
    editTaskRequest,
    editTaskSuccess,
    editTaskFailed,
    addCommentRequest,
    addCommentSuccess,
    addCommentFailed,
    deleteCommentRequest,
    deleteCommentSuccess,
    deleteCommentFailed
} from "..";
import { getAllTasks } from "../boardData";

export function getProfileTasks(performerId) {
    return function (dispatch) {
        dispatch(profileTasksRequest());
        return axios.post("http://localhost:3030/tasks/user_tasks", { performerId })
            .then((response) => {
            dispatch(profileTasksSuccess(response.data.tasks));
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
                dispatch(profileTasksSuccess(response.data.profileTasks));
                dispatch(getAllTasks(response.data.allTasks));
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
                dispatch(getAllTasks(response.data.allTasks));
                dispatch(updateActiveTask(response.data.task));
            })
            .catch((error) => {
                dispatch(addCommentFailed("Something went wrong. Try again later"));
                if (error.response) {
                    if (error.response.status === 401) {
                        dispatch(loginFailed(""));
                        localStorage.removeItem("token"); // eslint-disable-line no-undef
                    } else {
                        dispatch(addCommentFailed("Server error"));
                    }
                }
        });
    };
}

export function deleteComment(id, createdAt) {
    return function (dispatch) {
        dispatch(deleteCommentRequest());
        return axios.delete(`http://localhost:3030/tasks/delete_comment/${id}/${createdAt}`)
            .then((response) => {
                dispatch(deleteCommentSuccess());
                dispatch(getAllTasks(response.data.allTasks));
                dispatch(updateActiveTask(response.data.task));
            })
            .catch((error) => {
                dispatch(deleteCommentFailed("Something went wrong. Try again later"));
                if (error.response) {
                    if (error.response.status === 401) {
                        dispatch(loginFailed(""));
                        localStorage.removeItem("token"); // eslint-disable-line no-undef
                    } else {
                        dispatch(deleteCommentFailed("Server error"));
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
        dispatch(deleteTaskRequest());
        return axios.delete(`http://localhost:3030/tasks/delete/${id}`)
            .then((response) => {
                dispatch(getAllTasks(response.data.tasks));
                dispatch(deleteTaskSuccess());
            })
            .catch((error) => {
                deleteTaskFailed();
                if (error.response) {
                    if (error.response.status === 401) {
                        dispatch(loginFailed(""));
                        localStorage.removeItem("token"); // eslint-disable-line no-undef
                    }
                }
        });
    };
}

export function editTask(id, editedTask) {
    return function (dispatch) {
        dispatch(editTaskRequest());
        return axios.put("http://localhost:3030/tasks/edit", { id, editedTask })
            .then((response) => {
                dispatch(editTaskSuccess(response.data.message));
                dispatch(getAllTasks(response.data.tasks));
            })
            .catch((error) => {
                dispatch(editTaskFailed("Something went wrong, try again later."));
                if (error.response) {
                    if (error.response.status === 401) {
                        dispatch(loginFailed(""));
                        localStorage.removeItem("token"); // eslint-disable-line no-undef
                    } else {
                        dispatch(editTaskFailed("Server error"));
                    }
                }
        });
    };
}
