import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserInfo from "./UserInfo";
import EditForm from "./EditForm";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            turnOnEdit: false,
        };
        this.turnEditState = this.turnEditState.bind(this);
        this.submit = this.submit.bind(this);
    }

    turnEditState(state) {
        this.setState({
            turnOnEdit: state,
        });
    }

    submit(values) {
        this.setState({ turnOnEdit: false });
        this.props.onEditChange(values);
    }

    render() {
        if (Object.keys(this.props.clientInfo).length) {
            const clientInfo = this.props.clientInfo.results[0];
            const date = clientInfo.birthDate;
            const birthDate = `${date.slice(0, 4)}-${date.slice(5, 7)}-${date.slice(8, 10)}`;
            const skillList = clientInfo.skillList.join(", ");
            const initialValues = {
                firstName: clientInfo.firstName,
                lastName: clientInfo.lastName,
                email: clientInfo.email,
                birthDate,
                skillList,
            };
            return (
              <div>
                {this.state.turnOnEdit
                        ? (
                          <EditForm
                            initialValues={initialValues}
                            handleCancel={this.turnEditState}
                            onSubmit={this.submit}
                          />)
                        : (
                          <UserInfo
                            clientInfo={this.props.clientInfo.results[0]}
                            turnOnEdit={this.turnEditState}
                          />)
                    }
              </div>
            );
        }
        return (
          <div>
            <CircularProgress />
          </div>
        );
    }
}

export default ProfilePage;
