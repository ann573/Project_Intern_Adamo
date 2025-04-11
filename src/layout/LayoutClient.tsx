import React, { useEffect, useState } from "react";
import { Outlet,useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LayoutClient = () => {
  const [scrolling, setScrolling] = useState(false);
  const isFixed  = useLocation().pathname.includes("tour/");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`${!isFixed ? "fixed left-0 right-0": ""} z-30 transition-colors ${
          scrolling || isFixed  ? `text-heading bg-white border border-sub-color-second` : `text-white bg-transparent`
        } `} 
      >
        <Header scrolling={scrolling} isFixed={isFixed} />
      </header>
      <Outlet />
      <footer className="bg-heading">
        <Footer />
      </footer>

    </>
  );
};

export default LayoutClient;
