import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../pages/login";
import Register from "../../pages/register";
import AuthProvider from "../../context/authcontext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

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
