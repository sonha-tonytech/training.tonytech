import { Request, Response, NextFunction } from "express";
import * as GroupService from "../../service/groupService";
import * as MessageService from "../../service/messageService";

export interface CustomRequest extends Request {
  user: Object;
}

export interface Object {
  id: string;
}

const apiGetAllMessages = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const messages = await MessageService.getAllMessages();
    if (!Array.isArray(messages)) {
      res.status(404).json("Error 404: Do not find data");
    }
    const newListMessages = messages.map((message) => ({
      _id: message._id,
      group_id: message.group_id,
      user_id: message.user_id,
      message: message.message,
      createdAt: message.createdAt
    }));
    res.status(200).json(newListMessages);
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiGetMessageById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const messageId = req.params.id;
    const messages = await MessageService.getMessageById(messageId);
    messages
      ? res.status(200).json(messages)
      : res.status(404).json("Error 404: Do not find data");
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiGetMessagesByGroupId = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {        
    const groupId = req.params.id;    
    const messages = await MessageService.getMessagesByGroupId(groupId);        
    messages
      ? res.status(200).json(messages)
      : res.status(404).json(null);
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiCreateNewMessage = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {    
    const data = {
      groupId: req.body.group_id,
      userId: req.user.id,
      message: req.body.message,
    };
    const newMessage = await MessageService.createMessage(data);
    !Object.values(newMessage).length
      ? res.status(400).json(null)
      : res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiUpdateMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = {
      _id: req.params.id,
      message: req.body.message,
    };
    const updatedMessage = await MessageService.updateMessage(data);
    updatedMessage
      ? res.status(200).json("Success")
      : res.status(400).json("Message could not be updated");
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiDeleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const deletedMessage = await MessageService.deleteMessage(id);
    deletedMessage
      ? res.status(200).json("Success")
      : res.status(400).json("Message could not be deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export default {
  apiGetAllMessages,
  apiGetMessageById,
  apiGetMessagesByGroupId,
  apiCreateNewMessage,
  apiUpdateMessage,
  apiDeleteMessage,
};
