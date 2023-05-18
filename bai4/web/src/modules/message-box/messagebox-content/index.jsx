import React from "react";
import withMessage from "../../../hoc/withMessage";
import withAuth from "../../../hoc/withAuth";
import "./messageboxcontent.css";

class MessageBoxContent extends React.Component {
  openSelectMessage = () => {
    this.props.handleSelectMessage(true);
  };

  handleSelectedMessage = (e) => {
    const target = e.target;
    if (target.checked) {
      const newCheckedMessages = this.props.selectedMessages.concat(
        this.props.messageContext.messages.find(
          (message) => message._id === target.value
        )
      );
      this.props.handleSelectedMessages(newCheckedMessages);
    } else {
      const oldCheckedMessages = this.props.selectedMessages;
      const newCheckedMessages = oldCheckedMessages.filter(
        (message) => message._id !== target.value
      );
      this.props.handleSelectedMessages(newCheckedMessages);
    }
  };

  render() {
    return (
      <div className="col-des-12 message-selection">
        {this.props.messageContext.messages.map((message) => (
          <div
            key={message._id}
            className={`col-des-6 message-section-wrapper ${
              message.user_id._id === this.props.authContext.userLogin._id
                ? "message-align-right"
                : "message-align-left"
            } ${this.props.isMessageSelect ? "message-align-center" : ""}`}
          >
            {this.props.isMessageSelect && (
              <input
                className="ip-checkbox-messages"
                type="checkbox"
                value={message._id}
                onChange={this.handleSelectedMessage}
              />
            )}
            <div
              className={`${
                this.props.isMessageSelect ? "col-des-10" : "col-des-12"
              } message-section-container`}
            >
              <div className="message-section-name">{message.user_id.name}</div>
              <div className="message-section-content">{message.message}</div>
              <span className="message-time" onClick={this.openSelectMessage}>
                {message.createdAt}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default withAuth(withMessage(MessageBoxContent));
