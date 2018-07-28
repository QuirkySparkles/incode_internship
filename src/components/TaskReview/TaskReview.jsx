import React from "react";
import { connect } from "react-redux";
import { reset } from "redux-form";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";
import { loadProfile } from "../../store/actions/thunk/profile";
import { getActiveTask } from "../../store/actions";
import { addComment, changeTaskStatus } from "../../store/actions/thunk/tasks";
import { clearCommentServerMessage } from "../../store/actions/handleComments";
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
        const currentTask = this.props.allTasks.filter(task => task._id === id)[0];
        this.props.clearServerMessage();
        if (currentTask) {
            this.props.getTask(currentTask);
        } else this.props.getTask({});
    }

    handleStatus(id, e) {
        this.props.onChangeStatus(id, e.target.value, this.props.profileInfo._id);
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
        const {
            currentTask,
            classes,
            isAdmin,
            profileInfo,
            serverMessage
        } = this.props;
        const { id } = this.props.match.params;
        const isUserPerformer = currentTask.performerId === profileInfo._id;
        if (!currentTask.comments) {
        return (
          <Typography variant="display1" align="center" className={classes.warning}>
            {"This task doesn't exist."}
          </Typography>);
        }
        return (
          <div>
            <Typography variant="display2" align="center" className={classes.headline}>
              Task Review
            </Typography>
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {currentTask.title}
              </Typography>
              <Typography variant="subheading">
                {`Status: ${currentTask.status}`}
              </Typography>
              <Typography variant="subheading">
                {`Description: ${currentTask.fullDescription}`}
              </Typography>
              <br />
              <Typography variant="subheading">
                {`Performer: ${currentTask.performer}`}
              </Typography>
            </CardContent>
            {(isAdmin || isUserPerformer)
             && (
             <CardContent>
               <InputLabel htmlFor="status" className={classes.select}>
                 Change status:
               </InputLabel>
               <Select
                 native
                 inputProps={{ id: "status" }}
                 onChange={e => this.handleStatus(id, e)}
                 value={currentTask.status}
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
             </CardContent>)
            }
            <CardContent>
              <Typography variant="headline">
                Comments:
              </Typography>
              <Comments
                commentList={currentTask.comments}
              />
              <Typography
                variant="subheading"
              >
                {serverMessage}
              </Typography>
              <br />
              <AddComment onSubmit={this.addComment} />
            </CardContent>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { requestTasks, profileInfo } = state;
    const isAuth = state.loginStatus;
    const { allTasks } = state.boardData;
    const { isAdmin } = state.profileInfo;
    const currentTask = state.profileTasks.activeTask;
    const activeUser = `${state.profileInfo.firstName} ${state.profileInfo.lastName}`;
    const { serverMessage } = state.handleComments;
    return {
        requestTasks,
        allTasks,
        isAdmin,
        isAuth,
        currentTask,
        activeUser,
        profileInfo,
        serverMessage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadProfile: () => dispatch(loadProfile()),
        getTask: id => dispatch(getActiveTask(id)),
        onChangeStatus: (id, status, performerId) => (
            dispatch(changeTaskStatus(id, status, performerId))
        ),
        addComment: (newComment, id) => dispatch(addComment(newComment, id)),
        clearServerMessage: () => dispatch(clearCommentServerMessage()),
        resetField: () => dispatch(reset("AddComment"))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(TaskReview));
