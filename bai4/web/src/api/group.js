import request from "./axios";

export const getGroupsAPI = async () => {
  return await request().get("/groups");
};

export const getGroupByIdAPI = async (id) => {
  return await request().get(`/groups/${id}`);
};

export const addNewGroupAPI = async (data) => {
  return await request().post("/groups", data);
};

export const updateGroupAPI = async (data) => {
  return await request().put(`/groups/${data._id}`, data);
};

export const deleteGroupAPI = async (id) => {
    return await request().delete(`/groups/${id}`);
}

export const addUserInGroupAPI = async (idGroup,data) => {
  return await request().post(`/groups/${idGroup}/user`,data);
}