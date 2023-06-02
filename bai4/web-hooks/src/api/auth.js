import request from "./axios";

export const loginAPI = async (data) => {
  return await request().post("/auth/login", data);
};

export const registerAPI = async (data) => {
  return await request().post("/auth/register", data);
};

export const getProfileAPI = async () => {
  return await request().get("/auth/profile");
};
