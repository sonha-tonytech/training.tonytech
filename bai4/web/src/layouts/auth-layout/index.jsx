import React from "react";
import "./auth.layout.css";

class AuthLayout extends React.Component {
  render() {
    return(
    <div className="authentication-layout-section">
      <div className="container">{this.props.children}</div>
    </div>
    )
  }
}

export default AuthLayout;
