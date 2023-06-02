import { useState } from "react";
import GroupInformation from "./group-information";
import AddGroupForm from "./group-add-form";
import GroupProfile from "./group-profile";

import SidebarLayout from "components/core/sidebar-layout";

import "./group.css";

const Group = (props) => {
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleOpenAddGroupForm = (isOpen) => {
    setIsAddGroupOpen(isOpen);
  };

  const handleOpenProfile = (isOpen) => {
    setIsProfileOpen(isOpen);
  };

  return (
    <div className={`group-section ${props.className || ""}`}>
        <SidebarLayout>
          <GroupInformation
            handleOpenAddGroupForm={handleOpenAddGroupForm}
            handleOpenProfile={handleOpenProfile}
          />
          {isAddGroupOpen && (
            <AddGroupForm handleOpenAddGroupForm={handleOpenAddGroupForm} />
          )}
          {isProfileOpen && (
            <GroupProfile handleOpenProfile={handleOpenProfile} />
          )}
        </SidebarLayout>
      </div>
  );
};

export default Group;
