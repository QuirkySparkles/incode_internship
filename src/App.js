import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import Loader from "./components/Loader";
import getPosts from "./store/actions/thunk/getPosts";
import { editProfile } from "./store/actions";
import ProfilePage from "./components/ProfilePage";
import TasksPage from "./components/TasksPage/TasksPage";
import TasksReview from "./components/TaskReview/TaskReview";
import Header from "./components/Header/Header";


class App extends Component {
    constructor(props) {
        super(props);
        this.onEditChange = this.onEditChange.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getPosts("userProfile"));
        this.props.dispatch(getPosts("taskList"));
    }

    onEditChange(values) {
        this.props.dispatch(editProfile(values));
    }

    render() {
        const { profileInfo, taskList } = this.props;
        if (!profileInfo.results || !Object.keys(taskList).length) {
            return (
              <div className="circular">
                <Loader />
              </div>
            );
        }
        return (
          <div className="App">
            <Header />
            <Route
              path="/"
              exact
              render={() => (
                <ProfilePage
                  profileInfo={profileInfo}
                  onEditChange={this.onEditChange}
                />
              )}
            />
            <Route
              path="/tasks"
              exact
              render={() => <TasksPage taskList={taskList} />}
            />
            <Route
              path="/tasks/:id"
              component={TasksReview}
            />
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { requestProfile, requestTasks, profileInfo } = state;
    const { taskList } = state.profileTasks;
    const { form } = state;
    return {
        requestProfile,
        requestTasks,
        profileInfo,
        taskList,
        form
    };
}

export default withRouter(
    connect(mapStateToProps)(App)
);
