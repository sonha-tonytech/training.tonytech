import MessageModel, {IMessage} from "../models/message";

const getMessagesByRoomId = async (roomId: string) => {
  try {
    const data = await MessageModel.find({
      room_id: roomId,
    }).populate({ path: "room_id", select: "name" });
    return data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const createMessage = async (data: {
  room_id: string;
  question: string;
  answer: string;
}) => {
  try {
    const res = await MessageModel.create(data);    
    const resMessage = await res.populate({
      path: "room_id",
      select: "name",
    });
    return resMessage;
  } catch (error) {
    console.log(`${error}`);
  }
};

export default {
  getMessagesByRoomId,
  createMessage,
};
