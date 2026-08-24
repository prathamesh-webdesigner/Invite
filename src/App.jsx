import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import Home from './pages/Home';
import Templates from './pages/Templates';
import Editor from './pages/Editor';
import Preview from './pages/Preview';

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-ink mb-2">Page not found</h1>
      <p className="text-muted">The page you're looking for doesn't exist.</p>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isFullScreen = location.pathname.startsWith('/editor') || location.pathname === '/preview';

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      {!isFullScreen && <Header />}
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/editor/:templateId" element={<Editor />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isFullScreen && <Footer />}
    </div>
  );
}
