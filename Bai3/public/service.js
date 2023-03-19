const getAllUsers = () => {
  return users;
};

//  get User by id
const getUserById = (id) => {
  let user = users.find((user) => user._id === id);
  return user;
};

// Insert data
const addUser = async (form) => {
  await fetch("http://localhost:3001/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
};

//  Update data
const updateUser = async (form) => {
  if (form.index < 1 || form.index > users.length) {
    return false;
  } else {
    await fetch(`http://localhost:3001/api/users/${userUpdate._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    });
  }
  return true;
};

// Delete data
const deleteUser = async (id) => {
  await fetch(`http://localhost:3001/api/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
