import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import UserSelect from "../UserSelect";
import StatusSelect from "../StatusSelect";
import { closeEditModal } from "../../store/actions";
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


class EditTaskModal extends React.Component {
    render() {
        const {
            userList,
            isOpened,
            isApplyingChanges,
            handleSubmit,
            closeEditTaskModal,
            serverMessage,
            classes,
            pristine
        } = this.props;
        return (
          <div className={classes.editForm}>
            <Dialog
              open={isOpened}
              onClose={closeEditTaskModal}
              scroll="paper"
              aria-labelledby="edit-task-title"
            >
              <div className={classes.editForm}>
                <DialogTitle id="edit-task-title">
                  Edit task
                </DialogTitle>
                <DialogContent>
                  <form onSubmit={handleSubmit} styles={{ width: "90%" }}>
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
                    <div className={classes.input}>
                      <Field
                        name="status"
                        component={StatusSelect}
                        changeHandler={this.onSelect}
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

                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={classes.submitButtom}
                      disabled={isApplyingChanges || pristine}
                    >
                      Apply
                      {isApplyingChanges
                        && <CircularProgress className={classes.circular} size={10} /> }
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={closeEditTaskModal}
                    >
                      Cancel
                    </Button>
                    <Typography variant="subheading" className={classes.serverMessage}>
                      {serverMessage}
                    </Typography>
                  </form>
                </DialogContent>
              </div>
            </Dialog>
          </div>
      );
    }
}

function mapStateToProps(state) {
    const userList = state.boardData.allUsers;
    const {
        isOpened,
        isApplyingChanges,
        serverMessage
    } = state.editTaskModal;
    return {
        isOpened,
        isApplyingChanges,
        serverMessage,
        userList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        closeEditTaskModal: () => dispatch(closeEditModal())
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(
    reduxForm({
      form: "editTask",
      validate
    })(EditTaskModal)
));
