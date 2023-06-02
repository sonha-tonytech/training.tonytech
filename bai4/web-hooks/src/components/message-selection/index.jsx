import React from "react";
import "./messageselection.css";

class MessageSelection extends React.Component {
  render() {
    return (
      <div className="col-des-12 selection-wrapper">
        <div className="col-des-6 selection-container">
          <div className="selection-container-left">
            <button
              className="btn btn-selection btn-exit-selection"
              onClick={() => {
                this.props.closeMessageSelection();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30px"
                height="30px"
                fill="gray"
              >
                <path d="M12 10.585L7.757 6.343a2 2 0 10-2.828 2.828L9.172 13l-4.243 4.243a2 2 0 102.828 2.828L12 15.172l4.243 4.243a2 2 0 102.828-2.828L14.828 13l4.243-4.243a2 2 0 10-2.828-2.828L12 10.585z" />
              </svg>
            </button>
          </div>
          <div className="selection-container-right">
            <button
              className={`btn btn-selection btn-delete-message ${
                this.props.userLogin._id ===
                  this.props.selectedGroup.owner._id ||
                this.props.selectedMessages.every(
                  (message) =>
                    message.user_id._id === this.props.userLogin._id
                )
                  ? ""
                  : "disabled"
              }`}
              onClick={() => {
                this.props.handleDeleteMessage();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30px"
                height="30px"
                fill="red"
              >
                <path d="M3 6h18v2H3zm1-4h16l-1.9 18H5.9L4 2zm7 15v-8h2v8h-2zm4 0v-8h2v8h-2z" />
              </svg>
              <span className="sp-delete-selection">Delete</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageSelection;
