import { Request, Response, NextFunction } from "express";
import * as GroupService from "../../service/groupService";

export interface CustomRequest extends Request {
  user: Object;
}

export interface Object {
  id: string;
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
    const groups = await GroupService.getGroupsByUserId(userId);
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
  } catch (error) {}
};

export default {
  apiGetAllGroups,
  apiGetGroupsByUserId,
  apiGetGroupById,
  apiCreateNewGroup,
  apiUpdateGroup,
  apiDeleteGroup,
};
