import React from "react";
import Button from "../core/button";
import Input from "../core/input";
import "./sendmessagebox.css";

class SendMessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.messageInput = React.createRef();
    this.handleAddMessage = this.handleAddMessage.bind(this);
  }

  handleAddMessage = async (e) => {
    if (e.type === "click" || e.key === "Enter") {
      if (this.messageInput.current.returnValue()) {
        await this.props.handleAddMessage(
          this.messageInput.current.returnValue()
        );
        this.messageInput.current.resetValue();
      }
    }
  };

  render() {
    return (
      <div className="col-des-12 send-message-section">
        <Input
          className="col-des-8"
          type="text"
          ref={this.messageInput}
          placeholder="Type your message here"
          onKeyDown={this.handleAddMessage}
        />
        <Button className="btn-submit-message" onClick={this.handleAddMessage}>
          +
        </Button>
      </div>
    );
  }
}

export default SendMessageBox;
