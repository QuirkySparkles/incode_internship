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
import { logout } from "../../store/actions/login";
import styles from "./styles";


const Header = ({
    classes, turnOnDrawer, currentPath, isAuth, logOut, isAdmin
}) => {
    const path = isAuth ? "/main" : "/";
    return (
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
          <NavLink to={path} className={classes.banner}>
            <Typography variant="title" color="inherit">
              Task App
            </Typography>
          </NavLink>
          <div className={classes.flex} />
          {isAuth
             && (
             <div>
               {isAdmin
                && (
                <NavLink to="/add_task" className={classes.link}>
                  <Button color="inherit">
                    Create task
                  </Button>
                </NavLink>
                )}
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
               <NavLink to="/" className={classes.link}>
                 <Button
                   color="inherit"
                   onClick={logOut}
                 >
                   Log out
                 </Button>
               </NavLink>
             </div>
          )}
        </Toolbar>
      </AppBar>
    );
};

function mapStateToProps(state) {
    const currentPath = state.router.location.pathname;
    const isAuth = state.loginStatus.status;
    const { isAdmin } = state.profileInfo;
    return {
        currentPath,
        isAuth,
        isAdmin
    };
}

function mapDispatchToProps(dispatch) {
    return {
        turnOnDrawer: () => dispatch(toggleDrawer()),
        logOut: () => {
            localStorage.removeItem("token"); // eslint-disable-line no-undef
            dispatch(logout());
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Header));
