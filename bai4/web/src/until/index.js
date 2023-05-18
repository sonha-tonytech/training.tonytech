import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 5000,
});

export { cookies, instance };
