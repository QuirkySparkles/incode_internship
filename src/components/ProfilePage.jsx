import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Loader from "./Loader";
import { loadProfile, editProfile } from "../store/actions/thunk/profile";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import EditProfileForm from "./EditProfileForm/EditProfileForm";
import { switchEdit } from "../store/actions";


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.turnEditState = this.turnEditState.bind(this);
        this.editProfileApply = this.editProfileApply.bind(this);
    }

    turnEditState() {
        this.props.switchEdit();
    }

    editProfileApply(values) {
        const editValues = { ...values, id: this.props.profileInfo._id };
        this.props.editProfile(editValues);
    }

    render() {
        const { profileInfo, editStatus, serverMessage } = this.props;

        if (!profileInfo.firstName && !serverMessage) {
            return (<Loader />);
        }

        if (serverMessage) {
            return (
              <Typography variant="display1" style={{ margin: "20% 0" }}>
                {serverMessage}
              </Typography>
            );
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
                  <EditProfileForm
                    initialValues={initialValues}
                    handleCancel={this.turnEditState}
                    onSubmit={this.editProfileApply}
                    editStatus={editStatus}
                  />)
                );
            }
        return (
          (
            <ProfileInfo
              profileInfo={this.props.profileInfo}
              turnOnEdit={this.turnEditState}
              serverMessage={serverMessage}
            />)
        );
    }
}

function mapStateToProps(state) {
    const { turnOnEdit, profileInfo } = state;
    const editStatus = state.editProfile;
    const { serverMessage } = state.requestProfile;
    return {
        turnOnEdit,
        profileInfo,
        editStatus,
        serverMessage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadProfile: () => dispatch(loadProfile()),
        editProfile: values => dispatch(editProfile(values)),
        switchEdit: () => dispatch(switchEdit()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);
