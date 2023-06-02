import { createContext, useState } from "react";
import {
  getMessageByIdAPI,
  getMessagesByGroupIdAPI,
  addNewMessageAPI,
  updateMessageAPI,
  deleteMessageAPI,
} from "api/message";

const MessageContext = createContext();

const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const handleSetMessages = (messages) => {
    setMessages(messages);
  };

  const getMessageById = async (id) => {
    try {
      const message = await getMessageByIdAPI(id);
      return message.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const getMessagesByGroupId = async (id) => {
    try {
      const messages = await getMessagesByGroupIdAPI(id);
      return messages.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const addNewMessage = async (data) => {
    try {
      const notice = await addNewMessageAPI(data);
      return notice.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const updateMessage = async (data) => {
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

  const deleteMessage = async (id) => {
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
      {props.children}
    </MessageContext.Provider>
  );
};

export { MessageContext };

export default MessageProvider;
