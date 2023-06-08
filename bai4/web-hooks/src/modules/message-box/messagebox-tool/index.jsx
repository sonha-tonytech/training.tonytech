import { useSelector, useDispatch } from "react-redux";
import { addNewMessage, deleteMessage } from "redux/actions/messageActions";
import MessageSelection from "components/message-selection";
import SendMessageBox from "components/message-sendbox";

const MessageBoxTool = (props) => {
  const userLogin = useSelector((reducer) => reducer.authReducer.userLogin);
  const dispatch = useDispatch();

  const closeMessageSelection = () => {
    props.handleSelectMessage(false);
    props.handleSelectedMessages([]);
  };

  const handleAddMessage = (data) => {
    const newMessage = {
      group_id: props.selectedGroup._id,
      message: data,
    };
    dispatch(addNewMessage(newMessage));
  };
  const handleDeleteMessage = () => {
    if (
      userLogin._id === props.selectedGroup.owner._id ||
      props.selectedMessages.every(
        (message) => message.user_id._id === userLogin._id
      )
    ) {
      props.selectedMessages.forEach((selectedMessage) => {
        dispatch(deleteMessage(selectedMessage._id));
      });
      props.handleSelectMessage(false);
      props.handleSelectedMessages([]);
    }
  };

  return (
    <div className="col-des-12 message-tool">
      {props.isMessageSelect ? (
        <MessageSelection
          selectedMessages={props.selectedMessages}
          userLogin={userLogin}
          selectedGroup={props.selectedGroup}
          closeMessageSelection={closeMessageSelection}
          handleDeleteMessage={handleDeleteMessage}
        />
      ) : (
        <SendMessageBox handleAddMessage={handleAddMessage} />
      )}
    </div>
  );
};

export default MessageBoxTool;
