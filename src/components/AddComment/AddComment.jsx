import React from "react";
import { Field, reduxForm } from "redux-form";
import IconButton from "@material-ui/core/IconButton";
import Forward from "@material-ui/icons/Forward";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styles from "./styles";

const validate = (value) => {
    const errors = {};
    if (!value.text) errors.text = "Field is empty.";
    else if (value.text.length > 2000) errors.text = "Message is too long.";
    return errors;
};

const CommentField = ({
  rows,
  input,
  placeholder,
  meta: { error, touched }
}) => (
  <TextField
    multiline
    fullWidth
    margin="dense"
    placeholder={placeholder}
    helperText={touched && error}
    rows={rows}
    {...input}
  />
);

const AddComment = ({ handleSubmit, classes }) => (

  <form onSubmit={handleSubmit}>
    <div className={classes.comment}>
      <Field
        name="text"
        component={CommentField}
        type="text"
        placeholder="Your comment..."
        rows="5"
      />
    </div>
    <IconButton color="primary" type="submit" className={classes.button}>
      <Forward />
    </IconButton>
  </form>
);

export default withStyles(styles)(
    reduxForm({
      form: "AddComment",
      validate
    })(AddComment)
);
