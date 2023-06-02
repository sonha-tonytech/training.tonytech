import React from "react";
import withContext from "HOCs/withContext";
import { AuthContext } from "contexts/authcontext";
import { MessageContext } from "contexts/messagecontext";
import MessageSelection from "components/message-selection";
import SendMessageBox from "components/message-sendbox";

class MessageBoxTool extends React.Component {
  closeMessageSelection = () => {
    this.props.handleSelectMessage(false);
    this.props.handleSelectedMessages([]);
  };

  handleAddMessage = async (data) => {
    this.props.handleSetLoading(true);
    const newMessage = {
      group_id: this.props.selectedGroup._id,
      message: data,
    };
    const message = await this.props.messageContext.addNewMessage(newMessage);
    if (Object.values(message).length) {
      this.props.messageContext.messages.push(message);
      this.props.messageContext.handleSetMessages(
        this.props.messageContext.messages
      );
    }
    this.props.handleSetLoading(false);
  };

  handleDeleteMessage = () => {
    this.props.handleSetLoading(true);
    if (
      this.props.authContext.userLogin._id ===
        this.props.selectedGroup.owner._id ||
      this.props.selectedMessages.every(
        (message) =>
          message.user_id._id === this.props.authContext.userLogin._id
      )
    ) {
      this.props.selectedMessages.forEach(async (selectedMessage) => {
        const notice = await this.props.messageContext.deleteMessage(
          selectedMessage._id
        );
        if (notice) {
          const messageIndex = this.props.messageContext.messages.findIndex(
            (message) => message._id === selectedMessage._id
          );
          this.props.messageContext.messages.splice(messageIndex, 1);
          this.props.messageContext.handleSetMessages(
            this.props.messageContext.messages
          );
        }
      });
      this.props.handleSelectMessage(false);
      this.props.handleSelectedMessages([]);
    }
    this.props.handleSetLoading(false);
  };

  render() {
    return (
      <div className="col-des-12 message-tool">
        {this.props.isMessageSelect ? (
          <MessageSelection
            selectedMessages={this.props.selectedMessages}
            authContext={this.props.authContext}
            selectedGroup={this.props.selectedGroup}
            closeMessageSelection={this.closeMessageSelection}
            handleDeleteMessage={this.handleDeleteMessage}
          />
        ) : (
          <SendMessageBox handleAddMessage={this.handleAddMessage} />
        )}
      </div>
    );
  }
}

export default withContext(MessageBoxTool, [
  { authContext: AuthContext },
  { messageContext: MessageContext },
]);
