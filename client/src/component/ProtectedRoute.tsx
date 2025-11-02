import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "organizer" | "attendee";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/profile", {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
          const userData = await response.json();
          setUserRole(userData.userRole?.toLowerCase());
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/signin" />;

  if (requiredRole && userRole !== requiredRole) {
    // Show access denied alert only once
    if (!alertShown) {
      if (requiredRole === "admin") {
        alert("Access denied: Admin role required");
      } else if (requiredRole === "organizer") {
        alert("Access denied: Organizer role required");
      }
      setAlertShown(true);
    }
    
    // Navigate to role-specific home page
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