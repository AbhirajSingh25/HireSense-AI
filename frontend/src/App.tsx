import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MockInterview from "./pages/MockInterview";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import Leaderboard from "./pages/Leaderboard";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (

    <BrowserRouter>

      <Routes>

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
          path="/history"
          element={
            <ProtectedRoute>
              <History />
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
          path="*"
          element={<Login />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;