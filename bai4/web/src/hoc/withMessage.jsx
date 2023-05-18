import React from "react";
import { MessageContext } from "../context/messagecontext";

const withMessage = (Component) => {
  return class extends React.Component {
    render() {
      return (
        <MessageContext.Consumer>
          {(messageContext) => (
            <Component {...this.props} messageContext={messageContext} />
          )}
        </MessageContext.Consumer>
      );
    }
  };
};

export default withMessage;