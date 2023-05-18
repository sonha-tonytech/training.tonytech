import React from "react";
import SidebarLayout from "../../layouts/sidebar-layout";
import "./deleteuserform.css";

class DeleteUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedUsers: [],
    };
  }

  handleCheckedUserInGroup = (e) => {
    const target = e.target;
    if (target.checked) {
      const newCheckedUsers = this.state.checkedUsers.concat(target.value);
      this.setState({ checkedUsers: newCheckedUsers });
    } else {
      const oldCheckUsers = this.state.checkedUsers;
      const newCheckedUsers = oldCheckUsers.filter(
        (value) => value !== target.value
      );
      this.setState({ checkedUsers: newCheckedUsers });
    }
  };

  handleDeleteUsersInGroup = async () => {
    this.state.checkedUsers.forEach((userId) => {
      const userInGroupIndex = this.props.selectedGroup.members.findIndex(
        (member) => member.user_id === userId
      );
      this.props.selectedGroup.members.splice(userInGroupIndex, 1);
    });
    const newGroup = {
      _id: this.props.selectedGroup._id,
      name: this.props.selectedGroup.name,
      owner: this.props.selectedGroup.owner,
      members: this.props.selectedGroup.members.map((user) => ({
        user_id: user.user_id._id,
      })),
    };
    const notice = await this.props.handleUpdateUserInGroup(newGroup);
    if (notice) {
      this.props.handleSelectedGroup(this.props.selectedGroup);
      this.setState({ checkedUsers: [] });
    }
  };

  handleCloseDeleteUserForm = () => {
    this.props.handleOpenRightSideBar(false);
  };

  render() {
    return (
      <div className="col-des-4 right-sidebar-section">
        <SidebarLayout>
          <div className="sidebar-title-section">
            <button
              className="col-des-1 btn toggle"
              onClick={this.handleCloseDeleteUserForm}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30px"
                height="30px"
                fill="black"
              >
                <path d="M12 10.585L7.757 6.343a2 2 0 10-2.828 2.828L9.172 13l-4.243 4.243a2 2 0 102.828 2.828L12 15.172l4.243 4.243a2 2 0 102.828-2.828L14.828 13l4.243-4.243a2 2 0 10-2.828-2.828L12 10.585z"></path>
              </svg>
            </button>
            <input
              type="search"
              className="ip-search col-des-11"
              id="ip_search"
              placeholder="Search..."
            />
          </div>
          <div className="sidebar-content-section">
            <h4 className="sidebar-content-title">Users in Group</h4>
            <div className="sidebar-content">
              {this.props.selectedGroup.members
                .filter(
                  (member) => member.user_id._id !== this.props.userLogin._id
                )
                .map((member) => (
                  <div className="user-in-group" key={member.user_id._id}>
                    <input
                      type="checkbox"
                      value={member.user_id._id}
                      onChange={this.handleCheckedUserInGroup}
                    />
                    {member.user_id.name}
                  </div>
                ))}
            </div>
            {this.props.selectedGroup.members.length !== 1 && (
              <button
                className="col-des-6 btn btn-red btn-submit-delete-users"
                onClick={this.handleDeleteUsersInGroup}
              >
                Delete Users
              </button>
            )}
          </div>
        </SidebarLayout>
      </div>
    );
  }
}

export default DeleteUserForm;
