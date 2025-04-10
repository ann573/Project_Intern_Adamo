import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

// asset
import logo from "@assets/images/logo.png";
import logo_black from "@assets/images/logo_black.png";
import Cookies from "js-cookie";

import "../style/header.css";
const Header = ({ scrolling, isFixed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMore, setIsOpenMore] = useState(false);

  const name = Cookies.get("name");

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("name");
    window.location.reload();
  };

  return (
    <>
      <div className="py-5 container_custom mx-auto flex items-center">
        <div className="mr-auto">
          <Link to="/">
            <img src={scrolling || isFixed ? logo_black : logo} alt="logo" />
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex lg:gap-10 md:gap-5 items-center">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/tours">Tours</NavLink>
            </li>
            <li>
              <NavLink to="/hotels">Hotels</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <>
              {name ? (
                <>
                  <li
                    className="bg-orange text-white px-4 py-2 rounded-full cursor-pointer relative select-none"
                    onClick={() => setIsOpenMore(!isOpenMore)}
                  >
                    Hello {name}
                    {isOpenMore && (
                      <div className="relative">
                        <div
                          className="bg-white absolute text-black top-5 left-0 w-full py-1 px-2 arrow-box rounded-lg hover:opacity-80"
                          onClick={() => handleLogout()}
                        >
                          Đăng xuất
                        </div>
                      </div>
                    )}
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to="auth/login">Login</NavLink>
                </li>
              )}
            </>
          </ul>
        </nav>

        {/* Icon menu  */}
        <div className="md:hidden block">
          <i
            className="ri-menu-line text-2xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          ></i>
        </div>

        {/* overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-full bg-black z-40"
              onClick={() => setIsOpen(false)}
            ></motion.div>
          )}
        </AnimatePresence>

        {/* Menu mobile  */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 w-[200px] h-full bg-white shadow-lg flex flex-col items-center pt-20 z-50"
            >
              <i
                className="ri-close-line text-3xl absolute top-5 right-5 cursor-pointer text-black"
                onClick={() => setIsOpen(false)}
              ></i>
              <nav>
                <ul className="flex flex-col gap-5 text-lg text-black ">
                  <li>
                    <NavLink to="/" onClick={() => setIsOpen(false)}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" onClick={() => setIsOpen(false)}>
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/tours" onClick={() => setIsOpen(false)}>
                      Tours
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/hotels" onClick={() => setIsOpen(false)}>
                      Hotels
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" onClick={() => setIsOpen(false)}>
                      Contact
                    </NavLink>
                  </li>
                  {name ? (
                    <Link to={"/auth/login"}>
                      <span>Log out</span>
                    </Link>
                  ) : (
                    <li>
                      <NavLink to="/login" onClick={() => setIsOpen(false)}>
                        Login
                      </NavLink>
                    </li>
                  )}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Header;
