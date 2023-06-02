import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllGroups } from "redux/actions/groupactions";
import Button from "components/core/button";
import Input from "components/core/input";
import GroupWrapper from "components/group-wrapper";
import "./groupinformation.css";

const GroupInformation = (props) => {
  const [searchedGroups, setSearchedGroups] = useState(null);
  const groups = useSelector((reducer) => reducer.groupReducer.groups);
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenGroupForm = () => {
    props.handleOpenAddGroupForm(true);
  };

  const handleOpenProfile = () => {
    props.handleOpenProfile(true);
  };

  const handleSearchGroup = (e) => {
    if (e.key === "Enter") {
      const foundGroup = searchInput.current.returnValue();
      if (foundGroup) {
        const listGroupsAfterSearch = groups.filter((group) =>
          group.name.toUpperCase().includes(foundGroup.toUpperCase())
        );
        setSearchedGroups(listGroupsAfterSearch);
      } else setSearchedGroups(null);
    }
  };

  const handleSelectedGroup = (id) => {
    navigate(`/groups/${id}`);
  };

  useEffect(() => {
    dispatch(getAllGroups());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="col-des-12 information-group-section">
      <div className="container">
        <div className="information-group-header">
          <button className="col-des-1 toggle" onClick={handleOpenProfile}>
            <svg viewBox="0 0 100 80" width="20" height="20">
              <rect width="100" height="20" rx="15"></rect>
              <rect y="30" width="100" height="20" rx="15"></rect>
              <rect y="60" width="100" height="20" rx="15"></rect>
            </svg>
          </button>
          <Input
            ref={searchInput}
            type="search"
            className="ip-search col-des-11"
            placeholder="Search..."
            onKeyDown={handleSearchGroup}
          />
        </div>
        <GroupWrapper
          groups={searchedGroups ? searchedGroups : groups}
          handleSelectedGroup={handleSelectedGroup}
        />
        <Button className="btn-add-group" onClick={handleOpenGroupForm}>
          +
        </Button>
      </div>
    </div>
  );
};

export default GroupInformation;
