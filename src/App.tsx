import LoginComponent from './components/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeComponent from './components/home'
import './App.css'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/home" element={<HomeComponent />} />
      </Routes>
    </Router>
  );
}

export default App
