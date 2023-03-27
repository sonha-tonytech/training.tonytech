//Get user by username
const getUserByName = async (userName) => {
  const res = await fetch(`http://localhost:3001/api/register/${userName}`, {
    method: "GET",
  });
  const user = await res.json();
  return user;
};

// Get last user in Database
const getLastUser = async () => {
  const res = await fetch(`http://localhost:3001/api/register`, {
    method: "GET",
  });
  const user = await res.json();
  return user;
};

// Add new token
const addToken = async (data) => {
  const res = await fetch("http://localhost:3001/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const token = res.json();
  return token;
};

// Add new user
const addContact = async (token) => {
  await fetch("http://localhost:3001/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  });
};
