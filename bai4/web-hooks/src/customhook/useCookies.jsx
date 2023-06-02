import { useState } from "react";

export const useCookies = () => {
  const readCookie = (cookieName) => {
    const cookies = document.cookie.split(";");
    const foundCookie = cookies.find(
      (cookie) => cookie.slice(0, cookieName.length) === cookieName
    );
    if (foundCookie) {
      return foundCookie.slice(cookieName.length + 1);
    }
    return null;
  };

  const [cookie, setCookie] = useState({
    token: readCookie("token"),
  });

  const saveCookie = (cookieName, cookieValue) => {
    document.cookie = `${cookieName}=${cookieValue}; path="/"`;

    setCookie({
      ...cookie,
      [cookieName]: cookieValue,
    });
  };
  const removeCookie = (cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path="/"`;

    setCookie({
      ...cookie,
      [cookieName]: readCookie(cookieName),
    });
  };

  return { cookie, saveCookie, removeCookie };
};
