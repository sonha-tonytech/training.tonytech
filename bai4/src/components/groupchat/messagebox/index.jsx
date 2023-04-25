import React from "react";
import SidebarLayout from "layouts/sidebar-layout";
import "./messagebox.css";

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMessages: [],
      isAddUserInGroupOpen: false,
      isRippleOpen: false,
      isMessageSelect: false,
      isRightSideBarOpen: false,
      checkedUsers: [],
      msg: "",
    };
    this.addUserInGroupInput = React.createRef();
    this.messageInput = React.createRef();
  }

  showFormAddUser = () => {
    this.setState({ isAddUserInGroupOpen: true });
    this.setState({ isRippleOpen: false });
  };

  closeFormAddUser = () => {
    this.setState({ isAddUserInGroupOpen: false });
    this.setState({ msg: "" });
    this.addUserInGroupInput.current.value = "";
  };

  getCurrentTime = () => {
    const currentTime = new Date();
    return currentTime.getHours() + ":" + currentTime.getMinutes();
  };

  handleAddUserInGroup = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      const addedUserName = this.addUserInGroupInput.current.value;
      if (addedUserName) {
        const addedUser = this.props.data.users.find(
          (user) => user.userName === addedUserName
        );
        if (addedUser === undefined)
          this.setState({ msg: "Username doesn't exist" });
        else {
          if (
            this.props.selectedGroup.members.some(
              (user) => user.user_id === addedUser.id
            )
          )
            this.setState({ msg: "User already in the group" });
          else {
            const newInGroupUsers = this.props.selectedGroup.members.concat({
              user_id: addedUser.id,
            });
            const newChat = {
              id: this.props.selectedGroup.id,
              name: this.props.selectedGroup.name,
              type: this.props.selectedGroup.type,
              owner: this.props.selectedGroup.owner,
              members: newInGroupUsers,
            };
            const groupIndex = this.props.data.groups.findIndex(
              (group) => group.id === this.props.selectedGroup.id
            );
            this.props.data.groups.splice(groupIndex, 1, newChat);
            this.props.handleSetGroups(this.props.data.groups);
            this.props.handleSelectedGroup(newChat);
            this.closeFormAddUser();
          }
        }
      }
    }
  };

  handleDeleteUserInGroup = () => {
    const userInGroupIndex = this.props.selectedGroup.members.findIndex(
      (member) => member.user_id === this.props.data.userLogin.id
    );
    this.props.selectedGroup.members.splice(userInGroupIndex, 1);
    const groupIndex = this.props.data.groups.findIndex(
      (group) => group.id === this.props.selectedGroup.id
    );
    this.props.data.groups.splice(groupIndex, 1, this.props.selectedGroup);
    this.props.handleSetGroups(this.props.data.groups);
    this.props.handleSelectedGroup(null);
    this.setState({ isRippleOpen: false });
  };

  handleDeleteUsersInGroup = () => {
    this.state.checkedUsers.forEach((userId) => {
      const userInGroupIndex = this.props.selectedGroup.members.findIndex(
        (member) => member.user_id === userId
      );
      this.props.selectedGroup.members.splice(userInGroupIndex, 1);
      const groupIndex = this.props.data.groups.findIndex(
        (group) => group.id === this.props.selectedGroup.id
      );
      this.props.data.groups.splice(groupIndex, 1, this.props.selectedGroup);
      this.props.handleSetGroups(this.props.data.groups);
    });
    this.setState({ checkedUsers: [] });
  };

  showRightSideBar = () => {
    this.setState({ isRightSideBarOpen: true });
    this.setState({ isRippleOpen: false });
  };

  handleCheckedUserInGroup = (e) => {
    const target = e.target;
    if (target.checked) {
      const newCheckedUsers = this.state.checkedUsers.concat(
        Number(target.value)
      );
      this.setState({ checkedUsers: newCheckedUsers });
    } else {
      const oldCheckUsers = this.state.checkedUsers;
      const newCheckedUsers = oldCheckUsers.filter(
        (value) => value !== Number(target.value)
      );
      this.setState({ checkedUsers: newCheckedUsers });
    }
  };

  handleDeleteGroup = () => {
    this.props.selectedGroup.members = [];
    const groupIndex = this.props.data.groups.findIndex(
      (group) => group.id === this.props.selectedGroup.id
    );
    this.props.data.groups.splice(groupIndex, 1, this.props.selectedGroup);
    this.props.handleSetGroups(this.props.data.groups);
    this.props.handleSelectedGroup(null);
    this.setState({ isRippleOpen: false });
  };

  handleAddMessage = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      const message = this.messageInput.current.value;
      if (message) {
        const newMessage = {
          id: this.props.data.messages.length,
          chat_id: this.props.selectedGroup.id,
          user_id: this.props.data.userLogin.id,
          user_name: this.props.data.userLogin.name,
          messages: message,
          time_create: this.getCurrentTime(),
        };
        this.props.data.messages.push(newMessage);
        this.props.handleSetMessages(this.props.data.messages);
        this.messageInput.current.value = "";
      }
    }
  };

  handleSelectedMessage = (e) => {
    const target = e.target;
    if (target.checked) {
      const newCheckedMessages = this.state.selectedMessages.concat(
        this.props.data.messages.find(
          (message) => message.id === Number(target.value)
        )
      );
      this.setState({ selectedMessages: newCheckedMessages });
    } else {
      const oldCheckedMessages = this.state.selectedMessages;
      const newCheckedMessages = oldCheckedMessages.filter(
        (message) => message.id !== Number(target.value)
      );
      this.setState({ selectedMessages: newCheckedMessages });
    }
  };

  handleDeleteMessage = () => {
    if (
      this.props.data.userLogin.id === this.props.selectedGroup.owner ||
      this.state.selectedMessages.every(
        (message) => message.user_id === this.props.data.userLogin.id
      )
    ) {
      this.state.selectedMessages.forEach((selectedMessage) => {
        const messageIndex = this.props.data.messages.findIndex(
          (message) => message.id === selectedMessage.id
        );
        this.props.data.messages.splice(messageIndex, 1);
        this.props.handleSetMessages(this.props.data.messages);
      });
      this.setState({ selectedMessages: [] });
      this.setState({ isMessageSelect: false });
    }
  };
  render() {
    if (this.props.selectedGroup === null) return;
    return (
      <div className="message-box-container">
        <div
          className={`message-box-section ${
            this.state.isRightSideBarOpen ? "narrow" : ""
          }`}
        >
          <div className="col-des-12 message-box-header-section">
            <h2 className="col-des-6">{this.props.selectedGroup.name}</h2>
            <div className="col-des-4 user-group-section">
              <div className="col-des-6 group-users">
                {this.props.selectedGroup.members.length} members
              </div>
              <div
                className="col-des-1 ripple"
                onClick={() =>
                  this.state.isRippleOpen
                    ? this.setState({ isRippleOpen: false })
                    : this.setState({ isRippleOpen: true })
                }
              >
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              {this.state.isRippleOpen && (
                <div className="ripple-dropdown">
                  <div className="btn-add-user" onClick={this.showFormAddUser}>
                    Add User
                  </div>
                  {this.props.data.userLogin.id !==
                    this.props.selectedGroup.owner && (
                    <div
                      className="btn-leave-group"
                      onClick={this.handleDeleteUserInGroup}
                    >
                      Leave Group
                    </div>
                  )}
                  {this.props.data.userLogin.id ===
                    this.props.selectedGroup.owner && (
                    <>
                      <div
                        className="btn-delete-group"
                        onClick={this.handleDeleteGroup}
                      >
                        Delete Group
                      </div>
                      <div
                        className="btn-delete-users"
                        onClick={this.showRightSideBar}
                      >
                        Delete Users
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            className="col-des-12 message-selection"
            onClick={() => {
              this.setState({ isRippleOpen: false });
            }}
          >
            {this.props.data.messages
              .filter(
                (message) => message.chat_id === this.props.selectedGroup.id
              )
              .map((message) => (
                <div
                  key={message.id}
                  className={`col-des-6 message-section-wrapper ${
                    message.user_id === this.props.data.userLogin.id
                      ? "message-align-right"
                      : "message-align-left"
                  } ${
                    this.state.isMessageSelect ? "message-align-center" : ""
                  }`}
                >
                  {this.state.isMessageSelect && (
                    <input
                      className="col-des-2"
                      type="checkbox"
                      value={message.id}
                      onChange={this.handleSelectedMessage}
                    />
                  )}
                  <div
                    key={message.id}
                    className={`${
                      this.state.isMessageSelect ? "col-des-10" : "col-des-12"
                    } message-section-container`}
                  >
                    <div className="message-section-name">
                      {message.user_name}
                    </div>
                    <div className="message-section-content">
                      {message.messages}
                    </div>
                    <span
                      className="message-time"
                      onClick={() => {
                        this.setState({ isMessageSelect: true });
                      }}
                    >
                      {message.time_create}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          {!this.state.isMessageSelect && (
            <div className="col-des-12 send-message-section">
              <input
                className="col-des-8"
                type="text"
                id="ip_send_message"
                placeholder="Type your message here"
                ref={this.messageInput}
                onKeyDown={this.handleAddMessage}
              />
              <button
                className="btn btn-green btn-submit-message"
                onClick={this.handleAddMessage}
              >
                +
              </button>
            </div>
          )}
          {this.state.isMessageSelect && (
            <div className="col-des-12 selection-wrapper">
              <div className="col-des-6 selection-container">
                <div className="selection-container-left">
                  <button
                    className="btn btn-selection btn-exit-selection"
                    onClick={() => {
                      this.setState({ selectedMessages: [] });
                      this.setState({ isMessageSelect: false });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="30px"
                      height="30px"
                      fill="gray"
                    >
                      <path d="M12 10.585L7.757 6.343a2 2 0 10-2.828 2.828L9.172 13l-4.243 4.243a2 2 0 102.828 2.828L12 15.172l4.243 4.243a2 2 0 102.828-2.828L14.828 13l4.243-4.243a2 2 0 10-2.828-2.828L12 10.585z" />
                    </svg>
                  </button>
                </div>
                <div className="selection-container-right">
                  <button
                    className={`btn btn-selection btn-delete-message ${
                      this.props.data.userLogin.id ===
                        this.props.selectedGroup.owner ||
                      this.state.selectedMessages.every(
                        (message) =>
                          message.user_id === this.props.data.userLogin.id
                      )
                        ? ""
                        : "disabled"
                    }`}
                    onClick={this.handleDeleteMessage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="30px"
                      height="30px"
                      fill="red"
                    >
                      <path d="M3 6h18v2H3zm1-4h16l-1.9 18H5.9L4 2zm7 15v-8h2v8h-2zm4 0v-8h2v8h-2z" />
                    </svg>
                    <span className="sp-delete-selection">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          {this.state.isAddUserInGroupOpen && (
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
                <input
                  className="col-des-10"
                  type="text"
                  id="ip_add_user_in_group"
                  placeholder="Add User"
                  ref={this.addUserInGroupInput}
                  onKeyDown={this.handleAddUserInGroup}
                />
                <button
                  className="col-des-2 btn btn-green"
                  onClick={this.handleAddUserInGroup}
                >
                  Add
                </button>
              </div>
              <div id="msg">{this.state.msg}</div>
            </div>
          )}
        </div>
        <div
          className={`right-sidebar-section ${
            this.state.isRightSideBarOpen ? "" : "hidden"
          }`}
        >
          <SidebarLayout>
            <div className="sidebar-title-section">
              <button
                className="col-des-1 btn toggle"
                onClick={() => this.setState({ isRightSideBarOpen: false })}
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
                {this.props.selectedGroup.members.map((member) => {
                  if (member.user_id !== this.props.data.userLogin.id) {
                    return (
                      <div className="user-in-group" key={member.user_id}>
                        <input
                          type="checkbox"
                          value={member.user_id}
                          onChange={this.handleCheckedUserInGroup}
                        />
                        {
                          this.props.data.users.find(
                            (user) => user.id === member.user_id
                          ).name
                        }
                      </div>
                    );
                  }
                  return;
                })}
              </div>
              <button
                className="col-des-6 btn btn-red btn-submit-delete-users"
                onClick={this.handleDeleteUsersInGroup}
              >
                Delete Users
              </button>
            </div>
          </SidebarLayout>
        </div>
      </div>
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.selectedGroup !== null && prevProps.selectedGroup !== null) {
      if (this.props.selectedGroup.id !== prevProps.selectedGroup.id) {
        this.setState({
          selectedMessages: [],
          isAddUserInGroupOpen: false,
          isRippleOpen: false,
          isMessageSelect: false,
          isRightSideBarOpen: false,
          checkedUsers: [],
          msg: "",
        });
      }
    }
  }
}

export default MessageBox;
