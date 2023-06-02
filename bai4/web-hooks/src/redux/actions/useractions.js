import { updateUserAPI } from "api/user";
import { UPDATE_USER } from "../types/usertypes";

export const updateUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER });

    try {
      const notice = await updateUserAPI(data);
      return notice.data;
    } catch (error) {
      return error.response.data;
    }
  };
};
