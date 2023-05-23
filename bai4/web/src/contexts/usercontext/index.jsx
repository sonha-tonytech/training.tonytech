import React from "react";
import { updateUserAPI } from "api/user";

const UserContext = React.createContext();

class UserProvider extends React.Component {

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

  render() {
    const { updateUser } = this;

    return (
      <UserContext.Provider
        value={{
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
