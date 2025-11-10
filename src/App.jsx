import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";

import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterAluno from "./pages/RegisterAluno";
import RegisterProfessor from "./pages/RegisterProfessor";

import AlunoHome from "./pages/aluno/AlunoHome";
import AlunoComoFunciona from "./pages/aluno/AlunoComoFunciona";
import AlunoEstatisticas from "./pages/aluno/AlunoEstatisticas";

import ProfessorHome from "./pages/professor/ProfessorHome";
import ProfessorComoFunciona from "./pages/professor/ProfessorComoFunciona";
import ProfessorEstatisticas from "./pages/professor/ProfessorEstatisticas";

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Páginas públicas --- */}
        <Route
          path="/"
          element={
            <>
              <Menu tipo="publico" />
              <div className="pt-20"><Home /></div>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Menu tipo="publico" />
              <div className="pt-20"><Login /></div>
            </>
          }
        />
        <Route
          path="/register/aluno"
          element={
            <>
              <Menu tipo="publico" />
              <div className="pt-20"><RegisterAluno /></div>
            </>
          }
        />

        <Route
          path="/register/professor"
          element={
            <>
              <Menu tipo="publico" />
              <div className="pt-20"><RegisterProfessor /></div>
            </>
          }
        />

        <Route
          path="/como-funciona"
          element={
            <>
              <Menu tipo="publico" />
              <div className="pt-20" />
            </>
          }
        />

        {/* --- Páginas do aluno --- */}
        <Route
          path="/aluno/home"
          element={
            <>
              <Menu tipo="aluno" />
              <div className="pt-20"><AlunoHome /></div>
            </>
          }
        />
        <Route
          path="/aluno/como-funciona"
          element={
            <>
              <Menu tipo="aluno" />
              <div className="pt-20"><AlunoComoFunciona /></div>
            </>
          }
        />
        <Route
          path="/aluno/estatisticas"
          element={
            <>
              <Menu tipo="aluno" />
              <div className="pt-20"><AlunoEstatisticas /></div>
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