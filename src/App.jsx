import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home.jsx";
import StudentArea from "@/pages/StudentArea.jsx";
import Library from "@/pages/Library.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import ParentsArea from "@/pages/ParentsArea.jsx";
import HowAIWorks from "@/pages/HowAIWorks.jsx";
import TeacherArea from "@/pages/TeacherArea.jsx";
import Login from "@/pages/Login.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<StudentArea />} />
          <Route path="/library" element={<Library />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/parents" element={<ParentsArea />} />
          <Route path="/how-ai-works" element={<HowAIWorks />} />
          <Route path="/teacher" element={<TeacherArea />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
