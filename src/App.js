import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { getPosts, editUserInfo } from "./store/actions";
import ProfilePage from "./components/ProfilePage";

class App extends Component {
    constructor(props) {
        super(props);
        this.onEditChange = this.onEditChange.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getPosts());
    }

    onEditChange(values) {
        this.props.dispatch(editUserInfo(values));
    }

    render() {
        const { clientInfo } = this.props;
        return (
          <div className="App">
            <ProfilePage clientInfo={clientInfo} onEditChange={this.onEditChange} />
          </div>
        );
    }
}

function mapStateToProps(state) {
    const clientInfo = state.getFiles;
    const { form } = state;
    return {
        clientInfo,
        form
    };
}

export default connect(mapStateToProps)(App);
