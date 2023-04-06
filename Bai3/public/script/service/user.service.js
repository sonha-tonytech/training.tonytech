// get All User
const getAllUsers = async () => {
  const users = await apiGetAllUsers();
  return users;
};

//  get User by id
const getUserById = async (id) => {
  const user = await apiGetUserById(id);
  return user;
};

// Insert User
const addUser = async (form) => {
  const userAdded = await apiAddUser(form);
  if (typeof userAdded !== "object") {
    return userAdded;
  }
  users.push(userAdded);
  return true;
};

// Update User
const updateUser = async (data, index, position) => {
  if (index < 1 || index > users.length) {
    return false;
  } else if (index !== position) {
    if (index === 1) data.index = users[index - 1].index / 2;
    else if (index === users.length) data.index = users[index - 1].index + 1;
    else if (index < position)
      data.index = (users[index - 1].index + users[index - 2].index) / 2;
    else data.index = (users[index - 1].index + users[index].index) / 2;
  }
  else data.index = users[index-1].index;

  const notice = await apiUpdateUser(data);
  if (notice === "Success") {
    const changedIndexUser = users.splice(position - 1, 1)[0];
    users.splice(index - 1, 0, changedIndexUser);
    users = users.map((user) => {
      if (user._id === data._id) {
        user.index = data.index;
        user.userName = data.userName;
        user.email = data.email;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.country = data.country;
      }
      return user;
    });
    return true;
  }
  return notice;
};

// Delete data
const deleteUser = async (id) => {
  const notice = await apiDeleteUser(id);
  if (notice === "Success") {
    const index = users.findIndex((user) => user._id === id);
    users.splice(index, 1);
    return true;
  }
  return notice;
};
