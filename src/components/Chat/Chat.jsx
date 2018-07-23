import React from "react";
import { connect } from "react-redux";
import {
    Dialog, DialogContent, DialogTitle, DialogContentText, Input, Typography
} from "@material-ui/core";
// import { changeTaskStatus } from "../store/actions";


class Task extends React.Component {
/*    constructor(props) {
        super(props);
        this.handleStatus = this.handleStatus.bind(this);
    }*/

/*    handleStatus(id, e) {
        this.props.onChangeStatus(id, e.target.value);
    }*/

    render() {
        const { task } = this.props;
        const isAdmin = false;
  }
}

/*function mapDispatchToProps(dispatch) {
    return {
        onChangeStatus: (id, status) => dispatch(changeTaskStatus(id, status))
    };
}*/

export default connect(null, mapDispatchToProps)(Task);
