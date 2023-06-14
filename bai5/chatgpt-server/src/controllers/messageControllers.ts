import { Request, Response, NextFunction } from "express";
import MessageServices from "../services/messageServices";
import { getAnswerFromOpenAPI } from "../utils/createMessage";


const apiGetMessagesByGroupId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roomId = req.params.id;
    const messages = await MessageServices.getMessagesByRoomId(roomId);
    messages ? res.status(200).json(messages) : res.status(404).json(null);
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiCreateNewMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const messagesById = await MessageServices.getMessagesByRoomId(req.body.room_id);
    // const questionsById = messagesById.map(message => (message.question));
    // questionsById.push(req.body.question);
    
    const room_id = JSON.stringify(req.body.room_id);    
    const question = JSON.stringify(req.body.question);
    const answer = await getAnswerFromOpenAPI(req.body.question);
        
    const data = {
      room_id: room_id.slice(1,room_id.length-1),
      question: question.slice(1,question.length-1),
      answer: answer,
    };
    const newMessage = await MessageServices.createMessage(data);
    !Object.values(newMessage).length
      ? res.status(400).json(null)
      : res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default {
  apiGetMessagesByGroupId,
  apiCreateNewMessage,
};
