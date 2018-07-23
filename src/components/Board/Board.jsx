import React from "react";
import { connect } from "react-redux";
import { Drawer, List, withStyles } from "@material-ui/core";
import Loader from "../Loader";
import { loadBoardData } from "../../store/actions/thunk";
import toggleDrawer from "../../store/actions/drawer";
import User from "../User";
import AllTasks from "../AllTasks/AllTasks";
import styles from "./styles";


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    componentDidMount() {
        this.props.loadBoardData();
    }

    toggleDrawer() {
        this.props.toggleDrawer();
    }

    render() {
        const {
            drawerState, allUsers, allTasks, classes
        } = this.props;
        if (!allUsers.length || !Object.keys(allTasks).length) {
            return <Loader />;
        }
        return (
          <div>
            <Drawer
              anchor="left"
              open={drawerState}
              className={classes.drawerPaper}
              onClose={this.toggleDrawer}
            >
              <List>
                {allUsers.map(user => (
                  <User
                    key={user.login}
                    firstName={user.firstName}
                    lastName={user.lastName}
                  />
                ))}
              </List>
            </Drawer>
            <AllTasks allTasks={allTasks} />
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { drawerState } = state;
    const { allUsers, allTasks } = state.boardData;
    return {
        drawerState,
        allUsers,
        allTasks
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadBoardData: () => dispatch(loadBoardData()),
        toggleDrawer: () => dispatch(toggleDrawer())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Board));
