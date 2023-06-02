import React from "react";
import "./groupactionmenu.css";

class Ripple extends React.Component {
  showFormAddUser = () => {
    this.props.showFormAddUser();
  };

  showRightSideBar = () => {
    this.props.showRightSideBar();
  };

  handleDeleteUserInGroup = () => {
    this.props.handleDeleteUserInGroup();
  };

  handleDeleteGroup = () => {
    this.props.handleDeleteGroup();
  };

  render() {
    return (
      <div className="ripple-dropdown">
        <div className="btn-add-user" onClick={this.showFormAddUser}>
          Add User
        </div>
        {this.props.userLogin._id === this.props.selectedGroup.owner._id ? (
          <>
            <div className="btn-delete-group" onClick={this.handleDeleteGroup}>
              Delete Group
            </div>
            <div className="btn-delete-users" onClick={this.showRightSideBar}>
              Delete Users
            </div>
          </>
        ) : (
          <div
            className="btn-leave-group"
            onClick={this.handleDeleteUserInGroup}
          >
            Leave Group
          </div>
        )}
      </div>
    );
  }
}

export default Ripple;
