const fetchData = async () => {
  const res = await fetch("http://localhost:3001/api/users", {
    method: "GET",
  });

  const data = await res.json();
  return data;
};

// Retrive data
const readFormUser = () => {
  var formData = {};
  formData["index"] = 0;
  formData["userName"] = document.getElementById("userName").value;
  formData["address"] = document.getElementById("address").value;
  formData["city"] = document.getElementById("city").value;
  formData["pinCode"] = document.getElementById("pinCode").value;
  formData["country"] = document.getElementById("country").value;
  formData["selected"] = false;
  return formData;
};

// Edit data
const showFormUserEdit = async (id, index) => {
  userUpdate = await getUserById(id);
  document.getElementById("ip_user_id").value = userUpdate._id;
  document.getElementById("index-add-user").value = index;
  document.getElementById("userName").value = userUpdate.userName;
  document.getElementById("address").value = userUpdate.address;
  document.getElementById("city").value = userUpdate.city;
  document.getElementById("pinCode").value = userUpdate.pinCode;
  document.getElementById("country").value = userUpdate.country;
  openForm();
};

// innerHTML User table after select Row and Page
const getRowUsersHTML = (listusers) => {
  let queryUsers = listusers.map(
    (user) =>
      `<tr>
    <td style="text-align: center;"><input ${
      user.selected ? "checked" : ""
    } class="ip-checkbox" type="checkbox" id="id_checkbox_${user._id}"/></td>
    <td style="text-align: center;">${users.indexOf(user) + 1}</td>
    <td style="padding-left: 1%;">${user.userName}</td>
    <td style="padding-left: 1%;">${user.address}</td>
    <td style="padding-left: 1%;">${user.city}</td>
    <td style="padding-left: 1%;">${user.pinCode}</td>
    <td style="padding-left: 1%;">${user.country}</td>
    <td class="btn-actions">
      <input type='hidden' id="index-field-${
        user._id
      }" name='index-user' value="${users.indexOf(user) + 1}" />
      <i class="fas fa-edit" id="btn-edit-${user._id}"></i>
      <i class="fas fa-trash" id="btn-delete-${user._id}"></i>
    </td>
  </tr>`
  );
  return queryUsers.join("");
};

//Page pagination
const pagingUsersTable = (listUsers, id) => {
  document.querySelectorAll(".active").forEach((node) => {
    node.classList.remove("active");
    node.classList.add("disative");
    node.addEventListener("click", (e) => {
      pagingUsersTable(listUsers, e.target.id);
    });
  });

  currentPage = Number(document.getElementById(id).innerHTML);
  clearEventListeners();
  document.getElementById("id_select_all_users").checked = false;
  listUsers.forEach((user) => {
    user.selected ? false : user.selected;
  });
  table[0].innerHTML = "";
  renderUsersTable(listUsers);
};

//Handle Left Arrow and Right Arrow in Pagination
const handlePageArrow = (listUsers, currPage, id) => {
  pageNumberUsers = getPageNumberUsers(listUsers, currentRow);
  if (id === "left-arrow") {
    if (currPage !== 1) {
      currPage--;
      if (currPage === 1) {
        document.getElementById("left-arrow").style.color = "var(--selectPage)";
      }
      document.getElementById("right-arrow").style.color =
        "var(--notSelectPage)";
    }
  }
  if (id === "right-arrow") {
    if (currPage !== pageNumberUsers) {
      currPage++;
      document.getElementById("left-arrow").style.color =
        "var(--notSelectPage)";
      if (currPage === pageNumberUsers) {
        document.getElementById("right-arrow").style.color =
          "var(--selectPage)";
      }
    }
  }
  var id = `page_number_${currPage}`;
  pagingUsersTable(listUsers, id);
  document.getElementById(id).classList.add("active");
  document.getElementById(id).classList.remove("disative");
};

// clear arrow Event before action
const clearEventListeners = () => {
  document
    .getElementById("btn-delete-all-users")
    .removeEventListener("click", deleteManyUsers);
  document
    .getElementById("id_select_all_users")
    .removeEventListener("change", checkTableUsers);
  document
    .getElementById("ip_row_select")
    .removeEventListener("change", changeCurrentRow);
};

const getPageNumber = (listUsers, rowNumber, currPage) => {
  pageNumbers.innerHTML = ` <i class="fas fa-chevron-left page-arrow" id="left-arrow"></i>
                            <ul class="pagination" id="pagination"></ul>
                            <i class="fas fa-chevron-right page-arrow" id="right-arrow"></i>`;

  let pageNumber = document.getElementById("pagination");
  let pageNumberUsers = getPageNumberUsers(listUsers, rowNumber);

  for (let i = 0; i < pageNumberUsers; i++) {
    pageNumber.innerHTML += `<li class="disative" id="page_number_${i + 1}">${
      i + 1
    }</li>`;
  }

  let id = `page_number_${currPage}`;
  // Change classname selected page
  document.getElementById(id).classList.add("active");
  document.getElementById(id).classList.remove("disative");

  // custom CSS for left and right arrows
  if (
    currentPage === 1 &&
    currentPage === getPageNumberUsers(users, currentRow)
  ) {
    document.getElementById("left-arrow").style.color = "var(--selectPage)";
    document.getElementById("right-arrow").style.color = "var(--selectPage)";
  } else if (
    currentPage === 1 &&
    currentPage !== getPageNumberUsers(users, currentRow)
  ) {
    document.getElementById("left-arrow").style.color = "var(--selectPage)";
    document.getElementById("right-arrow").style.color = "var(--notSelectPage)";
  } else if (
    currentPage === getPageNumberUsers(users, currentRow) &&
    currentPage !== 1
  ) {
    document.getElementById("left-arrow").style.color = "var(--notSelectPage)";
    document.getElementById("right-arrow").style.color = "var(--selectPage)";
  } else {
    document.getElementById("left-arrow").style.color = "var(--notSelectPage)";
    document.getElementById("right-arrow").style.color = "var(--notSelectPage)";
  }

  let btnPageNumbers = document.querySelectorAll("li.disative");
  btnPageNumbers.forEach((node) => {
    node.addEventListener("click", (e) => {
      pagingUsersTable(listUsers, e.target.id);
    });
  });

  let btnPageArrows = document.querySelectorAll(".page-arrow");
  btnPageArrows.forEach((node) => {
    node.addEventListener("click", (e) => {
      handlePageArrow(listUsers, currPage, e.target.id);
    });
  });
};

// Get sum of each country
const showSumUserCountry = (listUsers) => {
  document.getElementById("show-total-country").innerHTML = "";
  const object = listUsers.reduce((obj, user) => {
    obj[user.country] = (obj[user.country] || 0) + 1;
    return obj;
  }, {});

  for (const country in object) {
    document.getElementById(
      "show-total-country"
    ).innerHTML += `<div> Sum of ${country}: ${object[country]}</div>`;
  }

  const total = Object.values(object).reduce((sum, value) => sum + value, 0);

  document.getElementById(
    "show-total-country"
  ).innerHTML += `<div style="text-align:center">Sum of all country: ${total}</div>`;
};

// render list users to table
const renderUsersTable = (listUsers) => {
  if (listUsers.length > 0) {
    let start = currentRow * (currentPage - 1);
    let end = start + currentRow;
    let newListUsers = listUsers.slice(start, end);

    var htmlUsers = getRowUsersHTML(newListUsers);
    table[0].innerHTML = htmlUsers;

    getPageNumber(listUsers, currentRow, currentPage);
    showSumUserCountry(listUsers);

    //listen checkbox events
    const ipCheckbox = document.getElementById("id_select_all_users");
    ipCheckbox.addEventListener(
      "change",
      (checkTableUsers = () => {
        newListUsers.forEach((user) => {
          user.selected = ipCheckbox.checked;
          document.getElementById(`id_checkbox_${user._id}`).checked =
            user.selected;
        });
      })
    );

    const ipCheckboxes = document.querySelectorAll(".ip-checkbox");
    ipCheckboxes.forEach((node) => {
      node.addEventListener("change", async (e) => {
        let id = cutString(e.target.id, `id_checkbox_`);
        let userCheckboxUser = listUsers.find((user) => user._id === id);
        node.checked
          ? (userCheckboxUser.selected = true)
          : (userCheckboxUser.selected = false);
      });
    });

    // listen edit button events
    const btnEdits = document.querySelectorAll(".fa-edit");
    btnEdits.forEach((node) => {
      node.addEventListener("click", (e) => {
        let id = cutString(e.target.id, `btn-edit-`);
        let index = document.getElementById(`index-field-${id}`).value;
        showFormUserEdit(id, index);
      });
    });

    // listen delete button events
    const btnDeletes = document.querySelectorAll(".fa-trash");
    btnDeletes.forEach((node) => {
      node.addEventListener("click", async (e) => {
        if (confirm("Do you want to delete this row?")) {
          let id = cutString(e.target.id, `btn-delete-`);
          let indexUserDelete = users.findIndex((user) => user._id === id) + 1;
          await deleteUser(id);
          if (indexUserDelete % currentRow === 1 && currentPage > 1) {
            currentPage--;
          }
        }
        clearEventListeners();
        users = await fetchData();
        table[0].innerHTML = "";
        renderUsersTable(users);
      });
    });

    // Delete many users
    const btnDeleteUsers = document.getElementById("btn-delete-all-users");
    btnDeleteUsers.addEventListener(
      "click",
      (deleteManyUsers = async () => {
        newListUsers.forEach(async (user) => {
          if (user.selected === true) {
            await deleteUser(user._id);
          }
        });
        users = await fetchData();
        if (
          users.length % currentRow === 0 &&
          users.length !== 0 &&
          currentPage > 1
        ) {
          currentPage--;
        }
        clearEventListeners();
        document.getElementById("id_select_all_users").checked = false;
        listUsers.forEach((user) => {
          user.selected ? false : user.selected;
        });
        table[0].innerHTML = "";
        renderUsersTable(users);
      })
    );

    // Change current row
    document.getElementById("ip_row_select").addEventListener(
      "change",
      (changeCurrentRow = () => {
        selectRowTable(listUsers);
      })
    );
  }
};

// Search data
const searchUser = () => {
  currentPage = 1;
  var input = document.getElementById("ip_search").value;
  var listUserAfterSearch = users.filter(
    (user) =>
      user.userName.toUpperCase().includes(input.toUpperCase()) ||
      user.address.toUpperCase().includes(input.toUpperCase()) ||
      user.city.toUpperCase().includes(input.toUpperCase()) ||
      user.pinCode.toString().toUpperCase().includes(input.toUpperCase()) ||
      user.country.toUpperCase().includes(input.toUpperCase())
  );

  //delete all event before render list user after searching
  clearEventListeners();

  table[0].innerHTML = "";
  renderUsersTable(listUserAfterSearch);

  // add event listener for row table
  document.getElementById("ip_row_select").addEventListener(
    "change",
    (changeCurrentRow = () => {
      selectRowTable(listUserAfterSearch);
    })
  );
};

// Select Row to show table
const selectRowTable = (listUsers) => {
  let rowNumber = Number(document.getElementById("ip_row_select").value);
  if (getPageNumberUsers(listUsers, rowNumber) < currentPage) {
    currentPage = getPageNumberUsers(listUsers, rowNumber);
  }
  currentRow = rowNumber;
  //delete all event before render list user after searching
  clearEventListeners();
  table[0].innerHTML = "";
  renderUsersTable(listUsers);
};

// reset the form data
const resetForm = () => {
  let form = document.getElementById("form-add-user");
  form.reset();
  userUpdate = {};
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
const validateForm = async () => {
  const formData = readFormUser();
  let msg = document.getElementById("msg-add-user");

  if (
    formData.userName === "" ||
    formData.address === "" ||
    formData.city === "" ||
    formData.pinCode === "" ||
    formData.country === ""
  ) {
    msg.innerHTML = "Information cannot be blank";
  } else if (formData.index < 0 || formData.index > users.length + 1) {
    msg.innerHTML = "invalid index value";
  } else {
    msg.innerHTML = "";
    if (Object.values(userUpdate).length === 0) {
      users.length === 0
        ? formData.index++
        : (formData.index = users[users.length - 1].index + 1);
      addUser(formData);
      closeForm();
    } else {
      let indexUser =
        Number(document.getElementById("index-add-user").value) - 1;
      formData.index = userUpdate.index;
      if (
        indexUser + 1 !==
          Number(
            document.getElementById(`index-field-${userUpdate._id}`).value
          ) &&
        indexUser < 0 &&
        indexUser > users.length
      ) {
        indexUser === 0
          ? (formData.index = users[indexUser].index / 2)
          : (formData.index =
              (users[indexUser].index + users[indexUser - 1].index) / 2);
      }
      let userCheck = await updateUser(formData, indexUser + 1);
      if (userCheck === false) {
        msg.innerHTML = "invalid user information";
      } else {
        closeForm();
      }
    }
    if (users.length !== 0) {
      clearEventListeners();
    }
    users = await fetchData();
    table[0].innerHTML = "";
    renderUsersTable(users);
  }
};

// Main
const main = async () => {
  let form = document.getElementById("form-add-user");

  try {
    let listUsers = await fetchData();

    if (listUsers != null) {
      users = listUsers;
    }
  } catch (err) {
    console.log("err", err);
  }

  renderUsersTable(users);

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
};

main();
