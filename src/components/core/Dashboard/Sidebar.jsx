import React from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector((state) => state.auth);
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (authLoading || profileLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
            {
                sidebarLinks.map((link,index) => {
                    if(link.type && user.accountType !== link.type) return null;
                    return(
                        <SidebarLink link={link} iconName={link.icon}/>
                    )
                })
            }
        </div>
      </div>
    </>
  );
};
export default Sidebar;
