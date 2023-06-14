import RoomModel from "../models/room";

const getAllRooms = async () => {
  try {
    const allGroups = await RoomModel.find({}, "name");    
    return allGroups;
  } catch (error) {
    console.log(`${error}`);
  }
};

const createRoom = async (data: { name: string }) => {
  try {
    const res = await RoomModel.create({ name: data.name });
    return res;
  } catch (error) {
    console.log(`${error}`);
  }
};


export default{ 
    getAllRooms,
    createRoom
}