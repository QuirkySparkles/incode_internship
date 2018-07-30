import React from "react";
import { Select, FormControl } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";

const styles = {
    selector: {
        minWidth: 150
    }
};

const statuses = ["To Do", "In Progress", "Peer Review", "Done"];

const StatusSelect = ({
    changeHandler,
    input,
    classes,
    meta: { error, touched }
}) => (
  <FormControl>
    <InputLabel htmlFor="status-select">
       Status
    </InputLabel>
    <Select
      onChange={event => changeHandler(event.target.value)}
      error={error && touched}
      id="selection"
      className={classes.selector}
      input={<Input id="status-select" />}
      {...input}
    >
      {statuses.map(status => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default withStyles(styles)(StatusSelect);
