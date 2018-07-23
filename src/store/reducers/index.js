import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import requestProfile from "./requestProfile";
import requestTasks from "./requestTasks";
import toggleDrawer from "./toggleDrawer";
import switchEdit from "./switchEdit";
import profileInfo from "./profileInfo";
import profileTasks from "./profileTasks";
import boardData from "./boardData";

export default combineReducers({
    requestProfile,
    turnOnEdit: switchEdit,
    drawerState: toggleDrawer,
    requestTasks,
    profileInfo,
    profileTasks,
    boardData,
    form
});
