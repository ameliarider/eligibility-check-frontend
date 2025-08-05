// src/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ isLoggedIn }) {
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
