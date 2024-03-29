import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addUserInGroup,
  updateGroup,
  getGroupById,
} from "redux/actions/groupActions";
import { getMessagesByGroupId } from "redux/actions/messageActions";
import AddUserForm from "components/group-add-user";
import DeleteUserForm from "components/group-delete-users";
import MessageBoxHeader from "./messagebox-header";
import MessageBoxContent from "./messagebox-content";
import MessageBoxTool from "./messagebox-tool";
import "./messagebox.css";

const MessageBox = (props) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isAddUserInGroupOpen, setIsAddUserInGroupOpen] = useState(false);
  const [isMessageSelect, setIsMessageSelect] = useState(false);
  const [isRightSideBarOpen, setIsRightSideBarOpen] = useState(false);
  const callBackValue= useSelector((reducer) => reducer.groupReducer.callBackValue);
  const userLogin = useSelector((reducer) => reducer.authReducer.userLogin);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSelectedGroup = (selectedGroup) => {
    setSelectedGroup(selectedGroup);
  };

  const handleSelectedMessages = (selectedMessages) => {
    setSelectedMessages(selectedMessages);
  };

  const handleOpenAddUserInGroup = (isOpen) => {
    setIsAddUserInGroupOpen(isOpen);
  };

  const handleSelectMessage = (isOpen) => {
    setIsMessageSelect(isOpen);
  };

  const handleOpenRightSideBar = (isOpen) => {
    setIsRightSideBarOpen(isOpen);
  };

  const handleAddUserInGroup =  (userName) => {
     dispatch(
      addUserInGroup(selectedGroup._id, userName, (user) => {
        if (typeof user === "object") {
          const newUpdatedGroup = { ...selectedGroup };
          newUpdatedGroup.members.push({ user_id: user });
          setSelectedGroup(newUpdatedGroup);
          setIsAddUserInGroupOpen(false);
        }
      })
    );
  };

  const handleDeleteUserInGroup = (newGroup) => {
    dispatch(updateGroup(newGroup));
  };

  const getMessageByParamId = (id) => {
    dispatch(
      getGroupById(id, (selectedGroup) => {
        if (selectedGroup) {
          dispatch(getMessagesByGroupId(id));
          setSelectedGroup(selectedGroup);
        } else {
          setSelectedGroup(null);
        }
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        getMessageByParamId(id);
        setSelectedMessages([]);
        setIsAddUserInGroupOpen(false);
        setIsMessageSelect(false);
        setIsRightSideBarOpen(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!selectedGroup) return null;

  return (
    <div className={`message-box-container ${props.className || ""}`}>
      <div
        className={`message-box-section ${isRightSideBarOpen ? "narrow" : ""}`}
      >
        <MessageBoxHeader
          selectedGroup={selectedGroup}
          handleSelectedGroup={handleSelectedGroup}
          handleOpenAddUserInGroup={handleOpenAddUserInGroup}
          handleOpenRightSideBar={handleOpenRightSideBar}
        />
        <MessageBoxContent
          isMessageSelect={isMessageSelect}
          selectedGroup={selectedGroup}
          selectedMessages={selectedMessages}
          handleSelectMessage={handleSelectMessage}
          handleSelectedMessages={handleSelectedMessages}
        />
        <MessageBoxTool
          selectedMessages={selectedMessages}
          isMessageSelect={isMessageSelect}
          selectedGroup={selectedGroup}
          handleSelectMessage={handleSelectMessage}
          handleSelectedMessages={handleSelectedMessages}
        />
        {isAddUserInGroupOpen && (
          <AddUserForm
            selectedGroup={selectedGroup}
            handleAddUserInGroup={handleAddUserInGroup}
            handleOpenAddUserInGroup={handleOpenAddUserInGroup}
            handleSelectedGroup={handleSelectedGroup}
            callBackValue={callBackValue}
          />
        )}
      </div>
      {isRightSideBarOpen && (
        <DeleteUserForm
          userLogin={userLogin}
          selectedGroup={selectedGroup}
          handleOpenRightSideBar={handleOpenRightSideBar}
          handleDeleteUserInGroup={handleDeleteUserInGroup}
          handleSelectedGroup={handleSelectedGroup}
        />
      )}
    </div>
  );
};

export default MessageBox;
