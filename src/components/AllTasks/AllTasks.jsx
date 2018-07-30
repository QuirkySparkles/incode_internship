import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import BoardTask from "../BoardTask";
import styles from "./styles";


const AllTasks = ({
    allTasks,
    classes,
    deleteTask,
    isAdmin,
    showEditModal
}) => (
  <div style={{ padding: 20 }}>
    <Grid container spacing={16} justify="center">
      <Grid item xs="auto">
        <Typography variant="display3" align="center" className={classes.title}>
          All Tasks
        </Typography>
        {!allTasks[0] && (
          <Typography variant="display1" align="center" className={classes.tip}>
            There are no tasks. At all.
          </Typography>
        )}
        <Grid container justify="center" spacing={16}>
          {allTasks.map(task => (
            <Grid key={task._id} item>
              <Paper elevation={1} className={classes.taskItself}>
                <BoardTask
                  task={task}
                  deleteTask={deleteTask}
                  isAdmin={isAdmin}
                  showEditModal={showEditModal}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(AllTasks);
