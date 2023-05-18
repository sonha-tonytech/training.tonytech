import React from "react";
import GroupInformation from "./group-information";
import AddGroupForm from "./group-add-form";
import GroupProfile from "./group-profile";
import "./group.css";

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddGroupOpen: false,
      isProfileOpen: false,
    };
  }

  handleOpenAddGroupForm = (isOpen) => {
    this.setState({ isAddGroupOpen: isOpen });
  };

  handleOpenProfile = (isOpen) => {
    this.setState({ isProfileOpen: isOpen });
  };

  render() {
    return (
      <div className={`group-section ${this.props.className || ""}`}>
        <GroupInformation
          handleOpenAddGroupForm={this.handleOpenAddGroupForm}
          handleOpenProfile={this.handleOpenProfile}
        />
        {this.state.isAddGroupOpen && (
          <AddGroupForm handleOpenAddGroupForm={this.handleOpenAddGroupForm} />
        )}
        {this.state.isProfileOpen && (
          <GroupProfile handleOpenProfile={this.handleOpenProfile} />
        )}
      </div>
    );
  }
}

export default Group;
