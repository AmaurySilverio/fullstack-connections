import { HashRouter as Router, Routes, Route } from "react-router-dom";
import CreateGame from "./pages/CreateGame";
import CustomGames from "./pages/CustomGames";
import CustomGame from "./pages/CustomGame";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CustomGame />} />
          <Route path="/creategame" element={<CreateGame />} />
          <Route path="/customgames" element={<CustomGames />} />
          <Route path="/customgame/:title_id" element={<CustomGame />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
