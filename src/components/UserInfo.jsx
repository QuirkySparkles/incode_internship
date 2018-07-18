import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Fiber from "@material-ui/icons/PlayArrow";
import "./UserInfo.css";


const UserInfo = ({ clientInfo, turnOnEdit }) => {
    const date = clientInfo.birthDate;
    const birthDate = `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`;
    const listItems = clientInfo.skillList.map(item => (
      <ListItem key={item}>
        <ListItemIcon>
          <Fiber />
        </ListItemIcon>
        <ListItemText primary={item} />
      </ListItem>));
    return (
      <div>
        <Card>
          <CardContent>
            <Edit onClick={() => turnOnEdit(true)} className="edit-icon" />
            <Typography gutterBottom variant="headline" component="h2">
              {`${clientInfo.firstName} ${clientInfo.lastName}`}
            </Typography>
            <Typography component="p">
              Date of birth:
              {birthDate}
            </Typography>
            <Typography component="p">
              Email:
              {clientInfo.email}
            </Typography>
            <br />
            <Typography variant="title">
              List of skills:
            </Typography>
            {clientInfo.skillList[0]
              ? (
                <div>
                  <List>
                    {listItems}
                  </List>
                </div>)
              : (
                <Typography component="p">
                  No skills specified
                </Typography>)
            }
          </CardContent>
        </Card>
      </div>
    );
};

export default UserInfo;
