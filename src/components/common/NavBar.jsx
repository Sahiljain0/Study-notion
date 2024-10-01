import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { matchPath } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="w-full justify-center items-center h-14 border-b-[1px] border-richblack-700 flex">
      <div className="flex w-11/12 justify-between max-w-maxContent ">
        {/* // logo image // */}
        <Link to="/">
          <img src={image} width={160} height={42} loading="lazy" />
        </Link>

        {/* // NAvlinks  */}
        <nav>
          <ul className="flex gap-x-6  font-semibold text-md text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div></div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-50"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ******************************************* */}
        {/* // login, signup, dashboard buttons // */}
        <div className="flex items-center  gap-x-6 text-white">
            <Link to="/signup">
            <button>Signup</button>
            </Link>
            <Link to="/signup">
            <button>Signup</button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
