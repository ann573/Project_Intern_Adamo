import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import HomePage from "@/pages/HomePage";
import LayoutClient from "@/layout/LayoutClient";
import ListTour from "@/pages/ListTour";
import DetailTour from "@/pages/DetailTour";
import CheckOutPage from "@/pages/CheckOutPage";
import PolicyPage from "@/pages/PolicyPage";
import ThankPage from "@/pages/ThankPage";
import HotelPage from "@/pages/HotelPage";
import HotelDetail from "@/pages/DetailHotel";
import LayoutAuth from "@/layout/LayoutAuth";

import { Toaster } from "@components/ui/sonner";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import SplashScreen from "@/components/SplashScreen";
import RegisterForm from "@/components/auth/RegisterForm";
import LoginForm from "@/components/auth/LoginForm";
import EmailForgotForm from "@/components/auth/EmailForgotForm";

import Aos from "aos";
import "aos/dist/aos.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ResultPage from "@/pages/ResultPage";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/hooks/app";
import { setAuth } from "@/features/auth/authSlice";

function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  const dispatch = useAppDispatch()
  useEffect(() => {
    setTimeout(() => {
      setIsSplashFinished(true); 
    }, 500);

    Aos.init({
      duration: 900,
      once: true,
    });

    const storedName = Cookies.get('name');
  if (storedName) {
    dispatch(setAuth({ name: storedName }));
  }
  }, [dispatch]);

  if (!isSplashFinished) {
    return <SplashScreen />;
  }
  
  return (
    <>
      <Routes>
        {/* ------------Screen UI------------------ */}
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tours" element={<ListTour />} />
          <Route path="/tour/:id" element={<DetailTour />} />
          <Route path="/hotels" element={<HotelPage />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
          <Route path="/search/:type/:query" element={<ResultPage />} />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/policy" element={<PolicyPage />} />
        </Route>

        <Route path="/checkout/:type" element={<CheckOutPage />} />
        <Route path="/thanks" element={<ThankPage />} />

        {/* ------------Screen Auth------------------ */}
        <Route path="/auth" element={<LayoutAuth />}>
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="reset-password" element={<LoginForm />} />
          <Route path="forgot-password" element={<EmailForgotForm />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
