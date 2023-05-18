import React from "react";
import { cookies, instance } from "../../until";

const GroupContext = React.createContext();

class GroupProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
    this.config = {
      headers: {
        Authorization: `Bearer ${cookies.get("token") || ""}`,
      },
    };
  }

  handleSetGroups = (groups) => {
    this.setState({
      groups: groups,
    });
  };

  getAllGroups = async () => {
    try {
      const groups = await instance.get("/groups", this.config);
      return groups.data;
    } catch (error) {
      return error.response.data;
    }
  };

  getGroupById = async (id) => {
    try {
      const group = await instance.get(`/groups/${id}`, this.config);
      if (typeof group.data === "object") {
        return group.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };

  addNewGroup = async (data) => {
    try {
      const newGroup = await instance.post(
        "/groups",
        { name: data },
        this.config
      );
      return newGroup.data;
    } catch (error) {
      return error.response.data;
    }
  };

  updateGroup = async (data) => {
    try {
      const notice = await instance.put(
        `/groups/${data._id}`,
        data,
        this.config
      );
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
      const notice = await instance.delete(`/groups/${id}`, this.config);
      if (notice.data === "Success") {
        return true;
      }
      return false;
    } catch (error) {
      return error.response.data;
    }
  };

  componentDidMount = async () => {
    if (cookies.get("token")) {
      const groups = await this.getAllGroups();
      if (groups) {
        this.setState({ groups: groups });
      }
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
        }}
      >
        {this.props.children}
      </GroupContext.Provider>
    );
  }
}

export { GroupContext };

export default GroupProvider;
