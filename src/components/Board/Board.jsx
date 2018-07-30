import React from "react";
import { connect } from "react-redux";
import {
    Drawer,
    List,
    withStyles,
    ListItem,
    ListItemText,
    Typography
} from "@material-ui/core";
import loadBoardData from "../../store/actions/thunk/loadBoardData";
import { deleteTask, editTask } from "../../store/actions/thunk/tasks";
import { openEditModal } from "../../store/actions/editTaskModal";
import toggleDrawer from "../../store/actions/drawer";
import User from "../User";
import AllTasks from "../AllTasks/AllTasks";
import UserModalBoard from "../UserModalBoard";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import styles from "./styles";


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.applyEditTask = this.applyEditTask.bind(this);
    }

    toggleDrawer() {
        this.props.toggleDrawer();
    }

    deleteTask(taskId) {
        this.props.deleteTask(taskId);
    }

    applyEditTask(editedTask) {
        const editedTaskId = editedTask._id;
        const editedTaskWithPerf = editedTask;
        const perf = this.props.allUsers.filter(user => user._id === editedTask.performerId)[0];
        editedTaskWithPerf.performer = `${perf.firstName} ${perf.lastName}`;
        this.props.applyEdit(editedTaskId, editedTaskWithPerf);
    }

    render() {
        const {
            showEditModal,
            drawerState,
            allUsers,
            allTasks,
            classes,
            isAdmin,
            taskToEdit,
            serverMessage
        } = this.props;

        if (serverMessage) {
            return (
              <Typography variant="display1" className={classes.serverMessage}>
                {serverMessage}
              </Typography>
            );
        }

        return (
          <div>
            <Drawer
              anchor="left"
              open={drawerState}
              className={classes.drawerPaper}
              onClose={this.toggleDrawer}
            >
              <List>
                {!allUsers[0]
                 && (
                 <ListItem>
                   <ListItemText primary="There are no users here" />
                 </ListItem>)}
                {allUsers.map(user => (
                  <User
                    key={user.login}
                    profileInfo={user}
                  />
                ))}
              </List>
            </Drawer>
            <AllTasks
              allTasks={allTasks}
              showEditModal={showEditModal}
              deleteTask={this.deleteTask}
              isAdmin={isAdmin}
            />
            <UserModalBoard />
            <EditTaskModal
              initialValues={taskToEdit}
              enableReinitialize
              onSubmit={this.applyEditTask}
            />
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { drawerState } = state;
    const {
        allUsers,
        allTasks,
        serverMessage
    } = state.boardData;
    const { isAdmin } = state.profileInfo;
    const { taskToEdit } = state.editTaskModal;
    return {
        serverMessage,
        drawerState,
        allUsers,
        allTasks,
        isAdmin,
        taskToEdit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showEditModal: task => dispatch(openEditModal(task)),
        deleteTask: taskId => dispatch(deleteTask(taskId)),
        loadBoard: () => dispatch(loadBoardData()),
        toggleDrawer: () => dispatch(toggleDrawer()),
        applyEdit: (id, editedTask) => dispatch(editTask(id, editedTask))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Board));
