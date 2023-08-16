import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Demo from "./components/Demo/Demo";
import SelectCategoryPage from "./components/SelectCategoryPage/SelectCategoryPage";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<LandingPage />} />
        <Route path="/pricing" element={<LandingPage />} />
        <Route path="/contact" element={<LandingPage />} />
        <Route path="/demo/:category" element={<Demo />} />
        <Route path="/categories" element={<SelectCategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
