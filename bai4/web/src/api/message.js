import request from "./axios";

export const getMessageByIdAPI = async (id) => {
  return await request().get(`/messages/${id}`);
};

export const getMessagesByGroupIdAPI = async (id) => {
  return await request().get(`/groups/${id}/messages`);
};

export const addNewMessageAPI = async (data) => {
  return await request().post("/messages", data);
};

export const updateMessageAPI = async (data) => {
  return await request().put(`/messages/${data.id}`, data);
};

export const deleteMessageAPI = async (id) => {
  return await request().delete(`/messages/${id}`);
};
