// import React, { useState } from "react";
// import { sidebarLinks } from "../../../data/dashboard-links";
// import { logout } from "../../../services/operations/authAPI";
// import { useDispatch, useSelector } from "react-redux";
// import  SidebarLink from "./SidebarLink";
// import { useNavigate } from "react-router";
// import {VscSignOut} from "react-icons/vsc";
// import ConfirmationModal from "../../common/ConfirmationModal";
// const Sidebar = () => {
//   // tracking logout confirmation modal open/close state//
//   const [confirmationModal, setConfirmationModal] = useState(null);

//   const { loading: profileLoading } = useSelector((state) => state.auth);
//   const {user} = useSelector((state) => state.profile);
//   const { loading: authLoading } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   if (authLoading || profileLoading) {
//     return (
//       <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
//         <div>Loading...</div>
//       </div>
//     );
//   }
//   return (
//     <>
//       <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
//         <div className="flex flex-col">
//         {sidebarLinks.map((link) => {
//             if (link.type && user?.accountType !== link.type) return null
//             return (
//               <SidebarLink key={link.id} link={link} iconName={link.icon} />
//             )
//           })}
//         </div>
//         <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-300" />
//         <div className="flex flex-col">
//           <SidebarLink
//             link={{ name: "Settings", path: "dashboard/settings" }}
//             iconName="VscGear"
//             className="text-richblack-300 "
//           />
//           {/* // logout button // */}
//           <button
//             onClick={() =>
//               setConfirmationModal({
//                 text1: "Are you sure?",
//                 text2: "You will be logged out of your account.",
//                 btn1Text: "Logout",
//                 btn2Text: "Cancel",
//                 btn1Handler: () => dispatch(logout(navigate)),
//                 btn2Handler: () => setConfirmationModal(null),
//               })
//             }

//             className="px-8 py-2 text-sm font-medium text-richblack-200"
//           >
//             <div className="flex items-center gap-x-2"
//             >
//               <VscSignOut className="text-lg" />
//               <span>Logout</span>
//             </div>
//           </button>
//         </div>
//       </div>
//     {/* //  confirmationModal state variable is passed as a props to ConfirmationModal component  // */}
//     {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   );
// };
// export default Sidebar;
import React, { useState } from "react";

import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";
import { setCourse, setStep } from "../../../Redux/slices/courseSlice";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return <div className="mt-10">Loading...</div>;
  }

  return (
    <div className=" text-white bg-richblack-800">
      <div
        className="hidden min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 lg:flex
        h-[calc[100vh-3.5rem)] bg-richblack-800 py-10"
      >
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>

        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are You Sure ?",
                text2: "You will be logged out of your Account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="text-sm font-medium text-richblack-300 mx-4 my-4"
          >
            <div className="flex items-center gap-x-2 p-4">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {/* mobile sidebar */}
      <div className="flex lg:hidden rounded-t-xl border-t-[0.01px] border-richblack-200 fixed bottom-0 justify-between items-center px-4 py-3 bg-richblack-900 z-50 w-full">
        <div className="flex flex-row gap-1 w-full justify-between">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
          <SidebarLink
          
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
        </div>
      </div>
     


      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
