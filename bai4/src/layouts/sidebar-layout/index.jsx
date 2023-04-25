import React from "react";
import "./sidebar.layout.css";

class SidebarLayout extends React.Component {
  render() {
    return (
      <div className="sidebar-layout-section">
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}

export default SidebarLayout;
