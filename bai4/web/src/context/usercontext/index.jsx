import React from "react";
import { cookies, instance } from "../../until";

const UserContext = React.createContext();

class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.config = {
      headers: {
        Authorization: `Bearer ${cookies.get("token") || ""}`,
      },
    };
  }

  handleSetUsers = (users) => {
    this.setState({
      users: users,
    });
  };

  getAllUsers = async () => {
    try {
      const users = await instance.get("/users", this.config);
      return users.data;
    } catch (error) {
      return error.response.data;
    }
  };

  getUserById = async (id) => {
    const user = await instance.get(`/users/${id}`, this.config);
    return user.data;
  };

  updateUser = async (data) => {
    try {
      const notice = await instance.put(
        `/users/${data._id}`,
        data,
        this.config
      );
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

    const {
      handleSetUsers,
      getAllUsers,
      getUserById,
      updateUser,
    } = this;

    return (
      <UserContext.Provider
        value={{
          users,
          handleSetUsers,
          getAllUsers,
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
