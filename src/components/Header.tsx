import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

// asset
import logo from "@assets/images/logo.png";
import logo_black from "@assets/images/logo_black.png";
import Cookies from "js-cookie";

import { useTranslation } from "react-i18next";
import "../style/header.css";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeProvider";
import { useAuthStore } from "@/zusTand/authStore";

type TProp = { scrolling: boolean; isFixed: boolean };
const Header = ({ scrolling }: TProp) => {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const language = sessionStorage.getItem("language") || "en";
  const { i18n, t } = useTranslation("header");
  const { user } = useAuthStore();

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");

    useAuthStore.persist.clearStorage();

    window.location.reload();
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    sessionStorage.setItem("language", lang);
  };

  return (
    <>
      <div className="py-5 container_custom mx-auto flex items-center">
        <div className="mr-auto">
          <Link to="/">
            <img
              src={
                (scrolling && theme !== "dark") ||
                ((pathname.includes("/hotel/") ||
                  pathname.includes("/tour/")) &&
                  theme === "light")
                  ? logo_black
                  : logo
              }
              alt="logo"
            />
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex lg:gap-10 md:gap-5 items-center">
            <li>
              <NavLink to="/">{t("home")}</NavLink>
            </li>
            <li>
              <NavLink to="/about">{t("about")}</NavLink>
            </li>
            <li>
              <NavLink to="/tours">{t("tour")}</NavLink>
            </li>
            <li>
              <NavLink to="/hotels">{t("hotels")}</NavLink>
            </li>
            <li>
              <NavLink to="/contact">{t("contact")}</NavLink>
            </li>
            <>
              {user?.name ? (
                <>
                  <li className="bg-orange text-white px-4 py-2 rounded-full cursor-pointer relative select-none ">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <i className="ri-user-fill"></i>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 mt-5">
                        <DropdownMenuLabel>
                          {t("hello")}{" "}
                          <span className="font-bold text-base">
                            {user.name}
                          </span>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => handleLogout()}
                            className="cursor-pointer"
                          >
                            <span>{t("logout")}</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to="auth/login">{t("login")}</NavLink>
                </li>
              )}
            </>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <i className="ri-global-line text-xl"></i>
                    <span className="uppercase text-sm font-semibold">
                      {language}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32 mt-2">
                  <DropdownMenuItem
                    className={`cursor-pointer ${
                      language === "en" ? "font-bold" : ""
                    }`}
                    onClick={() => handleLanguageChange("en")}
                  >
                    <span>English</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`cursor-pointer ${
                      language === "vi" ? "font-bold" : ""
                    }`}
                    onClick={() => handleLanguageChange("vi")}
                  >
                    <span>Tiếng Việt</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <i className="ri-global-line text-xl"></i>
                          <span className="uppercase text-sm font-semibold">
                            {language}
                          </span>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-32 mt-2">
                        <DropdownMenuItem
                          className={`cursor-pointer`}
                          onClick={() => handleLanguageChange("vi")}
                        >
                          <span>Tiếng Việt</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className={`cursor-pointe`}
                          onClick={() => handleLanguageChange("en")}
                        >
                          <span>English</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
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
                  {user?.name ? (
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
