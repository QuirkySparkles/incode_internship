import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { NavLink, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import tryLogin from "../../store/actions/thunk/login";
import styles from "./styles";


const validate = (values) => {
    const errors = {};

    if (!values.login) errors.login = "Required";

    else if (values.login.indexOf("@") === -1) {
        if (values.login.length < 3 || values.login.length > 30) {
            errors.login = "Login length is not correct";
        }
    } else if (values.login.indexOf("@") !== -1) {
        if (values.login && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)) {
            errors.login = "Incorrect email";
        } else if (values.login.length > 30) {
            errors.login = "Email is too long";
        }
    }

    if (!values.password) errors.password = "Required";

    return errors;
};

const renderTextField = ({
    input,
    label,
    meta: { error, touched },
    ...custom
}) => (
  <TextField
    label={label}
    fullWidth
    helperText={touched && error}
    error={error && touched}
    {...input}
    {...custom}
  />
);


let Login = ({
    handleSubmit,
    onLogin,
    classes,
    isAuth,
    errMessage,
    isLoginIn
}) => {
    if (isAuth) {
        return (<Redirect to="/main" />);
    }
    return (
      <div className={classes.loginForm}>
        <Typography variant="display1" align="center">
          Welcome
        </Typography>
        <form onSubmit={handleSubmit(onLogin)}>
          <div className={classes.input}>
            <Field name="login" component={renderTextField} label="Login or Email" />
          </div>
          <div className={classes.input}>
            <Field name="password" type="password" component={renderTextField} label="Password" />
          </div>
          {errMessage && (
            <Typography variant="body1" align="center">
              {errMessage}
            </Typography>)}
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            className={classes.buttons}
            disabled={isLoginIn}
          >
            Login
          </Button>
          <NavLink to="/registration" className={classes.link}>
            <Button variant="contained" color="secondary" size="large" className={classes.buttons}>
              Registration
            </Button>
          </NavLink>
        </form>
        {isLoginIn
          && <CircularProgress className={classes.circular} size={20} /> }
      </div>
    );
};

function mapStateToProps(state) {
    const { isLoginIn } = state.loginStatus;
    const isAuth = state.loginStatus.status;
    const errMessage = state.loginStatus.serverMessage;
    return {
        isLoginIn,
        errMessage,
        isAuth
    };
}


function mapDispatchToProps(dispatch) {
    return {
        onLogin: (data) => {
            dispatch(tryLogin(data));
            dispatch(reset("login"));
        }
    };
}

Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default withStyles(styles)(
    reduxForm({
      form: "login",
      validate
    })(Login)
);
