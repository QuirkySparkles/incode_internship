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


const UserSelect = ({
    userList,
    changeHandler,
    input,
    classes,
    meta: { error, touched }
}) => (
  <FormControl>
    <InputLabel htmlFor="user-select">
       Performer
    </InputLabel>
    <Select
      onChange={event => changeHandler(event.target.value)}
      error={error && touched}
      id="selection"
      className={classes.selector}
      input={<Input id="user-select" />}
      {...input}
    >
      {userList.map((user) => {
        if (user.login !== "admin") {
          return (
            <MenuItem key={user._id} value={user._id}>
              {`${user.firstName} ${user.lastName}`}
            </MenuItem>
          );
      }
      return null;
    })}
    </Select>
  </FormControl>
);

export default withStyles(styles)(UserSelect);
