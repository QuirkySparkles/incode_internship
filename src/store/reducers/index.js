import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import loginStatus from "./loginStatus";
import registrationReq from "./registrationReq";
import requestProfile from "./requestProfile";
import toggleDrawer from "./toggleDrawer";
import switchEdit from "./switchEdit";
import profileInfo from "./profileInfo";
import editProfile from "./editProfile";
import editTaskModal from "./editTaskModal";
import profileTasks from "./profileTasks";
import boardData from "./boardData";
import userModalBoard from "./userModalBoard";
import taskManagement from "./taskManagement";
import handleComments from "./handleComments";

export default combineReducers({
    loginStatus,
    registrationReq,
    requestProfile,
    turnOnEdit: switchEdit,
    drawerState: toggleDrawer,
    profileInfo,
    editProfile,
    editTaskModal,
    profileTasks,
    boardData,
    userModalBoard,
    taskManagement,
    handleComments,
    form
});
