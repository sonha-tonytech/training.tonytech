import React from "react";
import withAuth from "../../../hoc/withAuth";
import withUser from "../../../hoc/withUser";
import SidebarLayout from "../../../layouts/sidebar-layout";
import Input from "../../../components/core/input";
import Button from "../../../components/core/button";
import "./groupprofile.css";

class GroupProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenUserProfile: false,
      msg: "",
    };
    this.name = React.createRef();
    this.userName = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTurnBack = () => {
    this.props.handleOpenProfile(false);
  };

  logOut = () => {
    this.props.authContext.logoutUser();
  };

  handleOpenUserProfile = async () => {
    this.setState({ isOpenUserProfile: true });
  };

  handleCloseUserProfile = () => {
    this.setState({ msg: "", isOpenUserProfile: false });
  };

  handleSubmit = async (e) => {
    if (e.type === "click" || e.key === "Enter") {
      const userName = this.userName.current.returnValue();
      const name = this.name.current.returnValue();
      if (userName && name) {
        const data = {
          _id: this.props.authContext.userLogin._id,
          userName: userName,
          name: name,
        };
        const notice = await this.props.userContext.updateUser(data);
        if (typeof notice === "object") {
          this.props.authContext.handleSetToken(notice.token);
          this.props.authContext.handleSetUserLogin(data);
          this.setState({ msg: "" });
          alert("Success!!");
        } else if (
          notice &&
          userName !== this.props.authContext.userLogin.userName
        ) {
          this.setState({ msg: notice });
        }
      }
    }
  };

  render() {
    return (
      <div className="col-des-12 profile-section">
        {!this.state.isOpenUserProfile ? (
          <div className="profile-option-section">
            <SidebarLayout>
              <div className="sidebar-profile-title">
                <button
                  className="col-des-1 toggle"
                  onClick={this.handleTurnBack}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <h2 className="col-des-10">User Profile</h2>
              </div>
              <div className="sidebar-profile-content">
                <div
                  className="profile-option"
                  onClick={this.handleOpenUserProfile}
                >
                  My Profile
                </div>
                <div className="profile-option" onClick={this.logOut}>
                  Logout
                </div>
              </div>
            </SidebarLayout>
          </div>
        ) : (
          <div className="profile-information-section">
            <SidebarLayout>
              <div className="sidebar-profile-title">
                <button
                  className="col-des-1 toggle"
                  onClick={this.handleCloseUserProfile}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <h2 className="col-des-10">My Profile</h2>
              </div>
              <div className="sidebar-profile-content">
                <form className="form-profile">
                  <div className="information-user">
                    <label htmlFor="name">Name</label>
                    <Input
                      ref={this.name}
                      className="col-des-12"
                      type="text"
                      defaultValue={this.props.authContext.userLogin.name}
                      onKeyDown={this.handleSubmit}
                    />
                  </div>
                  <div className="information-user">
                    <label htmlFor="userName">Username</label>
                    <Input
                      ref={this.userName}
                      className="col-des-12"
                      type="text"
                      defaultValue={this.props.authContext.userLogin.userName}
                      onKeyDown={this.handleSubmit}
                    />
                  </div>
                </form>
                <div className="msg">{this.state.msg}</div>
              </div>
            </SidebarLayout>
            <Button
              className="btn-update-user-information"
              onClick={this.handleSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10.293 1.293l4.414 4.414-9 9-3.586-3.586 9-9zm1.414-1.414l1.293 1.293-9 9-1.293-1.293 9-9zM1 11v3h3l8-8-3-3-8 8z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(withUser(GroupProfile));
