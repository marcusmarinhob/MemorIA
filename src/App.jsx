import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home.jsx";
import StudentArea from "@/pages/StudentArea.jsx";
import Library from "@/pages/Library.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import ParentsArea from "@/pages/ParentsArea.jsx";
import HowAIWorks from "@/pages/HowAIWorks.jsx";
import TeacherArea from "@/pages/TeacherArea.jsx";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register";
import PrivateRoute from "@/components/PrivateRoute";
import Logout from "@/components/Logout";

function App() {
  return (
    <Router>
      <Logout/>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/how-ai-works" element={<HowAIWorks />} />
          <Route path="/library" element={<Library />} />
          <Route
            path="/student"
            element={
              <PrivateRoute allowedRoles={["aluno"]}>
                <StudentArea />
              </PrivateRoute>
            }
          />
          <Route
            path="/parents"
            element={
              <PrivateRoute allowedRoles={["responsavel"]}>
                <ParentsArea />
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher"
            element={
              <PrivateRoute allowedRoles={["professor"]}>
                <TeacherArea />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
