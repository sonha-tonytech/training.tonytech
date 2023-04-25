import React from "react";
import ChatBox from "../chatbox";
import SidebarLayout from "layouts/sidebar-layout";
import "./group.css";

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddGroupOpen: false,
      isProfileOpen: false,
      searchedGroups: null,
    };
    this.searchInput = React.createRef();
    this.addGroupInput = React.createRef();
  }

  handleClick = () => {
    this.setState({ isAddGroupOpen: true });
  };

  handleTurnBack = () => {
    if (this.state.isAddGroupOpen) this.setState({ isAddGroupOpen: false });
    if (this.state.isProfileOpen) this.setState({ isProfileOpen: false });
  };

  handleSearchGroup = (e) => {
    if (e.key === "Enter") {
      const foundGroup = this.searchInput.current.value;
      if (foundGroup) {
        const listGroupsAfterSearch = this.props.groups.filter((group) =>
          group.name.toUpperCase().includes(foundGroup.toUpperCase())
        );
        this.setState({ searchedGroups: listGroupsAfterSearch });
      } else this.setState({ searchedGroups: null });
    }
  };

  handleSubmit = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      const groupName = this.addGroupInput.current.value;
      if (groupName) {
        const newGroupChat = {
          id: this.props.groups.length,
          name: groupName,
          type: "group",
          owner: this.props.userLogin.id,
          members: [{ user_id: this.props.userLogin.id }],
        };
        this.props.groups.push(newGroupChat);
        this.props.handleSetGroups(this.props.groups);
        this.setState({ isAddGroupOpen: false });
        this.addGroupInput.current.value = "";
      }
    }
  };

  render() {
    return (
      <div className="group-section">
        <div className="col-des-12 information-group-section">
          <SidebarLayout>
            <div className="sidebar-group-section">
              <button
                className="col-des-1 toggle"
                onClick={() => this.setState({ isProfileOpen: true })}
              >
                <svg viewBox="0 0 100 80" width="20" height="20">
                  <rect width="100" height="20" rx="15"></rect>
                  <rect y="30" width="100" height="20" rx="15"></rect>
                  <rect y="60" width="100" height="20" rx="15"></rect>
                </svg>
              </button>
              <input
                ref={this.searchInput}
                type="search"
                className="ip-search col-des-11"
                id="ip_search"
                placeholder="Search..."
                onKeyDown={this.handleSearchGroup}
              />
            </div>
            <div>
              {this.state.searchedGroups === null &&
                this.props.groups.map((group) => {
                  if (
                    group.members.filter(
                      (member) => member.user_id === this.props.userLogin.id
                    ).length > 0
                  ) {
                    return (
                      <ChatBox
                        key={group.id}
                        group={group}
                        handleSelectedGroup={this.props.handleSelectedGroup}
                      />
                    );
                  }
                  return;
                })}
              {this.state.searchedGroups !== null &&
                this.state.searchedGroups.map((group) => {
                  if (
                    group.members.filter(
                      (member) => member.user_id === this.props.userLogin.id
                    ).length > 0
                  ) {
                    return (
                      <ChatBox
                        key={group.id}
                        group={group}
                        handleSelectedGroup={this.props.handleSelectedGroup}
                      />
                    );
                  }
                  return;
                })}
            </div>
            <button
              className="btn btn-green btn-add-group"
              onClick={this.handleClick}
            >
              +
            </button>
          </SidebarLayout>
        </div>
        <div
          className={`col-des-12 add-group-section ${
            this.state.isAddGroupOpen ? "" : "hidden"
          }`}
        >
          <SidebarLayout>
            <div className="sidebar-add-group-section">
              <div className="sidebar-add-group-title">
                <button
                  className="col-des-1 toggle"
                  onClick={this.handleTurnBack}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <h2 className="col-des-10">New Group</h2>
              </div>
              <input
                className="col-des-12"
                id="ip_group_name"
                type="text"
                placeholder="Group Name"
                ref={this.addGroupInput}
                onKeyDown={this.handleSubmit}
              />
            </div>
            <button
              className="btn btn-green btn-submit-add-group"
              type="submit"
              onClick={this.handleSubmit}
            >
              +
            </button>
          </SidebarLayout>
        </div>
        <div
          className={`col-des-12 profile-section ${
            this.state.isProfileOpen ? "" : "hidden"
          }`}
        >
          <SidebarLayout>
            <div className="sidebar-profile-section">
              <div className="sidebar-profile-title">
                <button
                  className="col-des-1 toggle"
                  onClick={this.handleTurnBack}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <h2 className="col-des-10">User Profile</h2>
              </div>
            </div>
            <div
              className="profile-option"
              onClick={() => {
                this.props.handleSetUserLogin(null);
              }}
            >
              Logout
            </div>
          </SidebarLayout>
        </div>
      </div>
    );
  }
}

export default Group;
