import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import BoardTask from "../BoardTask";
import styles from "./styles";


const TasksPage = ({ allTasks, classes }) => (
  <Grid container spacing={16} justify="center">
    <Grid item xs="auto">
      <Typography variant="display3" align="center" className={classes.title}>
        All Tasks
      </Typography>
      <Grid container justify="center" spacing={16}>
        {Object.keys(allTasks).map(item => (
          <Grid key={item} item>
            <Paper elevation={1} className={classes.taskItself}>
              <BoardTask task={allTasks[item]} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);

export default withStyles(styles)(TasksPage);
