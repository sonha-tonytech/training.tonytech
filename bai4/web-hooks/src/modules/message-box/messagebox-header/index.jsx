import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateGroup, deleteGroup } from "redux/actions/groupactions";
import { useNavigate } from "react-router-dom";
import Ripple from "components/group-actions-menu";
import "./messageboxheader.css";

const MessageBoxHeader = (props) => {
  const [isRippleOpen, setIsRippleOpen] = useState(false);
  const wrapperRef = useRef();
  const userLogin = useSelector((reducer) => reducer.authReducer.userLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showFormAddUser = () => {
    props.handleOpenAddUserInGroup(true);
    setIsRippleOpen(false);
  };

  const showRightSideBar = () => {
    props.handleOpenRightSideBar(true);
    setIsRippleOpen(false);
  };

  const handleDeleteUserInGroup = async () => {
    const userInGroupIndex = props.selectedGroup.members.findIndex(
      (member) => member.user_id._id === userLogin._id
    );
    props.selectedGroup.members.splice(userInGroupIndex, 1);
    const notice = await dispatch(updateGroup(props.selectedGroup));
    if (notice) {
      props.handleSelectedGroup(null);
      navigate("/");
    }
  };

  const handleDeleteGroup = async () => {
    const notice = await dispatch(deleteGroup(props.selectedGroup._id));
    if (notice) {
      props.handleSelectedGroup(null);
      navigate("/");
    }
  };

  const handleClickOutSide = (e) => {
    if (!wrapperRef.current.contains(e.target)) {
      setIsRippleOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  return (
    <div className="col-des-12 message-box-header-section">
      <h2 className="col-des-6">{props.selectedGroup.name}</h2>
      <div className="col-des-4 user-group-section">
        <div className="col-des-6 group-users">
          {props.selectedGroup.members.length} members
        </div>
        <div
          ref={wrapperRef}
          className="col-des-1 ripple"
          onClick={() => {
            isRippleOpen ? setIsRippleOpen(false) : setIsRippleOpen(true);
          }}
        >
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>

        {isRippleOpen && (
          <Ripple
            userLogin={userLogin}
            selectedGroup={props.selectedGroup}
            showFormAddUser={showFormAddUser}
            showRightSideBar={showRightSideBar}
            handleDeleteUserInGroup={handleDeleteUserInGroup}
            handleDeleteGroup={handleDeleteGroup}
          />
        )}
      </div>
    </div>
  );
};

export default MessageBoxHeader;
