import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainView from './pages/PetViewSection/MainView';
import Login from './pages/authentication/Login';
import { useUserContext } from './context/useUserContext';

const AppRoutes = () => {
  const { user } = useUserContext();
  console.log(user);

  if (!user) {
    // Redirect all paths to login when user is not authenticated
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
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
