let users = [];
let flag = 0;

const formValidation = () => {
  let userName = document.getElementById("userName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let pinCode = document.getElementById("pinCode").value;
  let country = document.getElementById("country").value;
  let index = Number(document.getElementById("index-add-user").value);
  let msg = document.getElementById("msg-add-user");

  if (
    userName === "" ||
    address === "" ||
    city === "" ||
    pinCode === "" ||
    country === ""
  ) {
    msg.innerHTML = "Information cannot be blank";
    console.log("failure");
  } else if (index < 0 || index > users.length + 1) {
    msg.innerHTML = "invalid index value";
    console.log("failure");
  } else {
    console.log("success");
    msg.innerHTML = "";
    var formData = readFormData();
    if (flag === 0) {
      addData(formData);
    } else {
      updateRecord(formData);
    }
    localStorage.setItem("listUser", JSON.stringify(users));
    closeForm();
    location.reload();
  }
};

// Retrive data
const readFormData = () => {
  var formData = {};
  formData["userName"] = document.getElementById("userName").value;
  formData["address"] = document.getElementById("address").value;
  formData["city"] = document.getElementById("city").value;
  formData["pinCode"] = document.getElementById("pinCode").value;
  formData["country"] = document.getElementById("country").value;
  return formData;
};

const renderData = () => {
  // render list users to table
  if (users.length > 0) {
    users.forEach((element, index) => {
      var table = document.getElementById("storeList");
      var newRow = table.insertRow(table.rows.length);
      var cell0 = newRow.insertCell(0);
      cell0.style = "text-align: center;";
      cell0.innerHTML = newRow.rowIndex;
      var cell1 = newRow.insertCell(1);
      cell1.style = "padding-left: 1%;";
      cell1.innerHTML = element.userName;
      var cell2 = newRow.insertCell(2);
      cell2.style = "padding-left: 1%;";
      cell2.innerHTML = element.address;
      var cell3 = newRow.insertCell(3);
      cell3.style = "padding-left: 1%;";
      cell3.innerHTML = element.city;
      var cell4 = newRow.insertCell(4);
      cell4.style = "padding-left: 1%;";
      cell4.innerHTML = element.pinCode;
      var cell5 = newRow.insertCell(5);
      cell5.style = "padding-left: 1%;";
      cell5.innerHTML = element.country;
      var cell6 = newRow.insertCell(6);
      cell6.className = "btn-actions";
      cell6.innerHTML = `<i class="fas fa-edit" id="btn-edit" onclick="editData(${index})"></i> <i class="fas fa-trash" id="btn-delete" onclick="deleteData(${index})"></i>`;
    });
  }
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

// Edit data
const editData = (index) => {
  flag = 1;
  document.getElementById("index-add-user").disabled = true;
  document.getElementById("index-add-user").value = index +1;
  document.getElementById("userName").value = users[index].userName;
  document.getElementById("address").value = users[index].address;
  document.getElementById("city").value = users[index].city;
  document.getElementById("pinCode").value = users[index].pinCode;
  document.getElementById("country").value = users[index].country;
  openForm();
};

const updateRecord = (form) => {
  let index = Number(document.getElementById("index-add-user").value);
  users[index - 1].userName = form.userName;
  users[index - 1].address = form.address;
  users[index - 1].city = form.city;
  users[index - 1].pinCode = form.pinCode;
  users[index - 1].country = form.country;
};

// Delete data
const deleteData = (index) => {
  if (confirm("Do you want to delete this row?")) {
    users.splice(index, 1);
  }
  resetForm();
  localStorage.setItem("listUser", JSON.stringify(users));
  location.reload();
};

// reset the form data
const resetForm = () => {
  document.getElementById("index-add-user").value = "";
  document.getElementById("userName").value = "";
  document.getElementById("address").value = "";
  document.getElementById("city").value = "";
  document.getElementById("pinCode").value = "";
  document.getElementById("country").value = "";
  flag = 0;
};

// Button events
const openForm = () => {
  document.getElementById("pop-up-form").style.display = "block";
};

const closeForm = () => {
  document.getElementById("pop-up-form").style.display = "none";
  document.getElementById("index-add-user").disabled = false;
  resetForm();
};

// Main
function main() {
  let form = document.getElementById("form-add-user");
  let listUsers = JSON.parse(localStorage.getItem("listUser"));
  if (listUsers != null) {
    users = listUsers;
  }
  renderData();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });

  // Listen elements
  document
    .getElementById("btn-add-new-user")
    .addEventListener("click", function () {
      openForm();
    });

  document.getElementById("btn-exit").addEventListener("click", function () {
    closeForm();
  });

  document.getElementById("btn-close").addEventListener("click", function () {
    closeForm();
  });
}

main();
