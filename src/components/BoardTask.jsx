import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";


const BoardTask = ({ task }) => (
  <Card>
    <CardHeader
      title={task.title}
      subheader={`Status: ${task.status}`}
    />
    <CardContent>
      <Typography component="p">
        {task.shortDescription}
      </Typography>
      <br />
      <Typography component="p" style={{ fontWeight: "bold" }}>
        {`Performer: ${task.performer}`}
      </Typography>
    </CardContent>
  </Card>
);

export default BoardTask;
