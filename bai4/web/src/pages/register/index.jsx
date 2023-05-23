import React from "react";
import { Link, withRouter } from "react-router-dom";
import withAuth from "src/HOCs/withAuth";
import AuthLayout from "src/layouts/auth-layout";
import "./register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg_register: "",
    };
    this.userNameInput = React.createRef();
    this.passwordInput = React.createRef();
    this.nameInput = React.createRef();
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const userName = this.userNameInput.current.value.toLowerCase();
    const passWord = this.passwordInput.current.value;
    const name = this.nameInput.current.value;
    if (userName && passWord && name) {
      const newUser = {
        userName: userName,
        passWord: passWord,
        name: name,
      };
      const notice = await this.props.authContext.registerUser(newUser);
      if (notice === "Success") {
        alert("Success to register !!!");
        this.props.history.push({
          pathname: "/auth/login",
        });
      } else this.setState({ msg_register: notice });
    } else
      this.setState({ msg_register: "Register requires full information!" });
  };

  componentDidMount = () => {
    if (this.props.authContext.token) {
      this.props.authContext.logoutUser();
    }
  };

  render() {
    return (
      <AuthLayout>
        <div className="register-section">
          <div className="register-section-title">
            <h1>Register</h1>
          </div>
          <div className="register-section-content">
            <form className="form-register">
              <div>
                <label htmlFor="userName">Username</label>
                <input
                  required
                  type="text"
                  className="col-des-12"
                  placeholder="Type your username"
                  ref={this.userNameInput}
                />
              </div>
              <div>
                <label htmlFor="passWord">Password</label>
                <input
                  type="password"
                  className="col-des-12"
                  placeholder="Type your password"
                  ref={this.passwordInput}
                />
              </div>
              <div>
                <label htmlFor="Name">Your Name</label>
                <input
                  type="name"
                  className="col-des-12"
                  placeholder="Type your name"
                  ref={this.nameInput}
                />
              </div>
              <div className="msg-register">{this.state.msg_register}</div>
              <div>
                <button
                  type="submit"
                  className="col-des-12 btn btn-green btn-login"
                  onClick={this.onSubmit}
                >
                  Register
                </button>
              </div>
            </form>
            <div className="login-account">
              <h4>You have already account</h4>
              <Link to={"/auth/login"}>
                <button className="btn btn-green btn-login" id="btn_login">
                  LOGIN
                </button>
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }
}

export default withRouter(withAuth(Register));
