import React from "react";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import toggleDrawer from "../../store/actions/drawer";
import styles from "./styles";


const Header = ({ classes, turnOnDrawer, currentPath }) => (
  <AppBar position="static" className={classes.root}>
    <Toolbar>
      {currentPath === "/main"
       && (
       <IconButton
         color="inherit"
         aria-label="Menu"
         className={classes.menuButton}
         onClick={() => turnOnDrawer(true)}
       >
         <MenuIcon />
       </IconButton>)
            }
      <NavLink to="/main" className={classes.banner}>
        <Typography variant="title" color="inherit">
          Task App
        </Typography>
      </NavLink>
      <div className={classes.flex} />
      <NavLink to="/profile" className={classes.link}>
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

function mapStateToProps(state) {
    const currentPath = state.router.location.pathname;
    return {
        currentPath
    };
}

function mapDispatchToProps(dispatch) {
    return {
        turnOnDrawer: () => dispatch(toggleDrawer())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Header));
