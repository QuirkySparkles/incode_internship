import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import { closeModal } from "../store/actions";
import SkillList from "./SkillList";


const UserModalBoard = ({
    isActive,
    pickedProfile,
    cancelModal
}) => {
    if (!pickedProfile.firstName) return null;
    const date = pickedProfile.birthDate;
    const birthDate = `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`;
    const anySkills = pickedProfile.skillList.length === 0;
    return (
      <div>
        <Dialog
          open={isActive}
          onClose={cancelModal}
          scroll="paper"
          aria-labelledby="user-info-title"
        >
          <div style={{ textAlign: "center" }}>
            <DialogTitle id="user-info-title">
              User details:
            </DialogTitle>
            <DialogContent>
              <Typography gutterBottom variant="headline">
                {`${pickedProfile.firstName} ${pickedProfile.lastName}`}
              </Typography>
              <Typography gutterBottom variant="title">
                {`Date of birth: ${birthDate}`}
              </Typography>
              <Typography gutterBottom variant="title">
                {`Email: ${pickedProfile.email}`}
              </Typography>
              <br />
              <Typography variant="title">
                List of skills:
              </Typography>
              <List>
                {pickedProfile.skillList.map(skill => (
                  <SkillList key={skill + Math.random()} skill={skill} />))}
                {anySkills && (
                  <Typography variant="title">
                    No skills specified.
                  </Typography>
                )}
              </List>
            </DialogContent>
          </div>
        </Dialog>
      </div>
    );
};

function mapStateToProps(state) {
    const { isActive, pickedProfile } = state.userModalBoard;
    return {
        isActive,
        pickedProfile
    };
}

function mapDispatchToProps(dispatch) {
    return {
        cancelModal: () => dispatch(closeModal())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserModalBoard);
