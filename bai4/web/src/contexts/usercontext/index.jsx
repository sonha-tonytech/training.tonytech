import React from "react";
import cookies from "src/utils/cookies";
import {updateUserAPI, deleteUserAPI } from "src/api/user";

const UserContext = React.createContext();

class UserProvider extends React.Component {
  // getUserById = async (id) => {
  //   const user = await instance.get(`/users/${id}`, this.config);
  //   return user.data;
  // };

  updateUser = async (data) => {
    try {
      const notice = await updateUserAPI(data);
      return notice.data;
    } catch (error) {
      return error.response.data;
    }
  };

  // deleteUser = async (id) => {
  //   const notice = await axios.delete(getURL(`/api/users/${id}`));
  //   return notice;
  // };

  componentDidMount = async () => {
    if (cookies.get("token")) {
      const users = await this.getAllUsers();
      if (users) {
        this.setState({ users: users });
      }
    }
  };

  render() {
    const users = this.state.users;

    const { getUserById, updateUser } = this;

    return (
      <UserContext.Provider
        value={{
          users,
          getUserById,
          updateUser,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export { UserContext };

export default UserProvider;
