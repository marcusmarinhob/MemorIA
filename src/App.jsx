import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";

import ProfessorHome from "./pages/professor/ProfessorHome";
import ProfessorComoFunciona from "./pages/professor/ProfessorComoFunciona";
import ProfessorEstatisticas from "./pages/professor/ProfessorEstatisticas";

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Rota inicial: Home do Professor --- */}
        <Route
          path="/"
          element={
            <>
              <Menu tipo="professor" />
              <div className="pt-20"><ProfessorHome /></div>
            </>
          }
        />

        {/* --- Páginas do professor --- */}
        <Route
          path="/professor/home"
          element={
            <>
              <Menu tipo="professor" />
              <div className="pt-20"><ProfessorHome /></div>
            </>
          }
        />
        <Route
          path="/professor/como-funciona"
          element={
            <>
              <Menu tipo="professor" />
              <div className="pt-20"><ProfessorComoFunciona /></div>
            </>
          }
        />
        <Route
          path="/professor/estatisticas"
          element={
            <>
              <Menu tipo="professor" />
              <div className="pt-20"><ProfessorEstatisticas /></div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;