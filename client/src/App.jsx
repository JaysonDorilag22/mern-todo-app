import Home from '@user/Home';
import Landing from '@user/Landing';
import { ThemeProvider } from './components/theme-provider';
import { Button } from './components/ui/button';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from '@auth/AuthPage';
import { Navbar } from './components/Navbar';

function App() {
  return (
    
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div>
        <Navbar/>
        </div>
        <Routes>
          <Route path='/' element={<AuthPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;