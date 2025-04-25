import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import LayoutAuth from "@/layout/LayoutAuth";
import LayoutClient from "@/layout/LayoutClient";
import CheckOutPage from "@/pages/CheckOutPage";
import HotelDetail from "@/pages/DetailHotel";
import DetailTour from "@/pages/DetailTour";
import HomePage from "@/pages/HomePage";
import HotelPage from "@/pages/HotelPage";
import ListTour from "@/pages/ListTour";
import PolicyPage from "@/pages/PolicyPage";
import ThankPage from "@/pages/ThankPage";

import SplashScreen from "@/components/SplashScreen";
import EmailForgotForm from "@/components/auth/EmailForgotForm";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import { Toaster } from "@components/ui/sonner";

import Aos from "aos";
import "aos/dist/aos.css";

import { useAppDispatch } from "@/hooks/app";
import ResultPage from "@/pages/ResultPage";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "react-day-picker/style.css";

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
          <Route path="/search/:type" element={<ResultPage />} />

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
