import { createContext, useEffect, useState } from "react";
import { useCookies } from "customhook/useCookies";

import { loginAPI, registerAPI, getProfileAPI } from "api/auth";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const {saveCookie, cookie, removeCookie} = useCookies();
  
  const token = cookie.token;

  const [userLogin, setUserLogin] = useState(null);

  const handleSetUserLogin = (userLogin) => {
    setUserLogin(userLogin);
  };

  const handleSetToken = (token) => {
    saveCookie("token", token);
  };

  const loginUser = async (data) => {
    try {
      const login = await loginAPI(data);
      return login.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const registerUser = async (data) => {
    try {
      const register = await registerAPI(data);
      return register.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const logoutUser = () => {
    removeCookie("token");
    setUserLogin(null);
  };

  const handleGetUserProfile = async () => {
    try {
      const users = await getProfileAPI();
      return users.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const checkToken = async () => {
    if (token) {
      const userLogin = await handleGetUserProfile();
      if (userLogin) {
        setUserLogin(userLogin);
      } else {
        logoutUser();
      }
    }
  };

  return (
    <>
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
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export { AuthContext };

export default AuthProvider;
