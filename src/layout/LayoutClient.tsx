import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const LayoutClient = () => {
  const [scrolling, setScrolling] = useState(false);
  const location = useLocation();
  const isFixed = location.pathname.includes("tour/") || location.pathname.includes("hotel/") || location.pathname.includes("policy");;

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
