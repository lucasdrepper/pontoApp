import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import ControlPoint from "./pages/controlpoint";
import Reports from "./pages/reports";
import Registrations from "./pages/registrations";
import Login from "./pages/login";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PrivateLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas privadas com layout comum */}
        <Route element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/controlpoint" element={<ControlPoint />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/registrations" element={<Registrations />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;