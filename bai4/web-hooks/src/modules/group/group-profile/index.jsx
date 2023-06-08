import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  logoutUser,
  handleSetToken,
  handleSetUserLogin,
} from "redux/actions/authActions";
import { updateUser } from "redux/actions/userActions";
import Input from "components/core/input";
import Button from "components/core/button";
import "./groupprofile.css";

const GroupProfile = (props) => {
  const [isOpenUserProfile, setIsOpenUserProfile] = useState(false);
  const [msg, setMsg] = useState("");
  const name = useRef("");
  const userName = useRef("");
  const userLogin = useSelector((reducer) => reducer.authReducer.userLogin);
  const dispatch = useDispatch();

  const handleTurnBack = () => {
    props.handleOpenProfile(false);
  };

  const logOut = () => {
    dispatch(logoutUser());
  };

  const handleOpenUserProfile = async () => {
    setIsOpenUserProfile(true);
  };

  const handleCloseUserProfile = () => {
    setMsg("");
    setIsOpenUserProfile(false);
  };

  const handleSubmit = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      const userNameInput = userName.current.returnValue();
      const nameInput = name.current.returnValue();
      if (userNameInput && nameInput) {
        const data = {
          _id: userLogin._id,
          userName: userNameInput,
          name: nameInput,
        };
        dispatch(
          updateUser(data, (notice) => {
            if (typeof notice === "object") {
              dispatch(handleSetToken(notice.token));
              dispatch(handleSetUserLogin(data));
              setMsg("");
              alert("Success!!");
            } else if (notice) {
              setMsg(notice);
            }
          })
        );
      }
    }
  };

  return (
    <div className="col-des-12 profile-section">
      {!isOpenUserProfile ? (
        <div className="profile-option-section">
          <div className="container">
            <div className="sidebar-profile-title">
              <button className="col-des-1 toggle" onClick={handleTurnBack}>
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
              <h2 className="col-des-10">User Settings</h2>
            </div>
            <div className="sidebar-profile-content">
              <div className="profile-option" onClick={handleOpenUserProfile}>
                My Profile
              </div>
              <div className="profile-option" onClick={logOut}>
                Logout
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="profile-information-section">
          <div className="container">
            <div className="sidebar-profile-title">
              <button
                className="col-des-1 toggle"
                onClick={handleCloseUserProfile}
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
                    ref={name}
                    className="col-des-12"
                    type="text"
                    defaultValue={userLogin.name}
                    onKeyDown={handleSubmit}
                  />
                </div>
                <div className="information-user">
                  <label htmlFor="userName">Username</label>
                  <Input
                    ref={userName}
                    className="col-des-12"
                    type="text"
                    defaultValue={userLogin.userName}
                    onKeyDown={handleSubmit}
                  />
                </div>
              </form>
              <div className="msg">{msg}</div>
            </div>
            <Button
              className="btn-update-user-information"
              onClick={handleSubmit}
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
        </div>
      )}
    </div>
  );
};
export default GroupProfile;
