import React from "react";
import withGroup from "src/HOCs/withGroup";
import SidebarLayout from "src/layouts/sidebar-layout";
import Button from "src/components/core/button";
import Input from "src/components/core/input";
import GroupWrapper from "src/components/groupwrapper";
import "./groupinformation.css"

class GroupInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedGroups: null,
    };
    this.searchInput = React.createRef();
    this.handleOpenGroupForm = this.handleOpenGroupForm.bind(this);
    this.handleSearchGroup = this.handleSearchGroup.bind(this);
  }

  handleOpenGroupForm = () => {
    this.props.handleOpenAddGroupForm(true);
  };

  handleOpenProfile = () => {
    this.props.handleOpenProfile(true);
  };

  handleSearchGroup = (e) => {
    if (e.key === "Enter") {
      const foundGroup = this.searchInput.current.returnValue();
      if (foundGroup) {
        const listGroupsAfterSearch = this.props.groupContext.groups.filter(
          (group) => group.name.toUpperCase().includes(foundGroup.toUpperCase())
        );
        this.setState({ searchedGroups: listGroupsAfterSearch });
      } else this.setState({ searchedGroups: null });
    }
  };

  render() {
    return (
      <div className="col-des-12 information-group-section">
        <SidebarLayout>
          <div className="information-group-header">
            <button
              className="col-des-1 toggle"
              onClick={this.handleOpenProfile}
            >
              <svg viewBox="0 0 100 80" width="20" height="20">
                <rect width="100" height="20" rx="15"></rect>
                <rect y="30" width="100" height="20" rx="15"></rect>
                <rect y="60" width="100" height="20" rx="15"></rect>
              </svg>
            </button>
            <Input
              ref={this.searchInput}
              type="search"
              className="ip-search col-des-11"
              placeholder="Search..."
              onKeyDown={this.handleSearchGroup}
            />
          </div>
          <GroupWrapper
            groups={
              this.state.searchedGroups
                ? this.state.searchedGroups
                : this.props.groupContext.groups
            }
          />
          <Button className="btn-add-group" onClick={this.handleOpenGroupForm}>
            +
          </Button>
        </SidebarLayout>
      </div>
    );
  }
}

export default withGroup(GroupInformation);
