import React from "react";
import "./groupwrapper.css";

class GroupWrapper extends React.Component {
  render() {
    return (
      <div className="information-group-content">
        {this.props.groups.map((group) => (
          <div
            key={group._id}
            className="col-des-12 chatbox-section"
            onClick={() => {
              this.props.handleSelectedGroup(group._id);
            }}
          >
            <h4 className="title">{group.name}</h4>
          </div>
        ))}
      </div>
    );
  }
}

export default GroupWrapper;
