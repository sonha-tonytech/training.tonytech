import React from "react";
import { cookies, instance } from "../../until";

const MessageContext = React.createContext();

class MessageProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.config = {
      headers: {
        Authorization: `Bearer ${cookies.get("token") || ""}`,
      },
    };
  }

  handleSetMessages = (messages) => {
    this.setState({
      messages: messages,
    });
  };

  // getAllMessages = async () => {
  //   const messages = await axios.get(getURL("/api/messages"), this.config);
  //   return messages.data;
  // };

  getMessageById = async (id) => {
    try {
      const message = await instance.get(`/messages/${id}`, this.config);
      return message.data;
    } catch (error) {
      return error.response.data;
    }
  };

  getMessagesByGroupId = async (id) => {
    try {
      const messages = await instance.get(
        `/groups/${id}/messages`,
        this.config
      );
      return messages.data;
    } catch (error) {
      return error.response.data;
    }
  };

  addNewMessage = async (data) => {
    try {
      const notice = await instance.post("/messages", data, this.config);
      return notice.data;
    } catch (error) {
      return error.response.data;
    }
  };

  updateMessage = async (data) => {
    try {
      const notice = await instance.put(
        `/messages/${data.id}`,
        data,
        this.config
      );
      if (notice === "Success") {
        return true;
      }
      return false;
    } catch (error) {
      return error.response.data;
    }
  };

  deleteMessage = async (id) => {
    const notice = await instance.delete(`/messages/${id}`, this.config);
    if (notice === "Success") {
      return true;
    }
    return false;
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
