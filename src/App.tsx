import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Demo from './components/Demo/Demo';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/features" element={<LandingPage/>} />
        <Route path="/pricing" element={<LandingPage/>} />
        <Route path="/contact" element={<LandingPage/>} />
        <Route path="/demo" element={<Demo/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
