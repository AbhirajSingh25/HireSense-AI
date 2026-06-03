// frontend/src/App.tsx

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";

import MockInterview from "./pages/MockInterview";

import LiveInterview from "./pages/LiveInterview";

import SpeechAnalysis from "./pages/SpeechAnalysis";

import Analytics from "./pages/Analytics";

import History from "./pages/History";

import Reports from "./pages/Reports";

import Leaderboard from "./pages/Leaderboard";

import RecruiterInsights from "./pages/RecruiterInsights";

import VisionAnalysis from "./pages/VisionAnalysis";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Navigate to="/login" />
          }
        />


        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
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
          path="/mock-interview"
          element={
            <ProtectedRoute>
              <MockInterview />
            </ProtectedRoute>
          }
        />


        <Route
          path="/live-interview"
          element={
            <ProtectedRoute>
              <LiveInterview />
            </ProtectedRoute>
          }
        />


        <Route
          path="/speech-analysis"
          element={
            <ProtectedRoute>
              <SpeechAnalysis />
            </ProtectedRoute>
          }
        />


        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />


        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />


        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />


        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/recruiter-insights"
          element={
            <ProtectedRoute>
              <RecruiterInsights />
            </ProtectedRoute>
          }
        />


        <Route
          path="/vision-analysis"
          element={
            <ProtectedRoute>
              <VisionAnalysis />
            </ProtectedRoute>
          }
        />


        <Route
          path="*"
          element={
            <Navigate to="/login" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;