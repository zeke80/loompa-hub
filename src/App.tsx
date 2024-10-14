import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import LoompaDetail from "./pages/loompaDetail/LoompaDetail";
import LoompaList from "./pages/LoompaList/LoompaList";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LoompaList />} />
        <Route path="/:id" element={<LoompaDetail />} />
      </Routes>
    </>
  );
}

export default App;
