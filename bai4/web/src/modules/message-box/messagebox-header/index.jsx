import React from "react";
import { withRouter } from "react-router-dom";
import withAuth from "HOCs/withAuth";
import withGroup from "HOCs/withGroup";
import Ripple from "components/ripple";
import "./messageboxheader.css";

class MessageBoxHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRippleOpen: false,
    };
    this.wrapperRef = React.createRef();
  }

  showFormAddUser = () => {
    this.props.handleOpenAddUserInGroup(true);
    this.setState({ isRippleOpen: false });
  };

  showRightSideBar = () => {
    this.props.handleOpenRightSideBar(true);
    this.setState({ isRippleOpen: false });
  };

  handleDeleteUserInGroup = async () => {
    const userInGroupIndex = this.props.selectedGroup.members.findIndex(
      (member) => member.user_id._id === this.props.authContext.userLogin._id
    );
    this.props.selectedGroup.members.splice(userInGroupIndex, 1);
    const notice = await this.props.groupContext.updateGroup(
      this.props.selectedGroup
    );
    if (notice) {
      const groupIndex = this.props.groupContext.groups.findIndex(
        (group) => group._id === this.props.selectedGroup._id
      );
      this.props.groupContext.groups.splice(
        groupIndex,
        1,
        this.props.selectedGroup
      );
      this.props.groupContext.handleSetGroups(this.props.groupContext.groups);
      this.props.handleSelectedGroup(null);
      this.props.history.push("/");
    }
  };

  handleDeleteGroup = async () => {
    const notice = await this.props.groupContext.deleteGroup(
      this.props.selectedGroup._id
    );
    if (notice) {
      const groupIndex = this.props.groupContext.groups.findIndex(
        (group) => group._id === this.props.selectedGroup._id
      );
      this.props.groupContext.groups.splice(groupIndex, 1);
      this.props.groupContext.handleSetGroups(this.props.groupContext.groups);
      this.props.handleSelectedGroup(null);
      this.props.history.push("/");
    }
  };

  handleClickOutSide = (e) => {
    if (!this.wrapperRef.current.contains(e.target)) {
      this.setState({ isRippleOpen: false });
    }
  };

  componentDidMount = async () => {
    document.addEventListener("click", this.handleClickOutSide);
  };

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutSide);
  }

  render() {
    return (
      <div className="col-des-12 message-box-header-section">
        <h2 className="col-des-6">{this.props.selectedGroup.name}</h2>
        <div className="col-des-4 user-group-section">
          <div className="col-des-6 group-users">
            {this.props.selectedGroup.members.length} members
          </div>
          <div
            ref={this.wrapperRef}
            className="col-des-1 ripple"
            onClick={() => {
              this.state.isRippleOpen
                ? this.setState({ isRippleOpen: false })
                : this.setState({ isRippleOpen: true });
            }}
          >
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>

          {this.state.isRippleOpen && (
            <Ripple
              userLogin={this.props.authContext.userLogin}
              selectedGroup={this.props.selectedGroup}
              showFormAddUser={this.showFormAddUser}
              showRightSideBar={this.showRightSideBar}
              handleDeleteUserInGroup={this.handleDeleteUserInGroup}
              handleDeleteGroup={this.handleDeleteGroup}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(withAuth(withGroup(MessageBoxHeader)));
