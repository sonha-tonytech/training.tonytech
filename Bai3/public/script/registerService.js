// Add new user
const addContact = async (data) => {
  const  res = await fetch("http://localhost:3001/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const notice = res.json();
  return notice;
};
