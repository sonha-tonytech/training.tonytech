import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthProvider from "../../context/authcontext";
import Home from "../../pages/home";
import UserProvider from "../../context/usercontext";
import GroupProvider from "../../context/groupcontext";
import MessageProvider from "../../context/messagecontext";

class HomePage extends React.Component {
  getRoute = (path = "") => this.props.match.path + path;

  render() {
    return (
      <AuthProvider>
        <UserProvider>
          <GroupProvider>
            <MessageProvider>
              <Switch>
                <Route exact path={this.getRoute()} component={Home} />
                <Route path={this.getRoute("/:id")} component={Home} />
                <Redirect to={this.getRoute()} />
              </Switch>
            </MessageProvider>
          </GroupProvider>
        </UserProvider>
      </AuthProvider>
    );
  }
}

export default HomePage;
