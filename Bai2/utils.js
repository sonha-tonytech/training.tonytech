const randomId = () => {
  return Math.random() * 90000000;
};

const getPageNumberUsers = (listUsers, rowNumber) => {
  return Math.ceil(listUsers.length/ rowNumber);
}

const cutString = (id,str) => {
    return Number(id.slice(str.length));
}
