const apiLoginUser = async (data) => {
  const res = await fetch(`http://localhost:3001/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const notice = await res.json();
  return notice;
};

const apiRegisterUser = async (data) => {
  const res = await fetch(`http://localhost:3001/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const notice = res.json();
  return notice;
};
