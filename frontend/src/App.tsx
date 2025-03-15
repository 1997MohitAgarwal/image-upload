import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import ImageAnalyzer from "./components/ImageAnalyzer";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );

  // Listen for storage changes to update the token dynamically
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("access_token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
  };

  // ProtectedRoute to ensure users are redirected if not logged in
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return token ? <>{children}</> : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className="App">
        <Navbar token={token} logout={logout} />

        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />

          <Route path="/" element={<Home/>  } />


          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>
                  <Dashboard />
                </div>
              </ProtectedRoute>
            }
          />

          {/* Image Analyzer Route */}
          <Route path="/analyze" element={<ImageAnalyzer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
