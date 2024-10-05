import React from "react";
import { NavLink } from "react-router-dom";
// for importing all icons having prefix vsc //
import * as Icons from "react-icons/vsc"

import { useDispatch } from "react-redux";
import {  useLocation } from "react-router";
import { matchPath } from "react-router";
 
const  SidebarLink = ({ link, iconName }) => {
    const Icon = Icons[iconName];
    if (!Icon) {
        console.error(`Icon not found for name: ${iconName}`);
        return null; // or a fallback component
      }

  // location is neede to highlight the current tab background to yellow//
  const location = useLocation();
  const dispatch = useDispatch();

  // match route is used to match current route to highlight the active tab//
  // if path matches this function returns true else false//
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <NavLink
      to={link.path}
    //   onclick={}
      className={`relative px-8 py-2 text-md font-medium text-richblack-50 ${
        matchRoute(link.path) ? "bg-yellow-700 " : "bg-opacity-0"
      } transition-all duration-200`}
    >

     {/* // this span tag will only show when match condition is true  */}
      <span
        className={`absolute left-0 top-0 h-full text-richblack-300 w-[0.15rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
       <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
}


export default SidebarLink;