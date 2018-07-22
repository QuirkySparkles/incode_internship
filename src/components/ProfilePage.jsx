import React from "react";
import { connect } from "react-redux";
import UserInfo from "./UserInfo/UserInfo";
import EditForm from "./EditForm/EditForm";
import { switchEdit } from "../store/actions";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.turnEditState = this.turnEditState.bind(this);
        this.submit = this.submit.bind(this);
    }

    turnEditState() {
        this.props.switchEdit();
    }

    submit(values) {
        this.props.switchEdit();
        this.props.onEditChange(values);
    }

    render() {
        const profileInfo = this.props.profileInfo.results[0];
        const date = profileInfo.birthDate;
        const birthDate = `${date.slice(0, 4)}-${date.slice(5, 7)}-${date.slice(8, 10)}`;
        const skillList = profileInfo.skillList.join(", ");
        const initialValues = {
            firstName: profileInfo.firstName,
            lastName: profileInfo.lastName,
            email: profileInfo.email,
            birthDate,
            skillList
        };
        if (this.props.turnOnEdit) {
            return (
                (
                  <EditForm
                    initialValues={initialValues}
                    handleCancel={this.turnEditState}
                    onSubmit={this.submit}
                  />)
                );
            }
        return (
          (
            <UserInfo
              profileInfo={this.props.profileInfo.results[0]}
              turnOnEdit={this.turnEditState}
            />)
        );
    }
}

function mapStateToProps(state) {
    const { turnOnEdit } = state;
    return {
        turnOnEdit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        switchEdit: () => dispatch(switchEdit())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);
