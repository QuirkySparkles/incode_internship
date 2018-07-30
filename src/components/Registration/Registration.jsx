import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { NavLink, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import tryRegistration from "../../store/actions/thunk/registration";
import styles from "./styles";


const validate = (values) => {
    const errors = {};
    const loginTemplate = /^[A-Za-z0-9\- ]+$/;

    if (!values.email) errors.email = "Required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Incorrect email";
    } else if (values.email.length > 30) {
        errors.email = "Email is too long";
    }

    if (!values.login) errors.login = "Required";
    else if (values.login.length < 3 || values.login.length > 30) {
        errors.login = "Login length is not correct";
    } else if (!values.login.match(loginTemplate)) {
        errors.login = "Only numeral and alphabetical characters are allowed";
    }

    if (!values.password) errors.password = "Required";
    else if (!values.repeatPassword) errors.repeatPassword = "Required";
    else if (values.password.length < 8) errors.password = "Minimal allowed length - 8 characters";
    else if (values.password !== values.repeatPassword) errors.repeatPassword = "Passwords are not match.";

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


let Registration = ({
    isAuth,
    handleSubmit,
    onRegistration,
    classes,
    errMessage,
    isSigningUp
}) => {
    if (isAuth) {
        return (<Redirect to="/main" />);
    }
    return (
      <div className={classes.regForm}>
        <Typography variant="display1" align="center">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onRegistration)}>
          <div className={classes.input}>
            <Field name="email" component={renderTextField} label="Email" />
          </div>
          <div className={classes.input}>
            <Field name="login" component={renderTextField} label="Login" />
          </div>
          <div className={classes.input}>
            <Field name="password" type="password" component={renderTextField} label="Password" />
          </div>
          <div className={classes.input}>
            <Field name="repeatPassword" type="password" component={renderTextField} label="Repeat password" />
          </div>
          {errMessage && (
            <Typography variant="body1" align="center">
              {errMessage}
            </Typography>)
          }
          <br />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            size="large"
            className={classes.buttons}
            disabled={isSigningUp}
          >
            Register
          </Button>
          <NavLink to="/" className={classes.link}>
            <Button variant="contained" color="primary" size="large" className={classes.buttons}>
              To Sign In
            </Button>
          </NavLink>
          {isSigningUp
            && <CircularProgress className={classes.circular} size={20} /> }
        </form>
      </div>
    );
};

function mapStateToProps(state) {
    const isAuth = state.loginStatus.status;
    const isSigningUp = state.registrationReq.status;
    const errMessage = state.registrationReq.serverMessage;
    return {
        isSigningUp,
        errMessage,
        isAuth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onRegistration: data => dispatch(tryRegistration(data))
    };
}

Registration = connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration);

export default withStyles(styles)(
    reduxForm({
      form: "registration",
      validate
    })(Registration)
);
