import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import SpeechAnalysis from "./pages/SpeechAnalysis";

import VisionAnalysis from "./pages/VisionAnalysis";

import LandingPage from "./pages/LandingPage";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";

import MockInterview from "./pages/MockInterview";

import ResumeAnalyzer from "./pages/ResumeAnalyzer";

import History from "./pages/History";

import Reports from "./pages/Reports";

import Analytics from "./pages/Analytics";

import Leaderboard from "./pages/Leaderboard";

import InterviewAnalysis from "./pages/InterviewAnalysis";

import ProtectedRoute from "./routes/ProtectedRoute";

import {
  AuthProvider,
} from "./context/AuthContext";


function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<LandingPage />}
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
            path="/resume-analyzer"
            element={
              <ProtectedRoute>
                <ResumeAnalyzer />
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
            path="/history"
            element={
              <ProtectedRoute>
                <History />
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
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
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
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/interview-analysis"
            element={
              <ProtectedRoute>
                <InterviewAnalysis />
              </ProtectedRoute>
            }
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;