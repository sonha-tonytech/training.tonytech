import React from "react";
import { cookies, instance } from "../../until";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookies.get("token") || null,
      userLogin: null,
    };
    this.config = {
      headers: {
        Authorization: `Bearer ${cookies.get("token") || ""}`,
      },
    };
  }

  handleSetUserLogin = (userLogin) => {
    this.setState({ userLogin });
  };

  handleSetToken = (token) => {
    cookies.set("token", token);
  };

  handleGetUserProfile = async () => {
    try {
      const userLogin = await instance.get("/auth/profile", this.config);
      if (typeof userLogin.data === "object") {
        return userLogin.data;
      } else return null;
    } catch (error) {
      return error.response.data;
    }
  };

  loginUser = async (data) => {
    try {
      const login = await instance.post("/auth/login", data);
      return login.data;
    } catch (error) {
      return error.response.data;
    }
  };

  registerUser = async (data) => {
    try {
      const register = await instance.post("/auth/register", data);
      return register.data;
    } catch (error) {
      return error.response.data;
    }
  };

  logoutUser = () => {
    cookies.remove("token");
    this.setState({ token: null, userLogin: null });
  };

  componentDidMount = async () => {
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
      handleGetToken,
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
          token,
          userLogin,
          handleGetToken,
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
