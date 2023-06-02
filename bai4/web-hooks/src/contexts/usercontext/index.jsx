import { createContext } from "react";
import { updateUserAPI } from "api/user";

const UserContext = createContext();

const UserProvider = (props) => {
  const updateUser = async (data) => {
    try {
      const notice = await updateUserAPI(data);
      return notice.data;
    } catch (error) {
      return error.response.data;
    }
  };

  // const deleteUser = async (id) => {
  //   const notice = await axios.delete(getURL(`/api/users/${id}`));
  //   return notice;
  // };

  return (
    <UserContext.Provider
      value={{
        updateUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext };

export default UserProvider;
