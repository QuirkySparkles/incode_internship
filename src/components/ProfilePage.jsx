import React from "react";
import { connect } from "react-redux";
import { loadProfile, editProfile } from "../store/actions/thunk/profile";
import Loader from "./Loader";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import EditForm from "./EditForm/EditForm";
import { switchEdit } from "../store/actions";
import { clearEditMessage } from "../store/actions/profile";


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.turnEditState = this.turnEditState.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.props.clearEditMessage();
    }

    turnEditState() {
        this.props.switchEdit();
    }

    submit(values) {
        const editValues = { ...values, id: this.props.profileInfo._id };
        this.props.switchEdit();
        this.props.editProfile(editValues);
    }

    render() {
        const { profileInfo, editStatus } = this.props;

        if (!profileInfo.firstName) {
            return (<Loader />);
        }

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
            <ProfileInfo
              profileInfo={this.props.profileInfo}
              turnOnEdit={this.turnEditState}
              editStatus={editStatus}
            />)
        );
    }
}

function mapStateToProps(state) {
    const { turnOnEdit, profileInfo } = state;
    const editStatus = state.editProfile;
    return {
        turnOnEdit,
        profileInfo,
        editStatus
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadProfile: () => dispatch(loadProfile()),
        editProfile: values => dispatch(editProfile(values)),
        switchEdit: () => dispatch(switchEdit()),
        clearEditMessage: () => dispatch(clearEditMessage())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);
