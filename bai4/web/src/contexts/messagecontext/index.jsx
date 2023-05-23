import React from "react";
import {
  getMessageByIdAPI,
  getMessagesByGroupIdAPI,
  addNewMessageAPI,
  updateMessageAPI,
  deleteMessageAPI,
} from "src/api/message";

const MessageContext = React.createContext();

class MessageProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  handleSetMessages = (messages) => {
    this.setState({
      messages: messages,
    });
  };

  getMessageById = async (id) => {
    try {
      const message = await getMessageByIdAPI(id);
      return message.data;
    } catch (error) {
      return error.response.data;
    }
  };

  getMessagesByGroupId = async (id) => {
    try {
      const messages = await getMessagesByGroupIdAPI(id);
      return messages.data;
    } catch (error) {
      return error.response.data;
    }
  };

  addNewMessage = async (data) => {
    try {
      const notice = await addNewMessageAPI(data);
      return notice.data;
    } catch (error) {
      return error.response.data;
    }
  };

  updateMessage = async (data) => {
    try {
      const notice = await updateMessageAPI(data);
      if (notice === "Success") {
        return true;
      }
      return false;
    } catch (error) {
      return error.response.data;
    }
  };

  deleteMessage = async (id) => {
    try {
      const notice = await deleteMessageAPI(id);
      if (notice.data === "Success") {
        return true;
      }
      return false;
    } catch (error) {
      return error.response.data;
    }
  };

  render() {
    const messages = this.state.messages;

    const {
      handleSetMessages,
      getMessageById,
      getMessagesByGroupId,
      addNewMessage,
      updateMessage,
      deleteMessage,
    } = this;

    return (
      <MessageContext.Provider
        value={{
          messages,
          handleSetMessages,
          getMessageById,
          getMessagesByGroupId,
          addNewMessage,
          updateMessage,
          deleteMessage,
        }}
      >
        {this.props.children}
      </MessageContext.Provider>
    );
  }
}

export { MessageContext };

export default MessageProvider;
