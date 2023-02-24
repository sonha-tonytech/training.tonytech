let form = document.getElementById("form-add-user");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let selectedRow = null;
const formValidation = () => {
  let userName = document.getElementById("userName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let pinCode = document.getElementById("pinCode").value;
  let country = document.getElementById("country").value;
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
  } else {
    console.log("success");
    msg.innerHTML = "";
    var formData = readFormData();
    if (selectedRow === null) {
      addData(formData);
    } else {
      updateRecord(formData);
    }
    closeForm();
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

// Insert data
const addData = (data) => {
  var table = document.getElementById("storeList");
  var newRow = table.insertRow(table.rows.length);
  var cell0 = newRow.insertCell(0);
  cell0.style="text-align: center;"
  cell0.innerHTML = 0;
  var cell1 = newRow.insertCell(1);
  cell1.style="padding-left: 1%;"
  cell1.innerHTML = data.userName;
  var cell2 = newRow.insertCell(2);
  cell2.style="padding-left: 1%;"
  cell2.innerHTML = data.address;
  var cell3 = newRow.insertCell(3);
  cell3.style="padding-left: 1%;"
  cell3.innerHTML = data.city;
  var cell4 = newRow.insertCell(4);
  cell4.style="padding-left: 1%;"
  cell4.innerHTML = data.pinCode;
  var cell5 = newRow.insertCell(5);
  cell5.style="padding-left: 1%;"
  cell5.innerHTML = data.country;
  var cell6 = newRow.insertCell(6);
  cell6.className = "btn-actions";
  cell6.innerHTML = `<i class="fas fa-edit" onclick="editData(this)"></i> <i class="fas fa-trash" onclick="deleteData(this)"></i>`;
};

// Edit data
const editData = (td) => {
  openForm();
  selectedRow = td.parentElement.parentElement;
  console.log(selectedRow);
  document.getElementById("userName").value = selectedRow.cells[1].innerHTML;
  document.getElementById("address").value = selectedRow.cells[2].innerHTML;
  document.getElementById("city").value =  selectedRow.cells[3].innerHTML;
  document.getElementById("pinCode").value = selectedRow.cells[4].innerHTML;
  document.getElementById("country").value = selectedRow.cells[5].innerHTML;
}

const updateRecord = (form) => {
  selectedRow.cells[1].innerHTML = form.userName;
  selectedRow.cells[2].innerHTML = form.address;
  selectedRow.cells[3].innerHTML = form.city;
  selectedRow.cells[4].innerHTML = form.pinCode;
  selectedRow.cells[5].innerHTML = form.country;
}

// Delete data
const deleteData = (td) => {
  if(confirm("Do you want to delete this row?")){
    row = td.parentElement.parentElement;
    document.getElementById('storeList').deleteRow(row.rowIndex);
  }
  resetForm();
}

// reset the form data
const resetForm = () => {
  document.getElementById("userName").value = "";
  document.getElementById("address").value = "";
  document.getElementById("city").value = "";
  document.getElementById("pinCode").value = "";
  document.getElementById("country").value = "";
};

// Button events
const openForm = () => {
  document.getElementById("pop-up-form").style.display = "block";
  document.getElementById("background-after-form").style.display="block";
};

const closeForm = () => {
  document.getElementById("pop-up-form").style.display = "none";
  document.getElementById("background-after-form").style.display="none";
  resetForm();
};
