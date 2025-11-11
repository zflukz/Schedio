import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../App";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "organizer" | "attendee";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user } = useUser();
  const [alertShown, setAlertShown] = useState(false);

  if (!user) return <Navigate to="/signin" />;

  const userRole = user.userRole?.toLowerCase();

  if (requiredRole && userRole !== requiredRole) {
    if (!alertShown) {
      alert(`Access denied: ${requiredRole} role required`);
      setAlertShown(true);
    }
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;