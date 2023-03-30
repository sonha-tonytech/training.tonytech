const readContact = () => {
  let formData = {};
  formData["index"] = 1;
  formData["userName"] = document.getElementById("ip_user_name").value;
  formData["passWord"] = document.getElementById("ip_password").value;
  formData["email"] = document.getElementById("ip_email").value;
  formData["firstName"] = document.getElementById("ip_firstname").value;
  formData["lastName"] = document.getElementById("ip_lastname").value;
  formData["country"] = document.getElementById("ip_country").value;
  formData["selected"] = false;
  return formData;
};

const vadidateForm = async () => {
  const formData = readContact();
  let msg = document.getElementById("msg_register");
  const rePassword = document.getElementById("ip_repeat_password").value;
  if (
    formData.userName === "" ||
    formData.passWord === "" ||
    formData.email === "" ||
    formData.firstName === "" ||
    formData.firstName === "" ||
    formData.lastName === "" ||
    formData.country === ""
  ) {
    msg.innerHTML = "Information cannot be blank";
  } else if (rePassword !== formData.passWord) {
    msg.innerHTML = "Your repeat password is wrong";
  } else {
    const notice = await addContact(formData);
    console.log(notice);
    if (notice === "Success") {
      alert("Sign up user successfully!");
      window.location = "/login";
    } else {
      msg.innerHTML = notice;
    }
  }
};

const main = async () => {
  const form = document.getElementById("form_register");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    vadidateForm();
  });

  document.getElementById("btn_login").addEventListener("click", () => {
    form.reset();
    window.location = "/login";
  });
};

main();
