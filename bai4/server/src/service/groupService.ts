import GroupModel from "../models/groups";

const getAllGroups = async (id: string) => {
  try {
    const allGroups = await GroupModel.find(
      {
        "members.user_id": id,
        isActived: true,
      },
      "_id name owner members"
    )
      .populate({ path: "owner", select: "userName name" })
      .populate({ path: "members.user_id", select: "userName name" });
    return allGroups;
  } catch (error) {
    console.log(`Could not fetch groups ${error}`);
  }
};

const getGroupsByOwner = async (userId: string) => {
  try {
    const groupsByUserId = await GroupModel.find({
      owner: userId,
      isActived: true,
    })
      .populate({ path: "owner", select: "userName name" })
      .populate({ path: "members.user_id", select: "userName name" });
    const data = groupsByUserId.length > 0 ? groupsByUserId : null;
    return data;
  } catch (error) {
    console.log(`Could not find users ${error}`);
  }
};

const getGroupById = async (groupId: string) => {
  try {
    const groupById = await GroupModel.findById(
      {
        _id: groupId,
      },
      "_id name owner members"
    )
      .populate({ path: "owner", select: "userName name" })
      .populate({ path: "members.user_id", select: "userName name" });
    return groupById;
  } catch (error) {
    console.log(`Could not find group ${error}`);
  }
};

const getGroupByIdForAddUser = async (groupId: string) => {
  try {
    const groupById = await GroupModel.findById(
      {
        _id: groupId,
      },
      "_id name members"
    )
    return groupById;
  } catch (error) {
    console.log(`Could not find group ${error}`);
  }
};

const createGroup = async (data: { name: string; owner: string }) => {
  try {
    const newGroup = {
      name: data.name,
      type: "group",
      owner: data.owner,
      members: [{ user_id: data.owner }],
      isActived: true,
    };
    const res = await GroupModel.create(newGroup);
    return res;
  } catch (error) {
    console.log(`Could not add new group ${error}`);
  }
};

const updateGroup = async (data: {
  _id: string;
  name: string;
  members: Array<{ user_id: string }>;
}) => {
  try {
    const groupById = await GroupModel.findById({ _id: data._id });
    if (groupById) {
      const updatedGroup = await GroupModel.updateOne(
        { _id: data._id },
        { name: data.name, members: data.members }
      );
      const result = updatedGroup.modifiedCount === 1 ? true : false;
      return result;
    }
    return false;
  } catch (error) {
    console.log(`Could not update group ${error}`);
  }
};

const deleteGroup = async (groupId: string) => {
  try {
    const deletedGroup = await GroupModel.updateOne(
      { _id: groupId },
      { isActived: false }
    );
    const result = deletedGroup.modifiedCount === 1 ? true : false;
    return result;
  } catch (error) {
    console.log(`Could not delete group ${error}`);
  }
};

export default {
  getAllGroups,
  getGroupsByOwner,
  getGroupById,
  getGroupByIdForAddUser,
  createGroup,
  updateGroup,
  deleteGroup,
};
