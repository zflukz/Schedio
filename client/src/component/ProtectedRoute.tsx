import React, { useState } from "react";
import { Navigate } from "react-router";
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
      if (requiredRole === "admin") {
        alert("Access denied: Admin role required");
      } else if (requiredRole === "organizer") {
        alert("Access denied: Organizer role required");
      }
      setAlertShown(true);
    }
    
    if (userRole === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else if (userRole === "organizer") {
      return <Navigate to="/organizer-dashboard" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;