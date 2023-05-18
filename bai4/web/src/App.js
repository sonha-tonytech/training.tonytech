import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Auth, HomePage } from "./routes";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route path="/groups" component={HomePage} />
            <Route path="/auth" component={Auth} />
            <Redirect to={"/groups"} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
