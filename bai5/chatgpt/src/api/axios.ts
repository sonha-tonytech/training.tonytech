import axios from "axios";


const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 15000,
});


export default instance;