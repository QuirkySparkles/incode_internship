import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import loginStatus from "./loginStatus";
import registrationReq from "./registrationReq";
import requestProfile from "./requestProfile";
import requestTasks from "./requestTasks";
import toggleDrawer from "./toggleDrawer";
import switchEdit from "./switchEdit";
import profileInfo from "./profileInfo";
import editProfile from "./editProfile";
import profileTasks from "./profileTasks";
import boardData from "./boardData";
import addTask from "./addTask";
import handleComments from "./handleComments";

export default combineReducers({
    loginStatus,
    registrationReq,
    requestProfile,
    turnOnEdit: switchEdit,
    drawerState: toggleDrawer,
    addTask,
    handleComments,
    requestTasks,
    profileInfo,
    editProfile,
    profileTasks,
    boardData,
    form
});
