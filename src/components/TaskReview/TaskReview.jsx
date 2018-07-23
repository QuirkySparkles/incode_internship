import React from "react";
import Card from "@material-ui/core/Card";
import { connect } from "react-redux";
import { reset } from "redux-form";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { changeTaskStatus, getActiveTask, addComment } from "../../store/actions";
import Comments from "../Comments/Comments";
import AddComment from "../AddComment/AddComment";
import styles from "./styles";

const statuses = ["To Do", "In Progress", "Peer Review", "Done"];


class TaskReview extends React.Component {
    constructor(props) {
        super(props);
        this.handleStatus = this.handleStatus.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getTask(id);
    }

    handleStatus(id, e) {
        this.props.onChangeStatus(id, e.target.value);
        this.props.getTask(id);
    }

    addComment(newComment) {
        const { id } = this.props.match.params;
        const { activeUser } = this.props;
        const tzOffset = (new Date()).getTimezoneOffset() * 60000;
        const prepareComment = Object.assign({}, newComment, {
            author: activeUser,
            createdAt: (new Date(Date.now() - tzOffset)).toISOString().slice(0, -1)
        });
        this.props.addComment(prepareComment, id);
        this.props.resetField();
    }

    render() {
        const { currentTask, classes } = this.props;
        const { id } = this.props.match.params;
        const isAdmin = false;
        if (!currentTask.comments) {
        return (
          <div>
            <CircularProgress />
          </div>);
        }
        return (
          <div>
            <Card>
              <Typography variant="display2" align="center" className={classes.headline}>
                Task Review
              </Typography>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {currentTask.title}
                </Typography>
                <Typography variant="subheading">
                  Status:
                  {currentTask.status}
                </Typography>
                <Typography variant="subheading">
                  Description:
                  {currentTask.shortDescription}
                </Typography>
              </CardContent>
              <CardContent>
                <InputLabel htmlFor="status" className={classes.select}>
                  Change status:
                </InputLabel>
                <Select
                  native
                  inputProps={{ id: "status" }}
                  onChange={e => this.handleStatus(id, e)}
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
              <CardContent>
                <Typography variant="headline">
                  Comments:
                </Typography>
                <Comments commentList={currentTask.comments} />
                <br />
                <AddComment onSubmit={this.addComment} />
              </CardContent>
            </Card>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const currentTask = state.profileTasks.activeTask;
    const activeUser = `${state.profileInfo.results[0].firstName} ${state.profileInfo.results[0].lastName}`;
    return {
        currentTask,
        activeUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTask: id => dispatch(getActiveTask(id)),
        onChangeStatus: (id, status) => dispatch(changeTaskStatus(id, status)),
        addComment: (newComment, id) => dispatch(addComment(newComment, id)),
        resetField: () => dispatch(reset("AddComment"))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(TaskReview));
