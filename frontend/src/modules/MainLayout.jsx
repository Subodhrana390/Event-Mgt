import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import MainHeader from "./Header/MainHeader";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <MainHeader/>

      {/* Render nested routes */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Footer */}
     <Footer/>
    </div>
  );
};

export default MainLayout;
