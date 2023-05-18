import MessageModel from "../models/messages";
import { getHourAndMinute } from "../until";

const getAllMessages = async () => {
  try {
    const allMessages = await MessageModel.find({ isActived: true });
    const data = allMessages.length > 0 ? allMessages : null;
    return data;
  } catch (error) {
    console.log(`Could not fetch messages ${error}`);
  }
};

const getMessagesByGroupId = async (groupId: string) => {
  try {
    const messagesByGroupId = await MessageModel.find({
      group_id: groupId,
      isActived: true,
    })
      .populate({ path: "group_id", select: "name" })
      .populate({ path: "user_id", select: "userName name" });
    const data = messagesByGroupId.map((message) => ({
      _id: message._id,
      group_id: message.group_id,
      user_id: message.user_id,
      message: message.message,
      createdAt: getHourAndMinute(message.createdAt),
    }));
    return data;
  } catch (error) {
    console.log(`Cound not find messages ${error}`);
  }
};

const getMessageById = async (messageId: string) => {
  try {
    const messageById = await MessageModel.findById({ _id: messageId });
    const data = messageById ? messageById : null;
    return data;
  } catch (error) {
    console.log(`Could not find message ${error}`);
  }
};

const createMessage = async (data: {
  groupId: string;
  userId: string;
  message: string;
}) => {
  try {
    const newMessage = {
      group_id: data.groupId,
      user_id: data.userId,
      message: data.message,
      isActived: true,
    };
    const res = await MessageModel.create(newMessage);
    const populatedMessage = await res.populate({
      path: "user_id",
      select: "userName name",
    });
    const resMessage = {
      _id: populatedMessage._id,
      group_id: populatedMessage.group_id,
      user_id: populatedMessage.user_id,
      message: populatedMessage.message,
      createdAt: getHourAndMinute(populatedMessage.createdAt),
    };
    return resMessage;
  } catch (error) {
    console.log(`Could not add new message ${error}`);
  }
};

const updateMessage = async (data: { _id: string; message: string }) => {
  try {
    const messageById = await MessageModel.findById({ _id: data._id });
    if (messageById) {
      const updatedMessage = await MessageModel.updateOne(
        { _id: data._id },
        { message: data.message }
      );
      const result = updatedMessage.modifiedCount === 1 ? true : false;
      return result;
    }
    return false;
  } catch (error) {
    console.log(`Could not update message ${error}`);
  }
};

const deleteMessage = async (messageId: string) => {
  try {
    const deletedMessage = await MessageModel.updateOne(
      { _id: messageId },
      { isActived: false }
    );
    const result = deletedMessage.modifiedCount === 1 ? true : false;
    return result;
  } catch (error) {}
};

export {
  getAllMessages,
  getMessagesByGroupId,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};
