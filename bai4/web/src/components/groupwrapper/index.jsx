import React from "react";
import ChatBox from "../chatbox";

class GroupWrapper extends React.Component {
  render() {
    return (
      <div className="information-group-content">
        {this.props.groups.map((group) => (
          <ChatBox key={group._id} group={group} />
        ))}
      </div>
    );
  }
}

export default GroupWrapper;
