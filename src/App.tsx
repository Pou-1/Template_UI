import "./App.css";
import "./index.css";
import ButtonsPage from "./pages/ButtonsPage";
import ParallaxPage from "./pages/ParallaxPage";

function App() {
  return (
    <div className="flex-center flex-col w-screen min-h-screen">
      <ButtonsPage/>
      <ParallaxPage/>
      <div className="w-screen h-screen"></div>
    </div>
  );
}

export default App;
