import React from "react";
import SidebarLayout from "components/core/sidebar-layout";
import Button from "components/core/button";
import Input from "components/core/input";
import { GroupContext } from "contexts/groupcontext";
import withContext from "HOCs/withContext";
import "./groupaddform.css";

class AddGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.addGroupInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTurnBack = () => {
    this.props.handleOpenAddGroupForm(false);
  };

  handleSubmit = async (e) => {
    this.props.handleSetLoading(true);
    if (e.type === "click" || e.key === "Enter") {
      const groupName = this.addGroupInput.current.returnValue();
      if (groupName) {
        const newGroup = await this.props.groupContext.addNewGroup(groupName);
        if (typeof newGroup === "object") {
          this.props.groupContext.groups.push(newGroup);
          this.props.groupContext.handleSetGroups(
            this.props.groupContext.groups
          );
          this.props.handleOpenAddGroupForm(false);
        }
        this.addGroupInput.current.resetValue();
      }
    }
    this.props.handleSetLoading(false);
  };

  render() {
    return (
      <div className="col-des-12 add-group-section">
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
            <Input
              className="col-des-12"
              type="text"
              placeholder="Group Name"
              ref={this.addGroupInput}
              onKeyDown={this.handleSubmit}
            />
          </div>
          <Button className="btn-submit-add-group" onClick={this.handleSubmit}>
            +
          </Button>
        </SidebarLayout>
      </div>
    );
  }
}

export default withContext(AddGroupForm, [{ groupContext: GroupContext }]);
