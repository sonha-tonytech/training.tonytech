import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { getMessages, addNewMessage } from "@/store/actions/messageActions";
import Input from "@/components/core/input";
import Button from "@/components/core/button";

type Props = {
  className?: string;
};

const ContentBox = (props: Props) => {
  const selectedRoom = useSelector(
    (state: RootState) => state.roomReducer.room
  );
  const messages = useSelector(
    (state: RootState) => state.messageReducer.messages
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isAddNewMessage, setIsAddNewMessage] = useState(false);

  const handleInputContentBox = (content: string) => {
    dispatch(addNewMessage({ room_id: selectedRoom._id, question: content }));
  };

  useEffect(() => {
    if (selectedRoom._id) {
      dispatch(getMessages(selectedRoom._id));
    }
  }, [selectedRoom._id]);

  return (
    <div className={`relative ${props.className || ""}`}>
      {messages.map((message) => (
        <div key={message._id}>
          <div className="p-10 bg-slate-100">{message.question}</div>
          <div className="p-10">{message.answer}</div>
        </div>
      ))}
      <div className="absolute flex justify-center w-full h-10 bottom-20">
        <Input
          id="ip_content"
          className="border-2 w-3/5"
          handleInputContentBox={handleInputContentBox}
          isAddNewMessage={isAddNewMessage}
          setIsAddNewMessage={setIsAddNewMessage}
        />
        <Button
          className="ml-2"
          onClick={() => {
            setIsAddNewMessage(true);
          }}
        />
      </div>
    </div>
  );
};

export default ContentBox;
