import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import SkillList from "../SkillList";
import styles from "./styles";


const UserInfo = ({ profileInfo, turnOnEdit, classes }) => {
    const date = profileInfo.birthDate;
    const birthDate = `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`;
    return (
      <div>
        <Typography variant="display2" align="center" className={classes.title}>
          Profile info
        </Typography>
        <Card className={classes.general}>
          <IconButton color="default" onClick={() => turnOnEdit()} className={classes.editIcon}>
            <Edit />
          </IconButton>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {`${profileInfo.firstName} ${profileInfo.lastName}`}
            </Typography>
            <Typography gutterBottom variant="title">
              Date of birth:
              {birthDate}
            </Typography>
            <Typography gutterBottom variant="title">
              Email:
              {profileInfo.email}
            </Typography>
            <br />
            <Typography variant="title">
              List of skills:
            </Typography>
            <List>
              {profileInfo.skillList.map((skill) => {
                if (skill) {
                  return <SkillList key={skill} skill={skill} />;
                }
                return (
                  <Typography variant="title">
                    No skills specified.
                  </Typography>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </div>
    );
};

export default withStyles(styles)(UserInfo);
