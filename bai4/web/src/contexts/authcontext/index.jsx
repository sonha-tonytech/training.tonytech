import React from "react";
import cookies from "src/utils/cookies";

import { loginAPI, registerAPI, getProfileAPI } from "api/auth";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogin: null,
    };
  }

  handleSetUserLogin = (userLogin) => {
    this.setState({
      userLogin: userLogin,
    });
  };

  handleSetToken = (token) => {
    cookies.set("token", token);
  };

  loginUser = async (data) => {
    try {
      const login = await loginAPI(data);
      return login.data;
    } catch (error) {
      return error.response.data;
    }
  };

  registerUser = async (data) => {
    try {
      const register = await registerAPI(data);
      return register.data;
    } catch (error) {
      return error.response.data;
    }
  };

  logoutUser = () => {
    cookies.set("token", "");
    this.setState({ userLogin: null });
  };

  handleGetUserProfile = async () => {
    try {
      const users = await getProfileAPI();
      return users.data;
    } catch (error) {
      return error.response.data;
    }
  };

  componentDidMount = async () => {
    if (this.state.token) {
      const userLogin = await this.handleGetUserProfile();
      if (userLogin) {
        this.setState({ userLogin: userLogin });
      } else {
        cookies.set("token", "");
      }
    }
  };

  render() {
    const { userLogin } = this.state;
    const {
      handleSetToken,
      handleSetUserLogin,
      handleGetUserProfile,
      loginUser,
      registerUser,
      logoutUser,
    } = this;

    return (
      <AuthContext.Provider
        value={{
          userLogin,
          handleSetToken,
          handleSetUserLogin,
          handleGetUserProfile,
          loginUser,
          registerUser,
          logoutUser,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthContext };

export default AuthProvider;
