import { Routes, Route } from "react-router-dom";
import AuthForm from './component/Sign In';
import Home from './page/Home';
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
            element={<AuthForm mode="signin" onSubmit={handleAuthSubmit} />}
          />
          {/* Register */}
          <Route
            path="/register"
            element={<AuthForm mode="register" onSubmit={handleAuthSubmit} />}
          />
        </Routes>
    </div>
  );
}

export default App;
