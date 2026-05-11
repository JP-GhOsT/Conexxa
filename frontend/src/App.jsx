import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import CreateStudyGroup from "./pages/CreateStudyGroup";

import EditStudyGroup from "./pages/EditStudyGroup";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* REDIRECT INICIAL */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
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

        {/* CREATE GROUP */}
        <Route
          path="/create-group"
          element={
            <ProtectedRoute>
              <CreateStudyGroup />
            </ProtectedRoute>
          }
        />

        {/* EDIT GROUP */}
        <Route
          path="/edit-group/:id"
          element={
            <ProtectedRoute>
              <EditStudyGroup />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;