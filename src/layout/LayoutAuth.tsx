import { Outlet } from "react-router-dom";

// assets
import imageAuth from "@assets/images/image_auth.png";

const LayoutAuth = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        {/* ================= */}
        <Outlet />

        {/* ================= */}
        <div className=" h-screen overflow-hidden ">
          <img
            src={imageAuth}
            className="w-full h-full object-cover"
            alt="Auth Background"
          />
        </div>
      </div>
    </>
  );
};

export default LayoutAuth;
