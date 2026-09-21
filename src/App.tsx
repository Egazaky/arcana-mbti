import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MBTIProvider } from './context/MBTIContext';
import { Layout } from './components/common/Layout';
import { LandingPage } from './pages/LandingPage';
import { LevelsPage } from './pages/LevelsPage';
import { TestPage } from './pages/TestPage';
import { ResultPage } from './pages/ResultPage';
import { CardsPage } from './pages/CardsPage';

export default function App() {
  return <BrowserRouter><MBTIProvider><Routes><Route element={<Layout />}>
    <Route index element={<LandingPage />} />
    <Route path="levels" element={<LevelsPage />} />
    <Route path="test/:levelId" element={<TestPage />} />
    <Route path="result" element={<ResultPage />} />
    <Route path="cards/:type?" element={<CardsPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route></Routes></MBTIProvider></BrowserRouter>;
}
