import React from "react";
import {
  getGroupsAPI,
  getGroupByIdAPI,
  addNewGroupAPI,
  updateGroupAPI,
  deleteGroupAPI,
  addUserInGroupAPI,
} from "api/group";

const GroupContext = React.createContext();

class GroupProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
  }

  handleSetGroups = (groups) => {
    this.setState({
      groups: groups,
    });
  };

  getAllGroups = async () => {
    try {
      const groups = await getGroupsAPI();
      return groups.data;
    } catch (error) {
      return error.response.data;
    }
  };

  getGroupById = async (id) => {
    try {
      const group = await getGroupByIdAPI(id);
      if (typeof group.data === "object") {
        return group.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };

  addNewGroup = async (data) => {
    try {
      const newGroup = await addNewGroupAPI({ name: data });
      return newGroup.data;
    } catch (error) {
      return error.response.data;
    }
  };

  updateGroup = async (data) => {
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

  deleteGroup = async (id) => {
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

  addUserInGroup = async (idGroup, userName) => {
    try {
      const user = await addUserInGroupAPI(idGroup, { userName: userName });
      return user.data;
    } catch (error) {
      return error.response.data;
    }
  };

  render() {
    const groups = this.state.groups;

    const {
      handleSetGroups,
      getAllGroups,
      getGroupById,
      addNewGroup,
      updateGroup,
      deleteGroup,
      addUserInGroup,
      deleteUserInGroup,
    } = this;

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
          deleteUserInGroup,
        }}
      >
        {this.props.children}
      </GroupContext.Provider>
    );
  }
}

export { GroupContext };

export default GroupProvider;
