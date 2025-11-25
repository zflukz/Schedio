import { Routes, Route } from "react-router";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AuthPage from './page/Sign In';
import { apiEndpoints } from './config/api';
import Home from './page/Home';
import ForgotPassword from './page/ForgotPassword';
import ResetPassword from './page/ResetPassword';
import ProtectedRoute from './component/ProtectedRoute';
import OAuth2Callback from './component/OAuth2Callback';
import HomeOrganizer from "./page/HomeOrganizer";
import EventDetailedPage from "./page/EventDetailed";
import { EventProvider } from "./context/EventContext";
import MyEventPage from "./page/MyEvent";
import MyAccount from "./page/MyAccount";
import CreateEvent from "./page/CreateEvent";
import CreateSuccess from "./page/CreateSuccess";
import HomeAdmin from "./page/HomeAdmin";
import EventOrganizerandAdminDatailed from "./page/EventOrganizer&AdminDatailed";
import UserManagement from "./page/UserManagement";
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
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log('No token found');
      setUser(null);
      return;
    }

    console.log('Fetching user profile with token:', token.substring(0, 50) + '...');
    try {
      const response = await fetch(apiEndpoints.profile, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log('Profile response status:', response.status);
      if (response.ok) {
        const userData = await response.json();
        console.log('User data received:', userData);
        const normalizedUser = {
          ...userData,
          userRole: userData.userRole?.toLowerCase(),
        };
        setUser(normalizedUser); 
        localStorage.setItem("userData", JSON.stringify(normalizedUser));
      } else {
        const errorText = await response.text();
        console.log('Profile fetch failed:', errorText);
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
    const token = localStorage.getItem("token");
    if (token && !user) {
      refreshUser();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

function App() {
  return (
    <UserProvider>
      <EventProvider>
        <div className="font-sans bg-background min-h-screen">
            <Routes>
              <Route 
                path="/" 
                element={<Home/>} />
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
                path="/forgot-password"
                element={<ForgotPassword />}
              />
              <Route
                path="/reset-password"
                element={<ResetPassword />}
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <HomeAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/usermanagement"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/dashboard"
                element={
                  <ProtectedRoute requiredRole="organizer">
                    <HomeOrganizer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/create event"
                element={
                  <ProtectedRoute requiredRole="organizer">
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/success"
                element={
                  <ProtectedRoute requiredRole="organizer">
                    <CreateSuccess />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/event/:eventId"
                element={<EventOrganizerandAdminDatailed />}
              />
              <Route
                path="/myaccount"
                element={
                  <ProtectedRoute>
                    <MyAccount />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/event/:eventId"
                element={<EventDetailedPage />}
              />
              <Route
                path="/myevent"
                element={<MyEventPage />}
              />
              <Route
                path="/oauth2/callback"
                element={<OAuth2Callback />}
              />
            </Routes>
        </div>
      </EventProvider>
    </UserProvider>
  );
}

export default App;
