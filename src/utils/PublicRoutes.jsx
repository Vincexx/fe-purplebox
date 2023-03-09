import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../App";

const SideBarLayout = () => {
  let isAuth = useAuth();
  return isAuth ? <Navigate to={"/users"} /> : <Outlet />;
};

export default SideBarLayout;
