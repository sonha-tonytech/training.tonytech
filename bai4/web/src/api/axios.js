import axios from "axios";
import cookies from "utils/cookies"

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 15000,
});

const request = () => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${cookies.get("token") || ""}`;

    return instance;
}

export default request;
