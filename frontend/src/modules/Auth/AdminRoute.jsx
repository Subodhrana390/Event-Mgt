import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/" />; 
  }
  return user?.role === "seller" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
