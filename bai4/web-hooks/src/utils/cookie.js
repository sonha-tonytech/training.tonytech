export const readCookie = (cookieName) => {
  const cookies = document.cookie.split(";");
  const foundCookie = cookies.find(
    (cookie) => cookie.slice(0, cookieName.length) === cookieName
  );
  if (foundCookie) {
    return foundCookie.slice(cookieName.length + 1);
  }
  return null;
};

export const saveCookie = (cookieName, cookieValue) => {
  document.cookie = `${cookieName}=${cookieValue}; path="/"`;
};

export const removeCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path="/"`;
};
