import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

// asset
import logo from "@assets/images/logo.png";
import logo_black from "@assets/images/logo_black.png";
import Cookies from "js-cookie";

import "../style/header.css";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/app";
import { removeAuth } from "@/features/auth/authSlice";

type TProp = { scrolling: boolean; isFixed: boolean };
const Header = ({ scrolling, isFixed }: TProp) => {
  const [isOpen, setIsOpen] = useState(false);

  const {name} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("name");

    dispatch(removeAuth({}));
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
                    className="bg-orange text-white px-4 py-2 rounded-full cursor-pointer relative select-none "
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <i className="ri-user-fill"></i>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 mt-5">
                        <DropdownMenuLabel>
                          Hello{" "}
                          <span className="font-bold text-base">{name}</span>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => handleLogout()} className="cursor-pointer">
                            <span>
                              Đăng xuất
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
