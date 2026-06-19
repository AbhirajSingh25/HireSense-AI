import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LiveInterview from "./pages/LiveInterview";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Leaderboard from "./pages/Leaderboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Settings from "./pages/Settings";
import PracticeMode from "./pages/PracticeMode";
import AICopilot from "./pages/AICopilot";

import {
  useAuth,
} from "./context/AuthContext";



function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const {
    isAuthenticated,
  } = useAuth();

  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}



function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const {
    isAuthenticated,
  } = useAuth();

  if (isAuthenticated) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}



function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ROOT */}

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />



        {/* AUTH */}

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />



        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
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
        {/* LIVE INTERVIEW */}

        <Route
          path="/live-interview"
          element={
            <ProtectedRoute>
              <LiveInterview />
            </ProtectedRoute>
          }
        />



        {/* PRACTICE */}

        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <PracticeMode />
            </ProtectedRoute>
          }
        />



        {/* ANALYTICS */}

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />



        {/* REPORTS */}

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />



        {/* AI COPILOT */}

        <Route
          path="/copilot"
          element={
            <ProtectedRoute>
              <AICopilot />
            </ProtectedRoute>
          }
        />



        {/* LEADERBOARD */}

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />



        {/* RECRUITER */}

        <Route
          path="/recruiter"
          element={
            <ProtectedRoute>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />



        {/* SETTINGS */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />



        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;

