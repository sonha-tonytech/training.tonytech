import axios from "axios";
import { readCookie } from "utils/cookie";

const cookieName = "token";

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 15000,
});

const request = () => {

  const token = readCookie(cookieName);

  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return instance;
};

export default request;
