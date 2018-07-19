import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { connect } from "react-redux";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { changeTaskStatus } from "../store/actions";

const statuses = ["To Do", "In Progress", "Peer Review", "Done"];

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.handleStatus = this.handleStatus.bind(this);
    }

    handleStatus(id, e) {
        this.props.onChangeStatus(id, e.target.value);
    }

    render() {
        const { task } = this.props;
        const isAdmin = false;
        return (
          <div>
            <Card>
              <CardHeader
                title={task.title}
                subheader={`Status: ${task.status}`}
              />
              <CardContent>
                <Typography component="p">
                  {task.shortDescription}
                </Typography>
              </CardContent>
              <CardContent>
                <InputLabel htmlFor="status">
                  Change status
                </InputLabel>
                <Select
                  native
                  inputProps={{ id: "status" }}
                  onChange={e => this.handleStatus(task.id, e)}
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
                  })
                }
                </Select>
              </CardContent>
            </Card>
          </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeStatus: (id, status) => dispatch(changeTaskStatus(id, status))
    };
}

export default connect(null, mapDispatchToProps)(Task);
