import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "organizer" | "attendee";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/profile", {
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
    // Navigate to role-specific home page
    if (userRole === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else if (userRole === "organizer") {
      return <Navigate to="/organizers-dashboard" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;