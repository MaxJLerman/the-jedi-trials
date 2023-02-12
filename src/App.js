import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./components/Home";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
