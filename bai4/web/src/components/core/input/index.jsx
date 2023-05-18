import React from "react";
import "./input.css";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  resetValue = (e) => {
    this.inputRef.current.value = "";
  };

  returnValue = () => this.inputRef.current.value;

  render() {
    return (
      <input
        ref={this.inputRef}
        className={this.props.className || ""}
        type={this.props.type || ""}
        placeholder={this.props.placeholder || ""}
        onKeyDown={this.props.onKeyDown}
        defaultValue = {this.props.defaultValue || ""}
      />
    );
  }
}

export default Input;
