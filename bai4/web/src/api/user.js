import request from "./axios";

export const updateUserAPI = async (data) => {
  return await request().put(`/user/${data._id}`, data);
};

export const deleteUserAPI = async (id) => {
  return await request().delete(`user/${id}`);
};
