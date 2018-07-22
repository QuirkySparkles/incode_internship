import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import styles from "./styles";


const Header = (props) => {
  const { classes } = props;
    return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Task App
          </Typography>
          <NavLink to="/" className={classes.link}>
            <Button color="inherit">
              Profile
            </Button>
          </NavLink>
          <NavLink to="/tasks" className={classes.link}>
            <Button color="inherit">
              Tasks
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    );
};

export default withStyles(styles)(Header);
