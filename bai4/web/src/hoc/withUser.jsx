import React from "react";
import { UserContext } from "../context/usercontext";

const withUser = (Component) => {
  return class extends React.Component {
    render() {
      return (
        <UserContext.Consumer>
          {(userContext) => (
            <Component {...this.props} userContext={userContext} />
          )}
        </UserContext.Consumer>
      );
    }
  };
};

export default withUser;
