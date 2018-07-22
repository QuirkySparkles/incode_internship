import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "./TasksPage.css";
import Task from "./Task";

class TasksList extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        if (Object.keys(this.props.taskList).length) {
            const { taskList } = this.props;
            return (
              <Grid container spacing={24}>
                <Grid item xs="auto">
                  <Typography variant="display3" align="center">
                    Tasks
                  </Typography>
                  <Grid container justify="space-around" spacing={16}>
                    {taskList.tasks.map(item => (
                      <Grid key={item.id} item>
                        <Paper elevation={1} className="task-itself">
                          <Task task={item} />
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            );
        }
        return (
          <div>
            <CircularProgress />
          </div>
        );
    }
}


export default TasksList;
