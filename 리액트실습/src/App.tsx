import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import WeatherPage from './pages/WeatherPage';
import FashionPage from './pages/FashionPage';
import CoursePage from './pages/CoursePage';
import ManagerPage from './pages/ManagerPage';
import ShopPage from './pages/ShopPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Manager Route (Optional: Check role)
const ManagerRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  // if (user?.role !== 'ADMIN') return <Navigate to="/" replace />; // Role check later
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="team" element={<TeamPage />} />

            {/* Protected Routes */}
            <Route path="weather" element={<WeatherPage />} />

            <Route path="fashion" element={
              <ProtectedRoute><FashionPage /></ProtectedRoute>
            } />

            <Route path="courses" element={
              <ProtectedRoute><CoursePage /></ProtectedRoute>
            } />

            <Route path="shop" element={
              <ProtectedRoute><ShopPage /></ProtectedRoute>
            } />

            <Route path="manager" element={
              <ManagerRoute><ManagerPage /></ManagerRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
