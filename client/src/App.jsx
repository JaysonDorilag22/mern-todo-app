import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@user/Home';
import AuthPage from '@auth/AuthPage';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path='/' element={<AuthPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;