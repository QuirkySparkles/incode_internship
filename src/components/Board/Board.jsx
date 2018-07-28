import React from "react";
import { connect } from "react-redux";
import { Drawer, List, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Loader from "../Loader";
import loadBoardData from "../../store/actions/thunk/loadBoardData";
import { deleteTask } from "../../store/actions/thunk/tasks";
import toggleDrawer from "../../store/actions/drawer";
import User from "../User";
import AllTasks from "../AllTasks/AllTasks";
import styles from "./styles";


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    toggleDrawer() {
        this.props.toggleDrawer();
    }

    deleteTask(taskId) {
        this.props.deleteTask(taskId);
    }

    render() {
        const {
            drawerState,
            allUsers,
            allTasks,
            classes,
            isAdmin,
            serverMessage
        } = this.props;

        if (serverMessage) {
            return (
              <Typography variant="display1" className={classes.serverMessage}>
                {serverMessage}
              </Typography>
            );
        }

        if (!allUsers.length || !allTasks.length) {
            return <Loader />;
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
                {allUsers.map(user => (
                  <User
                    key={user.login}
                    firstName={user.firstName}
                    lastName={user.lastName}
                  />
                ))}
              </List>
            </Drawer>
            <AllTasks
              allTasks={allTasks}
              deleteTask={this.deleteTask}
              isAdmin={isAdmin}
            />
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { drawerState } = state;
    const { allUsers, allTasks, serverMessage } = state.boardData;
    const { isAdmin } = state.profileInfo;
    return {
        serverMessage,
        drawerState,
        allUsers,
        allTasks,
        isAdmin
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteTask: taskId => dispatch(deleteTask(taskId)),
        loadBoard: () => dispatch(loadBoardData()),
        toggleDrawer: () => dispatch(toggleDrawer())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Board));
