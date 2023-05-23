import React from "react";
import { UserContext } from "../contexts/usercontext";

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
