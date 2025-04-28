import { Toaster } from "@components/ui/sonner";
import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";

import "react-day-picker/style.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import i18n from "./i18n";

// Lazy imports for layouts and pages
const LayoutAuth = React.lazy(() => import("@/layout/LayoutAuth"));
const LayoutClient = React.lazy(() => import("@/layout/LayoutClient"));
const CheckOutPage = React.lazy(() => import("@/pages/CheckOutPage"));
const HotelDetail = React.lazy(() => import("@/pages/DetailHotel"));
const DetailTour = React.lazy(() => import("@/pages/DetailTour"));
const HomePage = React.lazy(() => import("@/pages/HomePage"));
const HotelPage = React.lazy(() => import("@/pages/HotelPage"));
const ListTour = React.lazy(() => import("@/pages/ListTour"));
const PolicyPage = React.lazy(() => import("@/pages/PolicyPage"));
const ThankPage = React.lazy(() => import("@/pages/ThankPage"));
const SplashScreen = React.lazy(() => import("@/components/SplashScreen"));
const EmailForgotForm = React.lazy(
  () => import("@/components/auth/EmailForgotForm")
);
const LoginForm = React.lazy(() => import("@/components/auth/LoginForm"));
const RegisterForm = React.lazy(() => import("@/components/auth/RegisterForm"));
const AboutPage = React.lazy(() => import("@/pages/AboutPage"));
const ContactPage = React.lazy(() => import("@/pages/ContactPage"));
const ResultPage = React.lazy(() => import("@/pages/ResultPage"));

function App() {
  useEffect(() => {
    Aos.init({
      duration: 900,
      once: true,
    });
  }, []);
  const language = sessionStorage.getItem("language") || "en";

  useEffect(() => {
    console.log(language);
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <Suspense fallback={<SplashScreen />}>
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
    </Suspense>
  );
}

export default App;
