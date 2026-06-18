import { Routes, Route, Navigate, } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Itinerary from "./pages/Itinerary";
import FestivalExplorer from "./pages/FestivalExplorer";
import Reviews from "./pages/Reviews";
import SavedTrips from "./pages/SavedTrips";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/itinerary"
        element={
          <ProtectedRoute>
            <Itinerary />
          </ProtectedRoute>
        }
      />

      <Route
        path="/festivals"
        element={
          <ProtectedRoute>
            <FestivalExplorer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/trips"
        element={
          <ProtectedRoute>
            <SavedTrips />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reviews"
        element={
          <ProtectedRoute>
            <Reviews />
          </ProtectedRoute>
        }
      />

      <Route
  path="*"
  element={<Navigate to="/dashboard" />}
/>

    </Routes>

  );
}

export default App;