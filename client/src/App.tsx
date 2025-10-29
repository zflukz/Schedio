import { Routes, Route } from "react-router-dom";
import AuthPage from './page/Sign In';
import Home from './page/Home';
import EventDetailedPage from "./page/EventDetailed";
import { EventProvider } from "./context/EventContext";
interface User {
  name: string;
  role: 'admin' | 'organizer' | 'user';
}


function App() {

 const handleAuthSubmit = (data: { email: string; password: string; name?: string }) => {
    console.log("Auth data:", data);
    // TODO: เรียก API login / register ตาม mode
  };


  return (
    <div className="font-sans bg-bg-light min-h-screen">
       <EventProvider>
        <Routes>
          <Route 
            path="/" 
            element={<Home/>} />
          <Route path="/event/:eventId" element={<EventDetailedPage />} />
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
        </Routes>
      </EventProvider>
    </div>
  );
}

export default App;
