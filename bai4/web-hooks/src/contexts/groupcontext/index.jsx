import { createContext, useState } from "react";
import {
  getGroupsAPI,
  getGroupByIdAPI,
  addNewGroupAPI,
  updateGroupAPI,
  deleteGroupAPI,
  addUserInGroupAPI,
} from "api/group";

const GroupContext = createContext();

const GroupProvider = (props) => {
  const [groups, setGroups] = useState([]);

  const handleSetGroups = (groups) => {
    setGroups(groups);
  };

  const getAllGroups = async () => {
    try {
      const groups = await getGroupsAPI();
      return groups.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const getGroupById = async (id) => {
    try {
      const group = await getGroupByIdAPI(id);
      if (typeof group.data === "object") {
        return group.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };

  const addNewGroup = async (data) => {
    try {
      const newGroup = await addNewGroupAPI({ name: data });
      return newGroup.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const updateGroup = async (data) => {
    try {
      const notice = await updateGroupAPI(data);
      if (notice.data === "Success") {
        return true;
      }
      return false;
    } catch (error) {
      return error.response.data;
    }
  };

  const deleteGroup = async (id) => {
    try {
      const notice = await deleteGroupAPI(id);
      if (notice.data === "Success") {
        return true;
      }
      return false;
    } catch (error) {
      return error.response.data;
    }
  };

  const addUserInGroup = async (idGroup, userName) => {
    try {
      const user = await addUserInGroupAPI(idGroup, { userName: userName });
      return user.data;
    } catch (error) {
      return error.response.data;
    }
  };

  return (
    <GroupContext.Provider
      value={{
        groups,
        handleSetGroups,
        getAllGroups,
        getGroupById,
        addNewGroup,
        updateGroup,
        deleteGroup,
        addUserInGroup,
      }}
    >
      {props.children}
    </GroupContext.Provider>
  );
};

export { GroupContext };

export default GroupProvider;
