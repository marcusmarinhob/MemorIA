import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";

import ProfessorHome from "./pages/professor/ProfessorHome";
import ProfessorComoFunciona from "./pages/professor/ProfessorComoFunciona";
import ProfessorEstatisticas from "./pages/professor/ProfessorEstatisticas";

import AlunoHome from "./pages/aluno/AlunoHome";
import AlunoComoFunciona from "./pages/aluno/AlunoComoFunciona";
import AlunoEstatisticas from "./pages/aluno/AlunoEstatisticas";

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

        {/* --- Páginas do aluno --- */}
        <Route
          path="/aluno/home"
          element={
            <div className="min-h-screen">
              <Menu tipo="aluno" />
              <div className="pt-20">
                <AlunoHome />
              </div>
            </div>
          }
        />
        <Route
          path="/aluno/como-funciona"
          element={
            <div className="min-h-screen">
              <Menu tipo="aluno" />
              <div className="pt-20">
                <AlunoComoFunciona />
              </div>
            </div>
          }
        />
        <Route
          path="/aluno/estatisticas"
          element={
            <div className="min-h-screen">
              <Menu tipo="aluno" />
              <div className="pt-20">
                <AlunoEstatisticas />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;