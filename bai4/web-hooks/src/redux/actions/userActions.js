import { UPDATE_USER } from "../types/userTypes";

export const updateUser = (data, callback) => ({
  type: UPDATE_USER,
  payload: { data, callback },
});
