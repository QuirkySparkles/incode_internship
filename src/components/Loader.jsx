import React from "react";
import { CircularProgress, withStyles } from "@material-ui/core";

const styles = {
    loader: {
        position: "absolute",
        top: "45%",
        left: "45%"
    }
};

const Loader = ({ classes }) => <CircularProgress size={50} className={classes.loader} />;

export default withStyles(styles)(Loader);
