import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing"; // Ensure this exists!
import AuthModal from "./components/AuthModal";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  // Load User Safely
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("User data corrupted, clearing...");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <Navbar 
        user={user} 
        setShowLogin={setShowLogin} 
        logout={handleLogout} 
      />
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home setShowLogin={setShowLogin} />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        onLogin={(userData) => {
          setUser(userData);
          setShowLogin(false);
        }}
      />
    </div>
  );
};

export default App;
