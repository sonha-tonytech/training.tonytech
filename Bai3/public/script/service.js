const getAllUsers = () => {
  return users;
};

//  get User by id
const getUserById = async (id) => {
  const res = await fetch(`http://localhost:3001/api/users/${id}`, {
    method: "GET",
  });
  const user = await res.json();
  return user;
};

// Insert data
const addUser = async (form) => {
  const res = await fetch("http://localhost:3001/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const notice = await res.json();
  return notice;
};

//  Update data
const updateUser = async (form, index) => {
  if (index < 1 || index > users.length) {
    return false;
  } else {
    const res = await fetch(
      `http://localhost:3001/api/users/${userUpdate._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    const notice = await res.json();
    if (notice === "Success") return true;
    else return notice;
  }
};

// Delete data
const deleteUser = async (id) => {
  const res = await fetch(`http://localhost:3001/api/users/${id}`, {
    method: "DELETE",
  });
  const notice = res.json();
  return notice;
};
