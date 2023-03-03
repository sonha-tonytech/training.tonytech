const validateForm = () => {
  const formData = readFormUser();
  let index = Number(document.getElementById("index-add-user").value);
  let msg = document.getElementById("msg-add-user");

  if (
    formData.userName === "" ||
    formData.address === "" ||
    formData.city === "" ||
    formData.pinCode === "" ||
    formData.country === ""
  ) {
    msg.innerHTML = "Information cannot be blank";
  } else if (index < 0 || index > users.length + 1) {
    msg.innerHTML = "invalid index value";
  } else {
    msg.innerHTML = "";
    if (flag === 0) {
      formData.id = randomId();
      addData(formData);
      closeForm();
    } else {
      updateUser(formData.id, formData);
    }
    localStorage.setItem("listUser", JSON.stringify(users));
    location.reload();
  }
};

// Retrive data
const readFormUser = () => {
  var formData = {};
  formData["id"] = document.getElementById("ip_user_id").value;
  formData["userName"] = document.getElementById("userName").value;
  formData["address"] = document.getElementById("address").value;
  formData["city"] = document.getElementById("city").value;
  formData["pinCode"] = document.getElementById("pinCode").value;
  formData["country"] = document.getElementById("country").value;
  return formData;
};

// Edit data
const showFormUserEdit = (id) => {
  flag = 1;
  var userUpdate = getUserById(id);
  document.getElementById("ip_user_id").value = userUpdate.id;
  document.getElementById("index-add-user").value =
    users.indexOf(userUpdate) + 1;
  document.getElementById("userName").value = userUpdate.userName;
  document.getElementById("address").value = userUpdate.address;
  document.getElementById("city").value = userUpdate.city;
  document.getElementById("pinCode").value = userUpdate.pinCode;
  document.getElementById("country").value = userUpdate.country;
  openForm();
};

const renderUsersTable = () => {
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
      cell6.innerHTML = `<i class="fas fa-edit" id="btn-edit-${index}"></i> <i class="fas fa-trash" id="btn-delete-${index}"></i>`;
    });

    // listen edit button events
    const btnEdits = document.querySelectorAll(".fa-edit");
    btnEdits.forEach((node, index) => {
      node.addEventListener("click", () => {
        showFormUserEdit(users[index].id);
      });
    });

    // listen delete button events
    const btnDeletes = document.querySelectorAll(".fa-trash");
    btnDeletes.forEach((node, index) => {
      node.addEventListener("click", () => {
        deleteUser(users[index].id);
      });
    });


  }
};

// reset the form data
const resetForm = () => {
  let form = document.getElementById("form-add-user");
  form.reset();
  flag = 0;
};

// Button events
const openForm = () => {
  document.getElementById("pop-up-form").style.display = "block";
};

const closeForm = () => {
  document.getElementById("pop-up-form").style.display = "none";
  resetForm();
};

// Main
const main = () => {
  let form = document.getElementById("form-add-user");

  try {
    let listUsers = JSON.parse(localStorage.getItem("listUser"));

    if (listUsers != null) {
      users = listUsers;
    }
  } catch (err) {
    console.log("err", err);
  }

  renderUsersTable();
  // pagingUsersTable();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
  });


  // Listen elements
  document.getElementById("btn-add-new-user").addEventListener("click", () => {
    openForm();
  });

  ["btn-exit", "btn-close"].forEach((idBtn) => {
    document.getElementById(idBtn).addEventListener("click", () => {
      closeForm();
    });
  });

  document.getElementById("ip_search").addEventListener("keyup", () => {
    searchUser();
  });
  
};

//////////////////////////////////////////////////// Page pagination
  const pagingUsersTable = () => {
    // var rowNumber = Number(document.getElementById("page_selectors").value);
    // var pageNumber = document.getElementById("page_numbers");
    // currentPage--;

    // let start = currentRow * currentPage;
    // let end = start + currentRow;
    // let paginatedItems = users.slice(start, end);
    // console.log(paginatedItems);

    // for (let i=0; i<paginatedItems.length; i++){
      
    // }

    let pageLinks = document.querySelectorAll(".pagination-number");
    let activePageNumber;
    let clickedLink;
    let nextPage;
    let leftArrow;
    let rightArrow;

    console.log(pageLinks);

    pageLinks.forEach((element) => {
      element.addEventListener("click", () => {
        leftArrow = document.querySelector(".left-arrow");
        rightArrow = document.querySelector(".right-arrow");
        activeLink = document.querySelector(".active");
      });
    });
  }
/////////////////////////////////////////////////////////////////////////// 
main();
