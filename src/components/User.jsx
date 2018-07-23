import React from "react";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    withStyles
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

const styles = {};

const User = ({ firstName, lastName }) => (
  <div>
    <ListItem button>
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      <ListItemText primary={`${firstName} ${lastName}`} />
    </ListItem>
    <Divider />
  </div>
);

export default withStyles(styles)(User);
