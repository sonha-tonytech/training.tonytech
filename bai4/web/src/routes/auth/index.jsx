import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "src/pages/login";
import Register from "src/pages/register";
import AuthProvider from "src/contexts/authcontext";

class Authentication extends React.Component {
  getRoute = (path) => this.props.match.path + path;

  render() {
    return (
      <AuthProvider>
        <Switch>
          <Route exact path={this.getRoute("/login")} component={Login} />
          <Route path={this.getRoute("/register")} component={Register} />
          <Redirect to={this.getRoute("/login")} />
        </Switch>
      </AuthProvider>
    );
  }
}

export default Authentication;
