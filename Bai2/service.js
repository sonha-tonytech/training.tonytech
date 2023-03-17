const getAllUsers = () => {
  return users;
};

//  get User by id
const getUserById = (id) => {
  let user = users.find((user) => user.id === id);
  return user;
};

// Insert data
const addData = (data, index) => {
  if (index === 0) {
    users[users.length] = data;
  } else {
    for (var i = users.length; i >= index; i--) {
      users[i] = users[i - 1];
    }
    users[index - 1] = data;
  }
};

//  Update data
const updateUser = (id, form, index) => {
  if (index <= 0 || index > users.length) {
    return false;
  } else {
    var indexUser = users.findIndex((user) => String(user.id) === String(id));
    [users[indexUser], users[index - 1]] = [users[index - 1], users[indexUser]];
    users[index - 1].userName = form.userName;
    users[index - 1].address = form.address;
    users[index - 1].city = form.city;
    users[index - 1].pinCode = form.pinCode;
    users[index - 1].country = form.country;
  }
  return true;
};

// Delete data
const deleteUser = (id) => {
  var indexUser = users.findIndex((user) => String(user.id) === String(id));
  users.splice(indexUser, 1);
};
