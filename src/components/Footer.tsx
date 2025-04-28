import { Link } from "react-router-dom";

// assets
import logo from "@assets/images/logo.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("header");
  return (
    <>
      <div className="xl:max-w-[1200px] lg:max-w-[900px] md:px-10 p-5 lg:px-0  grid md:grid-cols-12 sm:grid-cols-2 grid-cols-1 lg:gap-x-5 md:gap-x-2 gap-1 mx-auto text-[#ffffff] md:py-10 ">
        {/* ===================== */}
        <div className="lg:col-span-1 md:col-span-2 col-span-1 md:order-1 sm:order-3 order-1 mt-10">
          <div>
            <img
              src={logo}
              alt="logo_ngaoduvietnam"
              className="w-full max-w-[92px]"
            />
          </div>
          <div className="flex gap-7 mt-7">
            <i className="ri-facebook-circle-fill"></i>
            <i className="ri-instagram-line"></i>
            <i className="ri-twitter-fill"></i>
          </div>
        </div>

        {/* =========================== */}
        <div className="xl:col-start-6 lg:col-start-5 lg:col-span-1 md:col-start-4 md:col-span-2 pt-10 md:order-2 order-1">
          <ul className="text-sm flex flex-col gap-5">
            <li>
              <Link to="/">{t("home")}</Link>
            </li>
            <li>
              <Link to="/about">{t("about")}</Link>
            </li>
            <li>
              <Link to="/tours">{t("tour")}</Link>
            </li>
            <li>
              <Link to="/hotels">{t("hotels")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("contact")}</Link>
            </li>
          </ul>
        </div>

        {/* ================================ */}
        <div className="md:col-span-2 col-span-1 pt-10 md:order-3 order-2">
          <ul className="text-sm flex flex-col gap-5">
            <li>
              <p>{t("partner")}</p>
            </li>
            <li>
              <p>{t("partner")}</p>
            </li>
            <li>
              <Link to="/policy">{t("ppolicy")}</Link>
            </li>
            <li>
              <Link to="/policy">{t("gpolicy")}</Link>
            </li>
          </ul>
        </div>

        {/* ======================================= */}
        <div className="xl:col-start-10 md:col-start-9 xl:col-span-3 md:col-span-4 col-span-1 pt-10 order-4">
          <div className="flex gap-5 mb-5">
            <i className="ri-map-pin-line"></i>
            <p>
              Lilama 10 Tower, 56 To Huu,
              <br /> Trung Van, Nam Tu Liem, Ha Noi
            </p>
          </div>
          <div className="flex gap-5">
            <i className="ri-mail-line"></i> <p>hello@adamotravel.com</p>
          </div>
        </div>
      </div>

      <div className="bg-black text-white text-center py-3 font_apercu sm:text-sm text-xs">
        Copyright © We.travel. All rights reserved
      </div>
    </>
  );
};

export default Footer;
