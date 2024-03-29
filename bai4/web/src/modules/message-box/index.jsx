import React from "react";
import { withRouter } from "react-router-dom";
import withContext from "HOCs/withContext";
import { AuthContext } from "contexts/authcontext";
import { GroupContext } from "contexts/groupcontext";
import { MessageContext } from "contexts/messagecontext";
import AddUserForm from "components/group-add-user";
import DeleteUserForm from "components/group-delete-users";
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

  handleAddUserInGroup = async (userName) => {
    this.props.handleSetLoading(true);
    const user = await this.props.groupContext.addUserInGroup(
      this.state.selectedGroup._id,
      userName
    );
    this.props.handleSetLoading(false);
    return user;
  };

  handleDeleteUserInGroup = async (newGroup) => {
    this.props.handleSetLoading(true);
    const notice = await this.props.groupContext.updateGroup(newGroup);
    if (notice) {
      const groupIndex = this.props.groupContext.groups.findIndex(
        (group) => group._id === this.state.selectedGroup._id
      );
      this.props.groupContext.groups.splice(groupIndex, 1, newGroup);
      this.props.groupContext.handleSetGroups(this.props.groupContext.groups);
      this.props.handleSetLoading(false);
      return true;
    }
    this.props.handleSetLoading(false);
    return false;
  };

  getMessageByParamId = async (id) => {
    this.props.handleSetLoading(true);
    const selectedGroup = await this.props.groupContext.getGroupById(id);

    if (selectedGroup) {
      const messagesInGroup =
        await this.props.messageContext.getMessagesByGroupId(id);
      this.setState({ selectedGroup: selectedGroup });
      this.props.messageContext.handleSetMessages(messagesInGroup);
    } else {
      this.setState({ selectedGroup: null });
    }
    this.props.handleSetLoading(false);
  };

  componentDidMount = async () => {
    if (this.props.match.params.id) {
      await this.getMessageByParamId(this.props.match.params.id);
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      await this.getMessageByParamId(this.props.match.params.id);
      this.setState({
        selectedMessages: [],
        isAddUserInGroupOpen: false,
        isMessageSelect: false,
        isRightSideBarOpen: false,
      });
    }
  };

  render() {
    if (!this.state.selectedGroup) return null;

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
              selectedGroup={this.state.selectedGroup}
              handleAddUserInGroup={this.handleAddUserInGroup}
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
            handleDeleteUserInGroup={this.handleDeleteUserInGroup}
            handleSelectedGroup={this.handleSelectedGroup}
          />
        )}
      </div>
    );
  }
}

export default withRouter(
  withContext(MessageBox, [
    { authContext: AuthContext },
    { groupContext: GroupContext },
    { messageContext: MessageContext },
  ])
);
