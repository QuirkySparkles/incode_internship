import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Task from "../Task";
import styles from "./styles";


const ProfileTasksPage = ({ taskList, classes, serverMessage }) => (
  <div style={{ padding: 25 }}>
    <Grid container spacing={24} justify="center" className={classes.container}>
      <Grid item xs="auto">
        <Typography variant="display3" align="center">
          Tasks
        </Typography>
        <Grid container justify="center" spacing={16}>
          {serverMessage
            && (
            <Typography variant="display1" align="center" className={classes.tip2}>
              {serverMessage}
            </Typography>
           )}
          {(!taskList[0] && !serverMessage)
            && (
            <Typography variant="display1" align="center" className={classes.tip}>
              You have no tasks for now
            </Typography>
          )}
          {taskList.map(task => (
            <Grid key={task._id} item>
              <Paper elevation={1} className={classes.taskItself}>
                <Task task={task} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </div>
);

function mapStateToProps(state) {
    const { firstName, lastName } = state.profileInfo;
    const { serverMessage } = state.requestProfile; // !!! profile tasks !!!
    const isAuth = state.loginStatus;
    const { taskList } = state.profileTasks;
    return {
        isAuth,
        taskList,
        firstName,
        lastName,
        serverMessage
    };
}


export default connect(
    mapStateToProps
)(withStyles(styles)(ProfileTasksPage));
