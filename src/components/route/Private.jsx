import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import isAdmin from "./admin";

const PrivateRoute = () => {
    if(isAdmin()) return <Outlet />
    else {
        alert("접근 권한이 없습니다.");
        return <Navigate to="/login" />
    }
}

export default PrivateRoute;