import React from "react";
import { connect } from "react-redux";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    withStyles
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { openModal } from "../store/actions";

const styles = {};

const User = ({ profileInfo, showModal }) => (
  <div>
    <ListItem
      button
      onClick={() => showModal(profileInfo)}
    >
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      <ListItemText primary={`${profileInfo.firstName} ${profileInfo.lastName}`} />
    </ListItem>
    <Divider />
  </div>
);

function mapDispatchToProps(dispatch) {
    return {
        showModal: userInfo => dispatch(openModal(userInfo))
    };
}

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(User));
