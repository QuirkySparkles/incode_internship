import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { getPosts, editUserInfo } from "./store/actions";
import ProfilePage from "./components/ProfilePage";
import TasksPage from "./components/TasksPage";


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
        this.props.dispatch(editUserInfo(values));
    }

    render() {
        const { clientInfo, taskList } = this.props;
        return (
          <div className="App">
            <Route
              path="/"
              exact
              render={() => (
                <ProfilePage
                  clientInfo={clientInfo}
                  onEditChange={this.onEditChange}
                />
              )}
            />
            <Route
              path="/tasks"
              exact
              render={() => <TasksPage taskList={taskList} />}
            />
          </div>
        );
    }
}

function mapStateToProps(state) {
    const clientInfo = state.getProfileInfo;
    const taskList = state.getProfileTasks;
    const { form } = state;
    return {
        clientInfo,
        taskList,
        form
    };
}

export default withRouter(
    connect(mapStateToProps)(App)
);
