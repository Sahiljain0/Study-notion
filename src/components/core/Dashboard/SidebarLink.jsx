import React from "react";

// for importing all icons having prefix vsc //
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];

  // location is neede to highlight the current tab background to yellow//
  const location = useLocation();
  const dispatch = useDispatch();

  // match route is used to match current route to highlight the active tab//
  // if path matches this function returns true else false//
  const matchRoute = (route) => {
    return matchRoute({ path: route }, location.pathname);
  };
  return (
    <NavLink
      to={link.path}
      onclick={matchRoute}
      className={`relative px-8 py-2 text-sm font-medium  ${
        matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"
      } transition-all duration-200`}
    >

     {/* // this span tag will only show when match condition is true  */}
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
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
};

export default SidebarLink;
