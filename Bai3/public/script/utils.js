const getPageNumberUsers = (listUsers, rowNumber) => {
  return Math.ceil(listUsers.length/ rowNumber);
}

const cutString = (id,str) => {
    return id.slice(str.length);
}
