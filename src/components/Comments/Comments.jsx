import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Comment from "../Comment/Comment";
import styles from "./styles";


const Comments = ({
    commentList,
    classes,
    taskId,
    removeComment,
    isAdmin,
    currentUser
}) => {
    if (!commentList.length) {
        return (
          <Typography variant="subheading">
            There are no comments yet
          </Typography>);
    }
    return (
      <Card className={classes.commentsBlock}>
        <CardContent>
          <List>
            {commentList.map(comment => (
              (
                <div key={comment.createdAt}>
                  <Comment
                    content={comment}
                    taskId={taskId}
                    isAdmin={isAdmin}
                    currentUser={currentUser}
                    removeComment={removeComment}
                  />
                  <Divider />
                </div>)))
            }
          </List>
        </CardContent>
      </Card>
    );
};

export default withStyles(styles)(Comments);
