import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { getRooms, addNewRoom } from "@/store/actions/roomActions";
import { setSelectedRoom } from "@/store/reducers/roomReducer";
import Input from "@/components/core/input";

type Props = {
  className?: string;
};

const SideBar = (props: Props) => {
  const rooms = useSelector((state: RootState) => state.roomReducer.rooms);
  const dispatch = useDispatch<AppDispatch>();

  const handleInputSideBar = async (content: string) => {
    dispatch(addNewRoom({ name: content }));
  };

  useEffect(() => {
    dispatch(getRooms());
  }, []);

  return (
    <div
      className={`flex flex-col px-2 bg-slate-600 text-white ${
        props.className || ""
      }`}
    >
      <div className="flex items-center py-2 w-full h-20 border-b-2 border-gray">
        <Input
          id="ip_sidebar"
          className="w-full"
          handleInputSideBar={handleInputSideBar}
        />
      </div>
      <div className="flex flex-col py-2 w-full h-full">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="px-2 py-4 hover:text-black hover:cursor-pointer hover:border-b-2 border-gray text-ellipsis whitespace-nowrap overflow-hidden"
            onClick={() => {dispatch(setSelectedRoom(room))}}
          >
            {room.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
