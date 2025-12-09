import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ContentProvider } from "@/context/ContentContext";
import Home from "@/pages/Home.jsx";
import StudentArea from "@/pages/StudentArea.jsx";
import Library from "@/pages/Library.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import HowAIWorks from "@/pages/HowAIWorks.jsx";
import TeacherArea from "@/pages/TeacherArea.jsx";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register";
import PrivateRoute from "@/components/PrivateRoute";
import Logout from "@/components/Logout";
import StudentMemory from "@/pages/StudentMemory.jsx";
import TeacherMemory from "@/pages/TeacherMemory.jsx";

function App() {
  return (
    <Router>
      <ContentProvider>
        <Logout />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/how-ai-works" element={<HowAIWorks />} />
            <Route path="/library" element={<Library />} />
            
            {/* Rota da área do aluno */}
            <Route
              path="/student"
              element={
                <PrivateRoute allowedRoles={["aluno"]}>
                  <StudentArea />
                </PrivateRoute>
              }
            />
            
            {/* Rota do jogo para ALUNO */}
            <Route
              path="/student/memory"
              element={
                <PrivateRoute allowedRoles={["aluno"]}>
                  <StudentMemory />
                </PrivateRoute>
              }
            />
            
            {/* Rota da área do professor */}
            <Route
              path="/teacher"
              element={
                <PrivateRoute allowedRoles={["professor"]}>
                  <TeacherArea />
                </PrivateRoute>
              }
            />
            
            {/* Rota do jogo para PROFESSOR */}
            <Route
              path="/teacher/memory"
              element={
                <PrivateRoute allowedRoles={["professor"]}>
                  <TeacherMemory />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/dashboard"
              element={
                <PrivateRoute allowedRoles={["aluno"]}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            
            {/* Rota antiga /memory - redireciona baseado no papel do usuário */}
            <Route path="/memory" element={<Navigate to="/" replace />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </div>
      </ContentProvider>
    </Router>
  );
}

export default App;