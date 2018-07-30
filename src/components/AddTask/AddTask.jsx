import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { NavLink, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import UserSelect from "../UserSelect";
import { clearTaskServerMessage } from "../../store/actions/tasks";
import styles from "./styles";


const validate = (values) => {
    const errors = {};

    if (!values.title) {
        errors.title = "Required";
    } else if (values.title.length > 30) {
        errors.title = "Max length = 30 symbols";
    }

    if (!values.shortDescription) {
        errors.shortDescription = "Required";
    } else if (values.shortDescription.length > 30) {
        errors.shortDescription = "Max length = 30 symbols";
    }

    if (!values.fullDescription) {
        errors.fullDescription = "Required";
    } else if (values.fullDescription.length > 2000) {
        errors.fullDescription = "Max length exceeded";
    }

    if (!values.performerId) errors.performerId = "Required";

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
    error={error && touched}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);


const renderFullDesc = ({
  label,
  rows,
  input,
  meta: { error, touched }
}) => (
  <TextField
    label={label}
    multiline
    fullWidth
    margin="dense"
    error={error && touched}
    helperText={touched && error}
    rows={rows}
    {...input}
  />
);


class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.addTask = this.addTask.bind(this);
    }

    componentDidMount() {
        this.props.clearMessage();
    }

    addTask(newTask) {
        this.props.addTask(newTask);
    }

    render() {
        const {
            handleSubmit,
            classes,
            userList,
            serverMessage,
            pristine,
            isChanging,
            isAdmin
        } = this.props;

        if (!isAdmin) {
            return (<Redirect to="/main" />);
        }

        return (
          <div className={classes.editForm}>
            <Typography variant="display1" align="center">
              Add new task
            </Typography>
            <form onSubmit={handleSubmit}>
              <div className={classes.input}>
                <Field name="title" component={renderTextField} label="Title" />
              </div>
              <div className={classes.input}>
                <Field name="shortDescription" component={renderTextField} label="Short description" />
              </div>
              <div className={classes.input}>
                <Field
                  label="Description"
                  name="fullDescription"
                  component={renderFullDesc}
                  type="text"
                  rows="5"
                />
              </div>
              <div>
                <Field
                  name="performerId"
                  userList={userList}
                  component={UserSelect}
                  changeHandler={this.onSelect}
                />
              </div>
              <br />
              <Button variant="contained" color="primary" type="submit" className={classes.submitButtom} disabled={isChanging || pristine}>
                Create
                {isChanging
                  && <CircularProgress className={classes.circular} size={10} /> }
              </Button>
              <NavLink to="/main" className={classes.cancel}>
                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </NavLink>
              <Typography variant="subheading" className={classes.serverMessage}>
                {serverMessage}
              </Typography>
            </form>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const userList = state.boardData.allUsers;
    const { isChanging, serverMessage } = state.taskManagement;
    const { isAdmin } = state.profileInfo;
    return {
        isChanging,
        serverMessage,
        userList,
        isAdmin
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clearMessage: () => dispatch(clearTaskServerMessage())
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(
    reduxForm({
      form: "addTask",
      validate
    })(AddTask)
));
