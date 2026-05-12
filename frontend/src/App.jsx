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
import GroupDetails from "./pages/GroupDetails";
import EditStudyGroup from "./pages/EditStudyGroup";
import Profile from "./pages/Profile";
import Groups from "./pages/Groups";
import GroupRequests from "./pages/GroupRequests";
import AdminGroups from "./pages/AdminGroups";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* REDIRECT INICIAL */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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

        {/* LISTA DE GRUPOS (IMPORTANTE VIR ANTES DO :id) */}
        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <Groups />
            </ProtectedRoute>
          }
        />

        {/* GROUP DETAILS */}
        <Route
          path="/groups/:id"
          element={
            <ProtectedRoute>
              <GroupDetails />
            </ProtectedRoute>
          }
        />

        {/* GROUP REQUESTS */}
        <Route
          path="/groups/:id/requests"
          element={
            <ProtectedRoute>
              <GroupRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/groups"
          element={
            <ProtectedRoute>
              <AdminGroups />
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

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;