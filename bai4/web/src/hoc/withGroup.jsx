import React from "react";
import { GroupContext } from "../context/groupcontext";

const withGroup = (Component) => {
  return class extends React.Component {
    render() {
      return (
        <GroupContext.Consumer>
          {(groupContext) => (
            <Component {...this.props} groupContext={groupContext} />
          )}
        </GroupContext.Consumer>
      );
    }
  };
};

export default withGroup;
