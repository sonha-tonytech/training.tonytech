import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import Group from "modules/group";
import MessageBox from "modules/message-box";
import withAuth from "HOCs/withAuth";
import "./home.css";
class Home extends React.Component {
  render() {
    if (!this.props.authContext.token) {
      return <Redirect to="/auth" />;
    }
    return (
      <div className="home-section">
        <Group className="col-des-3" />
        <MessageBox className="col-des-9" />
      </div>
    );
  }
}

export default withRouter(withAuth(Home));
