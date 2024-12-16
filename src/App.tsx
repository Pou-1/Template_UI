import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./index.css";
import ButtonsPage from "./pages/ButtonsPage";
import ParallaxPage from "./pages/ParallaxPage";

function App() {
  return (
    <Router>
      <div className="flex-center flex-col w-screen min-h-screen">
        <nav className="flex gap-4 p-4">
          <Link
            to="/buttons"
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Buttons Page
          </Link>
          <Link
            to="/parallax"
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Parallax Page
          </Link>
        </nav>
        <div className="w-screen h-full">
          <Routes>
            <Route path="/buttons" element={<ButtonsPage />} />
            <Route path="/parallax" element={<ParallaxPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
