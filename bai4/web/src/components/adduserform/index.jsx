import React from "react";
import Input from "../core/input";
import "./adduserform.css";

class AddUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
    };
    this.addUserInGroupInput = React.createRef();
  }

  handleAddUserInGroup = async (e) => {
    if (e.type === "click" || e.key === "Enter") {
      const addedUserName = this.addUserInGroupInput.current.returnValue();
      if (addedUserName) {
        const addedUser = this.props.users.find(
          (user) => user.userName === addedUserName
        );
        if (!addedUser) this.setState({ msg: "Username doesn't exist" });
        else {
          if (
            this.props.selectedGroup.members.some(
              (user) => user.user_id._id === addedUser._id
            )
          )
            this.setState({ msg: "User already in the group" });
          else {
            this.props.selectedGroup.members.push({ user_id: addedUser });
            const newListUsersInGroup = {
              _id: this.props.selectedGroup._id,
              name: this.props.selectedGroup.name,
              owner: this.props.selectedGroup.owner,
              members: this.props.selectedGroup.members.map((user) => ({
                user_id: user.user_id._id,
              })),
            };
            const notice = await this.props.handleUpdateUserInGroup(
              newListUsersInGroup
            );
            if (notice) {
              this.props.handleSelectedGroup(this.props.selectedGroup);
              this.closeFormAddUser();
            }
          }
        }
      }
    }
  };

  closeFormAddUser = () => {
    this.props.handleOpenAddUserInGroup(false);
    this.setState({ msg: "" });
    this.addUserInGroupInput.current.resetValue();
  };

  render() {
    return (
      <div className="form-add-user-in-group">
        <div className="col-des-12 form-add-user-in-group-header">
          <h2 className="col-des-10 form-add-user-in-group-title">
            Add new user
          </h2>
          <button
            className="col-des-2 btn btn-red exit-form-add-user-in-group"
            onClick={this.closeFormAddUser}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="30"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M8.293 7.293a1 1 0 0 1 1.414 0L12 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12 8.293 9.707a1 1 0 0 1 0-1.414z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div className="form-add-user-in-group-content">
          <Input
            className="col-des-9 "
            type="text"
            placeholder="Add User"
            ref={this.addUserInGroupInput}
            onKeyDown={this.handleAddUserInGroup}
          />
          <button
            className="col-des-3 btn btn-green"
            onClick={this.handleAddUserInGroup}
          >
            Add
          </button>
        </div>
        <div id="msg">{this.state.msg}</div>
      </div>
    );
  }
}

export default AddUserForm;
