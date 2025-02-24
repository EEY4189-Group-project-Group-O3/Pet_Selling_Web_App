import { Route, Routes, Navigate } from "react-router-dom";
import MainView from "./pages/PetViewSection/MainView";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import CreateProfile from "./pages/authentication/CreateProfile";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

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
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check token validity whenever the component renders
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      const valid = isTokenValid(token);

      setIsValid(valid);

      if (!valid && token) {
        localStorage.removeItem("token");
      }

      setIsLoading(false);
    };

    checkToken();

    // Set up an event listener for storage changes
    window.addEventListener("storage", checkToken);

    // Custom event for auth state changes
    window.addEventListener("authChange", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
      window.removeEventListener("authChange", checkToken);
    };
  }, []);

  // Show a loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  // Authenticated routes
  if (isValid) {
    return (
      <Routes>
        <Route path="/" element={<MainView />} />
        {/* Redirect authenticated users away from auth pages */}
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/sign-up" element={<Navigate to="/" replace />} />
        <Route path="/profile-create" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Non-authenticated routes
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/profile-create" element={<CreateProfile />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
