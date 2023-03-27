const readUser = () => {
  let user = {};
  user["userName"] = document.getElementById("ip_user_name").value;
  user["passWord"] = document.getElementById("ip_password").value;
  return user;
};

const loginUser = async (data) => {
  const res = await fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const token = await res.json();
  return token;
};

const viewIndexPage = async (token) => {
  await fetch("http://localhost:3001/index", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  });
};

const vadidateForm = async () => {
  const userLogin = readUser();
  let msg = document.getElementById("msg_login");
  if (userLogin.userName === "" || userLogin.passWord === "") {
    msg.innerHTML = "Information cannot be blank";
  } else {
    msg.innerHTML = "";
    const token = await loginUser(userLogin);
    localStorage.setItem("token", JSON.stringify(token));
    typeof token === "object"
      ? await viewIndexPage(token)
      : (msg.innerHTML = "Invalid User");
  }
};

const main = () => {
  let form = document.getElementById("form_login");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    vadidateForm();
  });
};

main();
