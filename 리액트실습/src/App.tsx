// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import WeatherPage from './pages/WeatherPage';
import FashionPage from './pages/FashionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="team" element={<TeamPage />} />
          {/* 날씨 페이지 경로 추가 */}
          <Route path="weather" element={<WeatherPage />} />
          <Route path="fashion" element={<FashionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
