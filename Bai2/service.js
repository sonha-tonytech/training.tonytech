//  get User by id
const getUserById = (id) => {
  let user = users.find((user) => user.id === id);
  return user;
};

// Insert data
const addData = (data) => {
  let index = Number(document.getElementById("index-add-user").value);
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
const updateUser = (id, form) => {
  let index = Number(document.getElementById("index-add-user").value);
  let msg = document.getElementById("msg-add-user");
  if (index <= 0 || index > users.length) {
    msg.innerHTML = "invalid index value";
  } else {
    var indexUser = users.findIndex((user) => String(user.id) === String(id));
    [users[indexUser], users[index - 1]] = [users[index - 1], users[indexUser]];
    users[index - 1].userName = form.userName;
    users[index - 1].address = form.address;
    users[index - 1].city = form.city;
    users[index - 1].pinCode = form.pinCode;
    users[index - 1].country = form.country;
    closeForm();
  }
};

// Delete data
const deleteUser = (id) => {
  if (confirm("Do you want to delete this row?")) {
    var indexUser = users.findIndex((user) => String(user.id) === String(id));
    users.splice(indexUser, 1);
  }
  resetForm();
  localStorage.setItem("listUser", JSON.stringify(users));
  location.reload();
};

// Search data
const searchUser = () => {
  var input = document.getElementById("ip_search").value;
  var listUserNameAfterSearch = users
    .filter((user) => user.userName.toUpperCase().includes(input.toUpperCase()))
    .map((user) => user.userName);
  console.log(listUserNameAfterSearch);
  var table = document.getElementById("storeList");
  var tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td")[1];
    if (listUserNameAfterSearch.some((userName) => userName === td.innerText)) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
};
