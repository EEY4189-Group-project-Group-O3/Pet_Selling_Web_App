import { Route, Routes, Navigate } from "react-router-dom";
import MainView from "./pages/PetViewSection/MainView";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import CreateProfile from "./pages/authentication/CreateProfile";
import { jwtDecode } from "jwt-decode";

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

const AppRoutes = () => {
  const token = localStorage.getItem("token");

  if (!isTokenValid(token)) {
    localStorage.removeItem("token");

    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile-create" element={<CreateProfile />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Render authenticated routes
  return (
    <Routes>
      <Route path="/" element={<MainView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
