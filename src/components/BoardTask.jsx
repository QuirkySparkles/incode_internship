import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";


const BoardTask = ({
    task,
    deleteTask,
    isAdmin,
    showEditModal
}) => (
  <Card>
    <Link to={`/tasks/${task._id}`} style={{ textDecoration: "none" }}>
      <CardHeader
        title={task.title}
        subheader={`Status: ${task.status}`}
      />
      <CardContent style={{ marginTop: "-15px", marginBottom: "-20px" }}>
        <Typography component="p">
          {task.shortDescription}
        </Typography>
        <br />
        <Typography component="p" style={{ fontWeight: "bold" }}>
          {`Performer: ${task.performer}`}
        </Typography>
      </CardContent>
    </Link>
    {isAdmin
        && (
        <div>
          <IconButton color="default" onClick={() => showEditModal(task)}>
            <Edit />
          </IconButton>
          <IconButton color="default" onClick={() => deleteTask(task._id)}>
            <Delete />
          </IconButton>
        </div>)
      }
  </Card>
);


export default BoardTask;
