import React from "react";
import { AuthContext } from "contexts/authcontext";
import Loader from "components/loader";

const withAuth = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
      };
    }

    handleSetLoading = (loading) => {
      this.setState({ loading: loading });
    };

    render() {
      return (
        <>
          <AuthContext.Consumer>
            {(authContext) => (
              <Component
                {...this.props}
                handleSetLoading={this.handleSetLoading}
                authContext={authContext}
              />
            )}
          </AuthContext.Consumer>
          {this.state.loading && <Loader />}
        </>
      );
    }
  };
};

export default withAuth;
