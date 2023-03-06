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

// innerHTML User table after select Row and Page
const getRowUser = (listusers) => {
  let queryUsers = listusers.map(
    (user) =>
      `<tr>
    <td style="text-align: center;">${users.indexOf(user) + 1}</td>
    <td style="padding-left: 1%;">${user.userName}</td>
    <td style="padding-left: 1%;">${user.address}</td>
    <td style="padding-left: 1%;">${user.city}</td>
    <td style="padding-left: 1%;">${user.pinCode}</td>
    <td style="padding-left: 1%;">${user.country}</td>
    <td class="btn-actions">
      <i class="fas fa-edit" id="btn-edit-${user.id}"></i>
      <i class="fas fa-trash" id="btn-delete-${user.id}"></i>
    </td>
  </tr>`
  );
  return queryUsers;
};

const getPageNumber = (listUsers, rowNumber) => {
  pageNumber[0].innerHTML = "";
  let pageNumberUsers = getPageNumberUsers(listUsers, rowNumber);
  for (let i = 0; i < pageNumberUsers; i++) {
    pageNumber[0].innerHTML += `<li class="disative" id="page_number_${
      i + 1
    }">${i + 1}</li>`;
  }
};

// Get sum of each country
const getSumUserCountry = (listUsers) => {
  let newListUserCountry = listUsers.map((user) => user.country);
  document.getElementsByClassName("show-total-country")[0].innerHTML = "";
  ["viet nam", "america"].forEach((country) => {
    let sumCountry = newListUserCountry.reduce((acc, item) => {
      if (item === country) {
        acc++;
      }
      return acc;
    }, 0);

    document.getElementsByClassName(
      "show-total-country"
    )[0].innerHTML += `<div>Sum of ${country}: ${sumCountry}</div>`;
  });
};

// render list users to table
const renderUsersTable = (listUsers) => {
  document.getElementById("ip_row_select").value =
    localStorage.getItem("selectedRow");
  currentRow = Number(localStorage.getItem("selectedRow"));
  currentPage = Number(localStorage.getItem("selectedPage"));

  if (listUsers.length > 0) {
    let start = currentRow * (currentPage - 1);
    let end = start + currentRow;
    let newListUsers = listUsers.slice(start, end);

    var queryUsers = getRowUser(newListUsers);
    queryUsers.forEach((element) => {
      table[0].innerHTML += element;
    });

    getSumUserCountry(listUsers);

    // listen edit button events
    const btnEdits = document.querySelectorAll(".fa-edit");
    btnEdits.forEach((node) => {
      node.addEventListener("click", (e) => {
        let id = Number(e.target.id.slice(9));
        showFormUserEdit(id);
      });
    });

    // listen delete button events
    const btnDeletes = document.querySelectorAll(".fa-trash");
    btnDeletes.forEach((node) => {
      node.addEventListener("click", (e) => {
        let id = Number(e.target.id.slice(11));
        deleteUser(id);
      });
    });
  }
};

// Search data
const searchUser = () => {
  var input = document.getElementById("ip_search").value;
  var listUserAfterSearch = users.filter(
    (user) =>
      user.userName.toUpperCase().includes(input.toUpperCase()) ||
      user.address.toUpperCase().includes(input.toUpperCase()) ||
      user.city.toUpperCase().includes(input.toUpperCase()) ||
      user.pinCode.toUpperCase().includes(input.toUpperCase()) ||
      user.country.toUpperCase().includes(input.toUpperCase())
  );
  table[0].innerHTML = "";
  renderUsersTable(listUserAfterSearch);
};

// Select Row to show table
const selectRowTable = () => {
  let rowNumber = document.getElementById("ip_row_select").value;
  localStorage.setItem("selectedRow", rowNumber);
  location.reload();
};

//Page pagination
const pagingUsersTable = (id) => {
  document.querySelectorAll(".active").forEach((node) => {
    node.classList.remove("active");
    node.classList.add("disative");
    node.addEventListener("click", (e) => {
      pagingUsersTable(e.target.id);
      node.classList.remove("disative");
      node.classList.add("active");
    });
  });

  let newCurrentPage = document.getElementById(id).innerHTML;
  let rowNumber = localStorage.getItem("selectedRow");
  if (Number(newCurrentPage) === 1) {
    document.getElementById("left-arrow").style.color = "var(--selectPage)";
  }
  else if (Number(newCurrentPage) === getPageNumberUsers(users, rowNumber)) {
    document.getElementById("right-arrow").style.color = "var(--selectPage)";
  }
  localStorage.setItem("selectedPage", newCurrentPage);
  table[0].innerHTML = "";
  renderUsersTable(users);
};

//Handle Left Arrow in Pagination
const handleLeftArrow = () => {
  let currentPageNumber = Number(localStorage.getItem("selectedPage"));

  if (currentPageNumber !== 1) {
    currentPageNumber--;
    var id = `page_number_${currentPageNumber}`;
    pagingUsersTable(id);
    document.getElementById(id).classList.add("active");
    document.getElementById(id).classList.remove("disative");
    if (currentPageNumber === 1) {
      document.getElementById("left-arrow").style.color = "var(--selectPage)";
    }
    document.getElementById("right-arrow").style.color = "var(--notSelectPage)";
  }
};

//Handle Right Arrow in Pagination
const handleRightArrow = () => {
  let rowNumber = localStorage.getItem("selectedRow");
  let pageNumberUsers = getPageNumberUsers(users, rowNumber);
  let currentPageNumber = Number(localStorage.getItem("selectedPage"));

  if (currentPageNumber !== pageNumberUsers) {
    currentPageNumber++;
    var id = `page_number_${currentPageNumber}`;
    pagingUsersTable(id);
    document.getElementById(id).classList.add("active");
    document.getElementById(id).classList.remove("disative");
    document.getElementById("left-arrow").style.color = "var(--notSelectPage)";
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
  document.getElementById("index-add-user").value = "";
  resetForm();
};

// Vadidate Data
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
  }
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

  localStorage.setItem("selectedPage", "1");

  renderUsersTable(users);
  getPageNumber(users, currentRow);

  // Change classname page 1
  let firstNumberPage = document.getElementById("page_number_1");
  firstNumberPage.classList.remove("disative");
  firstNumberPage.classList.add("active");

  // submit form user
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

  document.getElementById("ip_search").addEventListener("change", () => {
    searchUser();
  });

  document.getElementById("ip_row_select").addEventListener("change", () => {
    selectRowTable();
  });

  document.getElementById("left-arrow").addEventListener("click", () => {
    handleLeftArrow();
  });

  document.getElementById("right-arrow").addEventListener("click", () => {
    handleRightArrow();
  });

  let btnPageNumbers = document.querySelectorAll("li.disative");
  btnPageNumbers.forEach((node) => {
    node.addEventListener("click", (e) => {
      document.getElementById("left-arrow").style.color = "var(--notSelectPage)";
      pagingUsersTable(e.target.id);
      node.classList.remove("disative");
      node.classList.add("active");
    });
  });
};

main();
