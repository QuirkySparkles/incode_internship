import React from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

const validate = (values) => {
    const errors = {};
    const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "birthDate",
    ];
    requiredFields.forEach((field) => {
        if (!values[field]) {
            errors[field] = true;
        }
    });
    const today = new Date();

    if (values.firstName.length > 20) {
        errors.firstName = true;
    }

    if (values.lastName.length > 20) {
        errors.lastName = true;
    }

    if (today.getFullYear() - +values.birthDate.slice(0, 4) < 15
        || today.getFullYear() - +values.birthDate.slice(0, 4) > 100) {
        errors.birthDate = true;
    }

    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = true;
    }

    return errors;
};

const renderTextField = ({
    input,
    label,
    meta: { error },
    ...custom
}) => (
  <TextField
    label={label}
    fullWidth
    error={error}
    {...input}
    {...custom}
  />
);

const renderDatePicker = ({
    input,
    label,
    meta: { error },
    ...custom
}) => (
  <TextField
    label={label}
    fullWidth
    error={error}
    {...input}
    {...custom}
    type="date"
    InputLabelProps={{
        shrink: true,
    }}
  />
);

const EditForm = ({ handleSubmit, handleCancel, classes }) => (
  <div className={classes.editForm}>
    <Typography variant="display1" align="center">
      Edit
    </Typography>
    <form onSubmit={handleSubmit}>
      <div className={classes.input}>
        <Field name="firstName" component={renderTextField} label="First name" />
      </div>
      <div className={classes.input}>
        <Field name="lastName" component={renderTextField} label="Last name" />
      </div>
      <div className={classes.input}>
        <Field name="birthDate" component={renderDatePicker} label="Birth date" />
      </div>
      <div className={classes.input}>
        <Field name="email" component={renderTextField} label="Email" />
      </div>
      <div>
        <Field name="skillList" component={renderTextField} label="List of skills" />
        <FormHelperText>
          Use comma for separation
        </FormHelperText>
      </div>
      <br />
      <Button variant="contained" color="primary" type="submit" className={classes.submitButtom}>
         Apply changes
      </Button>
      <Button variant="contained" color="secondary" onClick={() => handleCancel(false)}>
        Cancel
      </Button>
    </form>
  </div>
);

export default withStyles(styles)(
    reduxForm({
      form: "editForm",
      validate
    })(EditForm)
);
