import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import {
    Route, withRouter, Switch, Redirect
} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Loader from "./components/Loader";
import { addTask } from "./store/actions/thunk/tasks";
import { loadProfile } from "./store/actions/thunk/profile";
import loadBoardData from "./store/actions/thunk/loadBoardData";
import { loginFailed, loginSuccess } from "./store/actions/login";
import Header from "./components/Header/Header";
import Board from "./components/Board/Board";
import ProfilePage from "./components/ProfilePage";
import TasksPage from "./components/TasksPage/TasksPage";
import TasksReview from "./components/TaskReview/TaskReview";
import Login from "./components/Login/Login";
import AddTask from "./components/AddTask/AddTask";
import Registration from "./components/Registration/Registration";
import PageNotFound from "./components/PageNotFound";


class App extends Component {
    constructor(props) {
        super(props);
        this.createTask = this.createTask.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem("token")) { // eslint-disable-line no-undef
            this.props.loginSuccess();
            this.props.loadProfile();
            this.props.loadBoard();
        } else {
            this.props.loginFailed("");
        }
    }

    createTask(newTask) {
        const toCreate = newTask;
        const performer = this.props.allUsers.filter(user => user._id === newTask.performerId)[0];
        toCreate.performer = `${performer.firstName} ${performer.lastName}`;
        this.props.addTask(toCreate);
    }

    render() {
        const { currentPath, serverMessage } = this.props;

        if (serverMessage) {
            return (
              <div>
                <Header />
                <Typography
                  variant="display1"
                  style={{ margin: "25% 0 0 17%", justify: "center" }}
                >
                  {serverMessage}
                </Typography>
              </div>
            );
        }

        if (!localStorage.getItem("token")) { // eslint-disable-line no-undef
            if (currentPath !== "/" && currentPath !== "/registration") {
                return (<Redirect to="/" />);
            }
        }

        if (this.props.isAuth && !this.props.taskList.length && this.props.requestTasks) {
            return (
              <div className="circular">
                <Loader />
              </div>
            );
        }

        if (this.props.isAuth && !this.props.firstName) {
            return (
              <div className="circular">
                <Loader />
              </div>
            );
        }

        return (
          <div className="App">
            <Header />
            <Switch>
              <Route
                exact
                path="/"
                component={Login}
              />
              <Route
                path="/registration"
                exact
                component={Registration}
              />
              <Route
                path="/main"
                exact
                component={Board}
              />
              <Route
                path="/profile"
                component={ProfilePage}
              />
              <Route
                path="/add_task"
                exact
                render={() => <AddTask onSubmit={this.createTask} />}
              />
              <Route
                path="/tasks"
                exact
                render={() => <TasksPage />}
              />
              <Route
                path="/tasks/:id"
                component={TasksReview}
              />
              <Route
                component={PageNotFound}
              />
            </Switch>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { firstName, lastName } = state.profileInfo;
    const { taskList } = state.profileTasks;
    const { allUsers } = state.boardData;
    const currentPath = state.router.location.pathname;
    const isAuth = state.loginStatus.status;
    const { serverMessage } = state.requestProfile;
    const { form, requestTasks } = state;
    return {
        firstName,
        requestTasks,
        allUsers,
        lastName,
        currentPath,
        taskList,
        isAuth,
        serverMessage,
        form
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginSuccess: () => dispatch(loginSuccess()),
        loginFailed: message => dispatch(loginFailed(message)),
        loadProfile: () => dispatch(loadProfile()),
        loadBoard: () => dispatch(loadBoardData()),
        addTask: newTask => dispatch(addTask(newTask))
    };
}


export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(App)
);
