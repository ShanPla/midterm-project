import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { BookingProvider } from "./contexts/BookingContext";
import Home from "./pages/Home";
import SpaceDetail from "./pages/SpaceDetail";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    if (!sessionStorage.getItem("authAlertShown")) {
      window.alert("You must be logged in to see bookings.");
      sessionStorage.setItem("authAlertShown", "true");
    }
    return <Navigate to="/" replace />;
  }

  sessionStorage.removeItem("authAlertShown"); // reset for next time
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/space/:spaceId" element={<SpaceDetail />} />
            <Route
              path="/dashboard/my-bookings"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}
