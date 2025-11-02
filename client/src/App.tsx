import { Routes, Route } from "react-router-dom";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AuthPage from './page/Sign In';
import Home from './page/Home';
import Profile from './page/Profile';
import ProtectedRoute from './component/ProtectedRoute';

import EventDetailedPage from "./page/EventDetailed";
import { EventProvider } from "./context/EventContext";
import MyEventPage from "./page/MyEvent";

interface User {
  userID: string;
  userName: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  userPhone: string;
  userRole: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/profile", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
        alert("User data: " + JSON.stringify(userData, null, 2));
      } else {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

function App() {
  return (
    <UserProvider>
      <div className="font-sans bg-background min-h-screen">
          <Routes>
            <Route 
              path="/home" 
              element={<Home/>} />
            <Route
              path="/signin"
              element={<AuthPage mode="signin" />}
            />
            <Route
              path="/register"
              element={<AuthPage mode="register" />}
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <div>Admin Dashboard - Only admins can see this</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer-dashboard"
              element={
                <ProtectedRoute requiredRole="organizer">
                  <div>Organizer Dashboard - Only organizers can see this</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
