import React from "react";
import cookies from "utils/cookies";

import { loginAPI, registerAPI, getProfileAPI } from "api/auth";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookies.get("token") || null,
      userLogin: null,
      loader: false,
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

  handleLoading = (loader) => {
    this.setState({ loader: loader });
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
    cookies.remove("token");
    this.setState({ token: null, userLogin: null });
  };

  handleGetUserProfile = async () => {
    try {
      const users = await getProfileAPI();
      return users.data;
    } catch (error) {
      return error.response.data;
    }
  };

  checkToken = async () => {
    if (this.state.token) {
      const userLogin = await this.handleGetUserProfile();
      if (userLogin) {
        this.setState({ userLogin: userLogin });
      } else {
        cookies.remove("token");
        this.setState({ token: null });
      }
    }
  };

  render() {
    const { token, userLogin } = this.state;
    const {
      handleSetToken,
      handleSetUserLogin,
      loginUser,
      registerUser,
      logoutUser,
      checkToken,
    } = this;

    return (
      <AuthContext.Provider
        value={{
          token,
          userLogin,
          handleSetToken,
          handleSetUserLogin,
          loginUser,
          registerUser,
          logoutUser,
          checkToken,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthContext };

export default AuthProvider;
