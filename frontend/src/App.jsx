import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateStudyGroup from "./pages/CreateStudyGroup";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* CRIAR GRUPO */}
        <Route
          path="/groups/create"
          element={<CreateStudyGroup />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;