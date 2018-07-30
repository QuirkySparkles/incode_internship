import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CommentIcon from "@material-ui/icons/Comment";
import styles from "./styles";


const Comment = ({
    content,
    removeComment,
    taskId,
    isAdmin,
    currentUser,
    classes
}) => {
  const isAuthor = currentUser === content.authorId;
  const creationTime = content.createdAt;
  const createdAt = `added ${creationTime.slice(8, 10)}.${creationTime.slice(5, 7)}.${creationTime.slice(0, 4)} at ${creationTime.slice(11, 16)}`;

  return (
    <ListItem>
      <ListItemIcon>
        <CommentIcon />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="subheading">
          {content.author}
        </Typography>
        <Typography variant="body2" style={{ whiteSpace: "pre-wrap" }}>
          {content.text}
        </Typography>
        <Typography variant="caption">
          {createdAt}
        </Typography>
        {(isAuthor || isAdmin)
          && (
          <Typography
            variant="caption"
            onClick={() => removeComment(taskId, content.createdAt)}
            className={classes.delete}
          >
           Delete
          </Typography>
        )}
      </ListItemText>
    </ListItem>
  );
};

export default withStyles(styles)(Comment);
