// import React from "react";
// import { NavLink } from "react-router-dom";
// // for importing all icons having prefix vsc //
// import * as Icons from "react-icons/vsc"

// import { useDispatch } from "react-redux";
// import {  useLocation } from "react-router";
// import { matchPath } from "react-router";

// const  SidebarLink = ({ link, iconName }) => {
//     const Icon = Icons[iconName];
//     if (!Icon) {
//         console.error(`Icon not found for name: ${iconName}`);
//         return null; // or a fallback component
//       }

//   // location is neede to highlight the current tab background to yellow//
//   const location = useLocation();
//   const dispatch = useDispatch();

//   // match route is used to match current route to highlight the active tab//
//   // if path matches this function returns true else false//
//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname);
//   };
//   return (
//     <NavLink
//       to={link.path}
//     //   onclick={}
//       className={`relative px-8 py-2 text-sm font-medium text-richblack-200 ${
//         matchRoute(link.path) ? "bg-yellow-700 " : "bg-opacity-0"
//       } transition-all duration-200`}
//     >

//      {/* // this span tag will only show when match condition is true  */}
//       <span
//         className={`absolute left-0 top-0 h-full text-richblack-300 w-[0.15rem] bg-yellow-50 ${
//           matchRoute(link.path) ? "opacity-100" : "opacity-0"
//         }`}
//       ></span>
//        <div className="flex items-center gap-x-2">
//         {/* Icon Goes Here */}
//         <Icon className="text-lg" />
//         <span>{link.name}</span>
//       </div>
//     </NavLink>
//   );
// }

// export default SidebarLink;
import React from "react";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import { setEditCourse } from "../../../Redux/slices/courseSlice";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={` py-2 px-4 relative md:px-8 md:py-2 text-sm font-medium transition-all duration-300 ${
        matchRoute(link.path) ? "text-yellow-400" : "bg-opacity-0"
      }`}
    >
      <div
        className="flex item-center  gap-x-2 flex-col md:flex-row"
        onClick={() => {
          dispatch(setEditCourse(false));
        }}
      >
        <Icon className="md:text-lg text-3xl " />
        <span className="hidden md:block">{link.name}</span>
        <span
          className={`absolute bottom-0 left-0 md:top-0 h-[0.2rem] w-full md:h-full md:w-[0.2rem] bg-yellow-50 opacity-0 transition-all duration-300
                  ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
        ></span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
