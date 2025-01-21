import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./index.css";
import './styles/animation.css'
import ButtonsPage from "./pages/ButtonsPage";
import ParallaxPage from "./pages/ParallaxPage";
import DivsPage from "./pages/DivsPage";
import InputPage from "./pages/InputPage";

function App() {
  return (
    <Router>
      <div className="flex w-screen min-h-screen">
        <nav className="flex flex-col h-screen gap-4 p-4">
          <Link
            to="/buttons"
            className="px-4 w-40 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Buttons Page
          </Link>
          <Link
            to="/parallax"
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Parallax Page
          </Link>
          <Link
            to="/divs"
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Divs Page
          </Link>
          <Link
            to="/input"
            className="px-4 w-40 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Input Page
          </Link>
        </nav>
        <div className="w-screen h-full">
          <Routes>
            <Route path="/buttons" element={<ButtonsPage />} />
            <Route path="/parallax" element={<ParallaxPage />} />
            <Route path="/divs" element={<DivsPage />} />
            <Route path="/input" element={<InputPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
