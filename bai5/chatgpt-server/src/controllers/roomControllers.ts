import { Request, Response, NextFunction } from "express";
import RoomServices from "../services/roomServices";

const apiGetAllRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groups = await RoomServices.getAllRooms();    
    if (!Array.isArray(groups))
      return res.status(404).json("Error 404: Do not find data");
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json(error);
  }
};
const apiCreateNewRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = {
      name: req.body.name,
    };
    const newRoom = await RoomServices.createRoom(data);
    if (Object.values(newRoom).length) {
      return res.status(200).json(newRoom);
    }
    res.status(400).json("Group could not create");
  } catch (error) {
    res.status(500).json(error);
  }
};

export default {
  apiGetAllRooms,
  apiCreateNewRoom,
};
