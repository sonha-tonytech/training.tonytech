import React from "react";
import { withRouter } from "react-router-dom";
import "./chatbox.css";

class ChatBox extends React.Component {
  handleSelectGroup = () => {
    this.props.history.push(`/groups/${this.props.group._id}`);
  };
  render() {
    return (
      <div
        className="col-des-12 chatbox-section"
        onClick={this.handleSelectGroup}
      >
        <h4 className="title">{this.props.group.name}</h4>
      </div>
    );
  }
}

export default withRouter(ChatBox);
