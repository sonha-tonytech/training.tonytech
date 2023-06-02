import React from "react";
import "./button.css";

class Button extends React.Component {
  render() {
    return (
      <button className={`btn btn-green btn-form ${this.props.className || ""}`} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
