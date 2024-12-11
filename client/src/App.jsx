import { ModeToggle } from './components/mode-toggle';
import { ThemeProvider } from './components/theme-provider';
import { Button } from './components/ui/button'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle/>
      <Button>Hello</Button>
    <Router>
      <Routes>
        {/* <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} /> */}

      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App
