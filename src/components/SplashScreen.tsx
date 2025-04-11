import logo from "@assets/images/logo_black.png";

const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white z-50 fixed top-0 left-0 right-0 bottom-0">
      <img src={logo} className="w-32 h-32 animate-bounce" />
    </div>
  );
};

export default SplashScreen;
