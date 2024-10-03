import React  from "react";
import { Link } from "react-router-dom";
import image from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { matchPath } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs"
import { useState, useEffect } from "react";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

const NavBar = () => {

  // fetching value of state from slices //

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])



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
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : (subLinks && subLinks.length) ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
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
           {/* {
            token !== null && <ProfileDropdown/>
           } */}

        </div>
      </div>
    </div>
  );
};

export default NavBar;
