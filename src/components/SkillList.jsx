import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Fiber from "@material-ui/icons/PlayArrow";
import Divider from "@material-ui/core/Divider";


const SkillList = ({ skill }) => (
  <div>
    <ListItem>
      <ListItemIcon>
        <Fiber />
      </ListItemIcon>
      <ListItemText primary={skill} />
    </ListItem>
    <Divider />
  </div>
);

export default SkillList;
