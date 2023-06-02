import { useSelector } from "react-redux";
import "./messageboxcontent.css";

const MessageBoxContent = (props) => {
  const messages = useSelector((reducer)=> reducer.messageReducer.messages);
  const userLogin = useSelector((reducer)=> reducer.authReducer.userLogin);

  const openSelectMessage = () => {
    props.handleSelectMessage(true);
  };

  const handleSelectedMessage = (e) => {
    const target = e.target;
    if (target.checked) {
      const newCheckedMessages = props.selectedMessages.concat(
        messages.find((message) => message._id === target.value)
      );
      props.handleSelectedMessages(newCheckedMessages);
    } else {
      const oldCheckedMessages = props.selectedMessages;
      const newCheckedMessages = oldCheckedMessages.filter(
        (message) => message._id !== target.value
      );
      props.handleSelectedMessages(newCheckedMessages);
    }
  };

  return (
    <div className="col-des-12 message-selection">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`col-des-6 message-section-wrapper ${
            message.user_id._id === userLogin._id
              ? "message-align-right"
              : "message-align-left"
          } ${props.isMessageSelect ? "message-align-center" : ""}`}
        >
          {props.isMessageSelect && (
            <input
              className="ip-checkbox-messages"
              type="checkbox"
              value={message._id}
              onChange={handleSelectedMessage}
            />
          )}
          <div
            className={`${
              props.isMessageSelect ? "col-des-10" : "col-des-12"
            } message-section-container`}
          >
            <div className="message-section-name">{message.user_id.name}</div>
            <div className="message-section-content">{message.message}</div>
            <span className="message-time" onClick={openSelectMessage}>
              {message.createdAt}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageBoxContent;
