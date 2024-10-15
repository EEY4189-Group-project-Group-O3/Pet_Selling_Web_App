import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import MainView from './pages/PetViewSection/MainView'
import Login from './pages/authentication/Login'

const AppRoutes = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Routes>
      {token === null ? (
        <Route path="/login" element={<Login setToken={setToken} />} />
      ) : (
        <Route path="/" element={<MainView />} />
      )}
    </Routes>
  )
}

export default AppRoutes;
