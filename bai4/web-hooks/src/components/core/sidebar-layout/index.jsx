import React from "react";
import "./sidebar.layout.css";

class SidebarLayout extends React.Component {
  render() {
    return (
      <div className="sidebar-layout-section">
        {this.props.children}
      </div>
    );
  }
}

export default SidebarLayout;
