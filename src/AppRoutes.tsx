import { Route, Routes, Navigate } from 'react-router-dom';
import MainView from './pages/PetViewSection/MainView';
import Login from './pages/authentication/Login';
import { useUserContext } from './context/useUserContext';
import SignUp from './pages/authentication/SignUp';
import CreateProfile from './pages/authentication/CreateProfile';

const AppRoutes = () => {
  const { user } = useUserContext();
  const token = localStorage.getItem('token');
  console.log(user);

  if (!token) {
    // Redirect all paths to login when user is not authenticated
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile-create" element={<CreateProfile />} />


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
