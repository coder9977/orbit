import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const context = useContext(GlobalContext) as { loginInfo?: { name?: string } };
    const isAuthenticated = Boolean(context?.loginInfo?.name);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
};