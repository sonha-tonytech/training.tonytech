const readUser = () => {
  let user = {};
  user["userName"] = document.getElementById("ip_user_name").value;
  user["passWord"] = document.getElementById("ip_password").value;
  return user;
};

const viewIndexPage = async (notice) => {
  localStorage.setItem("lastname", notice.lastName);
  window.location = "/";
};

const vadidateForm = async () => {
  const userLogin = readUser();
  let msg = document.getElementById("msg_login");
  if (userLogin.userName === "" || userLogin.passWord === "") {
    msg.innerHTML = "Information cannot be blank";
  } else {
    msg.innerHTML = "";
    const notice = await loginUser(userLogin);
    typeof notice === "object"
      ? await viewIndexPage(notice)
      : (msg.innerHTML = notice);
  }
};

const main = () => {
  let form = document.getElementById("form_login");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    vadidateForm();
  });

  document.getElementById("btn_register").addEventListener("click", () => {
    form.reset();
    window.location = "/auth/register";
  });
};

main();
