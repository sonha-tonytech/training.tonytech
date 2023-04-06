const apiGetAllUsers = async () => {
  const res = await fetch(`${url}/api/users`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const users = await res.json();
  return users;
};

//  get User by id
const apiGetUserById = async (id) => {
  const res = await fetch(`${url}/api/users/${id}`, {
    method: "GET",
  });
  const user = await res.json();
  return user;
};

// Insert data
const apiAddUser = async (data) => {
  const res = await fetch(`${url}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const user = await res.json();
  return user;
};

//  Update data
const apiUpdateUser = async (form) => {
    const res = await fetch(
      `${url}/api/users/${form._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    const notice = await res.json();
    return notice;
};

// Delete data
const apiDeleteUser = async (id) => {
  const res = await fetch(`${url}/api/users/${id}`, {
    method: "DELETE",
  });
  const notice = res.json();
  return notice;
};
