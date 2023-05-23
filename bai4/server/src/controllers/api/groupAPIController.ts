import { Request, Response, NextFunction } from "express";
import GroupService from "../../service/groupService";
import UserService from "../../service/userService";

export interface CustomRequest extends Request {
  user: Object;
}

export interface Object {
  id: string;
  user_id: object;
  name: string;
}

const apiGetAllGroups = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const groups = await GroupService.getAllGroups(req.user.id);
    if (!Array.isArray(groups))
      return res.status(404).json("Error 404: Do not find data");
    const newListGroups = groups.map((group) => ({
      _id: group._id,
      name: group.name,
      owner: group.owner,
      type: group.type,
      members: group.members,
    }));
    res.status(200).json(newListGroups);
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiGetGroupsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const groups = await GroupService.getGroupsByOwner(userId);
    groups
      ? res.status(200).json(groups)
      : res.status(404).json("Error 404: Do not find data");
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiGetGroupById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const groupFind = await GroupService.getGroupById(id);
    groupFind ? res.status(200).json(groupFind) : res.status(404).json(null);
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiCreateNewGroup = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = {
      name: req.body.name,
      owner: req.user.id,
    };

    const newGroup = await GroupService.createGroup(data);
    if (Object.values(newGroup).length) {
      const resGroup = await GroupService.getGroupById(newGroup._id);
      if (Object.values(resGroup).length) {
        return res.status(200).json(resGroup);
      }
    }
    res.status(400).json("Group could not create");
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiUpdateGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = {
      _id: req.params.id,
      name: req.body.name,
      members: req.body.members,
    };
    const updatedGroup = await GroupService.updateGroup(data);
    updatedGroup
      ? res.status(200).json("Success")
      : res.status(400).json("Group could not be updated");
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiDeleteGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const deletedGroup = await GroupService.deleteGroup(id);
    deletedGroup
      ? res.status(200).json("Success")
      : res.status(400).json("Group could not be deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiAddNewUserInGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userFind = await UserService.getUserbyUserName(req.body.userName);    
    if (userFind) {
      const groupFind = await GroupService.getGroupByIdForAddUser(req.params.id);      
      if (groupFind) {  
        if (groupFind.members.some((user) => String(user.user_id) === String(userFind._id))) {
          return res.status(200).json("User has already in group");
        } else {
          groupFind.members.push({ user_id: userFind._id });
          const updatedGroup = await GroupService.updateGroup(groupFind);
          if (updatedGroup) {
            const resUser = {
              _id: userFind._id,
              username: userFind.userName,
              name: userFind.name,
            };
            return res.status(200).json(resUser);
          }
          return res.status(400).json("Could not be add user in group");
        }
      }
    }
    res.status(200).json("Invalid User");
  } catch (error) {
    res.status(500).json(error);
  }
};

export default {
  apiGetAllGroups,
  apiGetGroupsByUserId,
  apiGetGroupById,
  apiCreateNewGroup,
  apiUpdateGroup,
  apiDeleteGroup,
  apiAddNewUserInGroup,
};
