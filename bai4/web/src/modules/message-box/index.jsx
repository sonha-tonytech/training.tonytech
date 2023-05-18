import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import withAuth from "../../hoc/withAuth";
import withUser from "../../hoc/withUser";
import withGroup from "../../hoc/withGroup";
import withMessage from "../../hoc/withMessage";
import AddUserForm from "../../components/adduserform";
import DeleteUserForm from "../../components/deleteuserform";
import MessageBoxHeader from "./messagebox-header";
import MessageBoxContent from "./messagebox-content";
import MessageBoxTool from "./messagebox-tool";
import "./messagebox.css";

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
      selectedMessages: [],
      isAddUserInGroupOpen: false,
      isMessageSelect: false,
      isRightSideBarOpen: false,
    };
  }

  handleSelectedGroup = (selectedGroup) => {
    this.setState({ selectedGroup: selectedGroup });
  };

  handleSelectedMessages = (selectedMessages) => {
    this.setState({ selectedMessages: selectedMessages });
  };

  handleOpenAddUserInGroup = (isOpen) => {
    this.setState({ isAddUserInGroupOpen: isOpen });
  };

  handleSelectMessage = (isOpen) => {
    this.setState({ isMessageSelect: isOpen });
  };

  handleOpenRightSideBar = (isOpen) => {
    this.setState({ isRightSideBarOpen: isOpen });
  };

  handleUpdateUserInGroup = async (newGroup) => {
    const notice = await this.props.groupContext.updateGroup(newGroup);
    if (notice) {
      const groupIndex = this.props.groupContext.groups.findIndex(
        (group) => group._id === this.state.selectedGroup._id
      );
      this.props.groupContext.groups.splice(groupIndex, 1, newGroup);
      this.props.groupContext.handleSetGroups(this.props.groupContext.groups);
      return true;
    }
    return false;
  };

  componentDidMount = async () => {
    if (this.props.match.params.id) {
      const selectedGroup = await this.props.groupContext.getGroupById(
        this.props.match.params.id
      );
      if (selectedGroup) {
        const messagesInGroup = await this.props.messageContext.getMessagesByGroupId(
          this.props.match.params.id
        );
        this.setState({ selectedGroup: selectedGroup });
        this.props.messageContext.handleSetMessages(messagesInGroup);
      } else {
        this.setState({ selectedGroup: null });
      }
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const selectedGroup = await this.props.groupContext.getGroupById(
        this.props.match.params.id
      );
      if (selectedGroup) {
        const messagesInGroup = await this.props.messageContext.getMessagesByGroupId(
          this.props.match.params.id
        );
        this.setState({ selectedGroup: selectedGroup });
        this.props.messageContext.handleSetMessages(messagesInGroup);
      } else {
        this.setState({ selectedGroup: null });
      }
    }
  };

  render() {
    if (!this.state.selectedGroup || !this.props.authContext.userLogin)
      return null;

    return (
      <div className={`message-box-container ${this.props.className || ""}`}>
        <div
          className={`message-box-section ${
            this.state.isRightSideBarOpen ? "narrow" : ""
          }`}
        >
          <MessageBoxHeader
            selectedGroup={this.state.selectedGroup}
            handleSelectedGroup={this.handleSelectedGroup}
            handleOpenAddUserInGroup={this.handleOpenAddUserInGroup}
            handleOpenRightSideBar={this.handleOpenRightSideBar}
          />
          <MessageBoxContent
            isMessageSelect={this.state.isMessageSelect}
            selectedGroup={this.state.selectedGroup}
            selectedMessages={this.state.selectedMessages}
            handleSelectMessage={this.handleSelectMessage}
            handleSelectedMessages={this.handleSelectedMessages}
          />
          <MessageBoxTool
            selectedMessages={this.state.selectedMessages}
            isMessageSelect={this.state.isMessageSelect}
            selectedGroup={this.state.selectedGroup}
            handleSelectMessage={this.handleSelectMessage}
            handleSelectedMessages={this.handleSelectedMessages}
          />
          {this.state.isAddUserInGroupOpen && (
            <AddUserForm
              users={this.props.userContext.users}
              selectedGroup={this.state.selectedGroup}
              handleUpdateUserInGroup={this.handleUpdateUserInGroup}
              handleOpenAddUserInGroup={this.handleOpenAddUserInGroup}
              handleSelectedGroup={this.handleSelectedGroup}
            />
          )}
        </div>
        {this.state.isRightSideBarOpen && (
          <DeleteUserForm
            userLogin={this.props.authContext.userLogin}
            selectedGroup={this.state.selectedGroup}
            handleOpenRightSideBar={this.handleOpenRightSideBar}
            handleUpdateUserInGroup={this.handleUpdateUserInGroup}
            handleSelectedGroup={this.handleSelectedGroup}
          />
        )}
      </div>
    );
  }
}

export default withRouter(
  withAuth(withUser(withGroup(withMessage(MessageBox))))
);
