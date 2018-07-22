import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Task from "../Task";
import styles from "./styles";


const TasksPage = ({ taskList, classes }) => (
  <Grid container spacing={24} justify="center" className={classes.container}>
    <Grid item xs="auto">
      <Typography variant="display3" align="center">
        Tasks
      </Typography>
      <Grid container justify="center" spacing={16}>
        {Object.keys(taskList).map(item => (
          <Grid key={item} item>
            <Paper elevation={1} className={classes.taskItself}>
              <Task task={taskList[item]} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);

export default withStyles(styles)(TasksPage);
