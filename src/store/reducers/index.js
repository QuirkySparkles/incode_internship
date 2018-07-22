import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import requestProfile from "./requestProfile";
import requestTasks from "./requestTasks";
import switchEdit from "./switchEdit";
import profileInfo from "./profileInfo";
import profileTasks from "./profileTasks";

export default combineReducers({
    requestProfile,
    turnOnEdit: switchEdit,
    requestTasks,
    profileInfo,
    profileTasks,
    form
});
