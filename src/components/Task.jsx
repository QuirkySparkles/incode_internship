import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { connect } from "react-redux";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { Link } from "react-router-dom";
import { changeTaskStatus } from "../store/actions/thunk/tasks";

const statuses = ["To Do", "In Progress", "Peer Review", "Done"];

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.handleStatus = this.handleStatus.bind(this);
    }

    handleStatus(id, e) {
        this.props.onChangeStatus(id, e.target.value, this.props.performerId);
    }

    render() {
        const { task, isAdmin } = this.props;
        return (
          <Card>
            <Link to={`/tasks/${task._id}`} style={{ textDecoration: "none" }}>
              <CardHeader
                title={task.title}
                subheader={`Status: ${task.status}`}
              />
              <CardContent style={{ marginTop: "-15px" }}>
                <Typography component="p">
                  {task.shortDescription}
                </Typography>
              </CardContent>
            </Link>
            <CardContent>
              <InputLabel htmlFor="status">
                Change status
              </InputLabel>
              <Select
                native
                inputProps={{ id: "status" }}
                onChange={e => this.handleStatus(task._id, e)}
                value={task.status}
              >
                {statuses.map((item) => {
                  if (item === "Done" && !isAdmin) {
                    return null;
                  }
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </Select>
            </CardContent>
          </Card>
    );
  }
}

function mapStateToProps(state) {
    const { isAdmin } = state.profileInfo;
    const performerId = state.profileInfo._id;
    return {
        performerId,
        isAdmin
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeStatus: (id, status, performerId) => (
            dispatch(changeTaskStatus(id, status, performerId))
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
