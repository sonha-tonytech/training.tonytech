import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addNewGroup } from "redux/actions/groupActions";
import Button from "components/core/button";
import Input from "components/core/input";
import "./groupaddform.css";

const AddGroupForm = (props) => {
  const addGroupInput = useRef(null);
  const dispatch = useDispatch();

  const handleTurnBack = () => {
    props.handleOpenAddGroupForm(false);
  };

  const handleSubmit = async (e) => {
    if (e.type === "click" || e.key === "Enter") {
      const groupName = addGroupInput.current.returnValue();
      if (groupName) {
        dispatch(addNewGroup(groupName));
        props.handleOpenAddGroupForm(false);
        addGroupInput.current.resetValue();
      }
    }
  };

  return (
    <div className="col-des-12 add-group-section">
      <div className="container">
        <div className="sidebar-add-group-section">
          <div className="sidebar-add-group-title">
            <button className="col-des-1 toggle" onClick={handleTurnBack}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <h2 className="col-des-10">New Group</h2>
          </div>
          <Input
            className="col-des-12"
            type="text"
            placeholder="Group Name"
            ref={addGroupInput}
            onKeyDown={handleSubmit}
          />
        </div>
        <Button className="btn-submit-add-group" onClick={handleSubmit}>
          +
        </Button>
      </div>
    </div>
  );
};

export default AddGroupForm;
