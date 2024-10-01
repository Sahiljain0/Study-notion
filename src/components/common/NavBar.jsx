import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { matchPath } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
const NavBar = () => {

  // fetching value of state from slices //

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.cart);




  // location //
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
           {
            user && user?.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className="relative">
                <FaCartPlus  size={24} color="yellow"/>
                {
                  totalItems > 0 && (
                    <span className="text-white bg-richblack-800 p-1 text-xs flex justify-center items-center font-medium rounded-full">
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
           }

           {/* // when token is null show login, signup buttons // */}
           {
            token === null && (
              <Link to='/login'>
              <button className="bg-richblack-700  p-1 px-4 font-semibold text-richblack-200 rounded-md">
                Login</button>
              </Link>
            )
           }
            {
            token === null && (
              <Link to='/signup'>
              <button className="bg-richblack-700 p-1 px-4 font-semibold text-richblack-200 rounded-md">
              Signup</button>
              </Link>
            )
           }
           {/* // when token is having some value show profile menu */}
           {
            token !== null && <ProfileDropDown/>
           }

        </div>
      </div>
    </div>
  );
};

export default NavBar;
