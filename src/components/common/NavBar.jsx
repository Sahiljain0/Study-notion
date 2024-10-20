import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import WalletModal from "./WalletModal";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
function Navbar() {
  const [showDropDown, setShowDropDown] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const handleWalletModal = () => {
    setIsWalletOpen(true);
  };
  const handleCloseModal = () => {
    setIsWalletOpen(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex h-14 relative items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
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
                        ) : subLinks.length ? (
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
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-6 md:flex mr-4">
          {user && user.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <button
                onClick={handleWalletModal}
                className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[14px] py-[5px] text-richblack-100 hover:bg-richblack-700 transition duration-200"
                aria-label="Open Wallet Modal"
              >
                ${user.wallet}
              </button>

              <WalletModal
                isOpen={isWalletOpen}
                onClose={handleCloseModal}
                walletBalance={user.wallet}
              />
            </>
          )}

          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl  text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[14px] py-[5px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[14px] py-[5px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <div className="mr-4 md:hidden flex justify-center items-center gap-4">
          {/* <AiOutlineMenu
            onClick={() => setShowDropDown(!showDropDown)}
            color="white"
            fontSize={24}
          /> */}
          {user && user.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <button
                onClick={handleWalletModal}
                className="rounded-[8px] border  border-richblack-700 bg-richblack-800 py-[2px] px-[14px] md:py-[5px] text-richblack-100 hover:bg-richblack-700 transition duration-200"
                aria-label="Open Wallet Modal"
              >
                ${user.wallet}
              </button>

              <WalletModal
                isOpen={isWalletOpen}
                onClose={handleCloseModal}
                walletBalance={user.wallet}
              />
            </>
          )}
          <div>
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-3xl  text-richblack-100" />
                {totalItems > 0 && (
                  <span className="absolute  animate-bounce transition-all  ease-in-out  -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
          </div>
          <button>
            <img
              src={user?.image}
              onClick={() => setShowDropDown(!showDropDown)}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[30px] rounded-full object-cover"
            />
          </button>
        </div>
      </div>
      {/* // mobile */}
      <div
        className={`w-[100vw] md:hidden p-4 h-fit bg-richblack-800 z-50 absolute top-[55px] text-white ${
          showDropDown ? "block" : "hidden"
        }  border border-white`}
      >
        <ul className="flex  flex-col w-full gap-y-2 items-center gap-x-6 text-richblack-25">
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {link.title === "Catalog" ? (
                <div>
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
                      <div className="absolute  left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        <>
                          {subLinks
                            ?.filter((subLink) => subLink?.courses?.length > 0)
                            ?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className={`rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50`}
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
                </div>
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
          {/* {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl  text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute  animate-bounce transition-all  ease-in-out  -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )} */}
          {token === null && (
            <Link to="/login">
              <button
                className={`group relative flex cursor-pointer items-center gap-1 ${
                  matchRoute("/login") ? "text-yellow-25" : "text-richblack-25"
                }`}
              >
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link
              to="/signup"
              className={`group relative flex cursor-pointer items-center gap-1 ${
                matchRoute("/signup") ? "text-yellow-25" : "text-richblack-25"
              }`}
            >
              <button>Sign up</button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
