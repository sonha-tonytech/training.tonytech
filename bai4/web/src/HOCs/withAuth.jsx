import React from "react";
import { AuthContext } from "../contexts/authcontext";

const withAuth = (Component) => {
  return class extends React.Component {
    render() {
      return (
        <AuthContext.Consumer>
          {(authContext) => <Component {...this.props} authContext={authContext} />}
        </AuthContext.Consumer>
      );
    }
  };
};

export default withAuth;