import { Routes, Route } from "react-router-dom";
import AuthPage from './page/Sign In';
import Home from './page/Home';
import ProtectedRoute from './component/ProtectedRoute';
interface User {
  name: string;
  role: 'admin' | 'organizer' | 'user';
}


function App() {
  const user: User | null = null; // สมมติยังไม่ได้ login

 const handleAuthSubmit = (data: { email: string; password: string; name?: string }) => {
    console.log("Auth data:", data);
    // TODO: เรียก API login / register ตาม mode
  };


  return (
    <div className="font-sans bg-background min-h-screen">
        <Routes>
          <Route 
            path="/" 
            element={<Home/>} />
          {/* Sign In */  }
          <Route
            path="/signin"
            element={<AuthPage mode="signin" />}
          />
          {/* Register */}
          <Route
            path="/register"
            element={<AuthPage mode="register" />}
          />
          {/* Protected Admin Route */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <div>Admin Dashboard - Only admins can see this</div>
              </ProtectedRoute>
            }
          />
          {/* Protected Organizer Route */}
          <Route
            path="/organizer-dashboard"
            element={
              <ProtectedRoute requiredRole="organizer">
                <div>Organizer Dashboard - Only organizers can see this</div>
              </ProtectedRoute>
            }
          />
        </Routes>
    </div>
  );
}

export default App;
