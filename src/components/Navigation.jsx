import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Menu,
  Home,
  BookOpen,
  Brain,
  GraduationCap,
  LogIn,
  Trophy,
  FileText,
  BarChart2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ImagemMemoria from "../assets/minha_logo.png";
import { logoutUsuario } from "../lib/auth";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const userRole = localStorage.getItem("userType");

  // ======= MENUS POR TIPO DE USUÁRIO ========
  const menuProfessor = [
    { path: "/", label: "Início", icon: Home },
    { path: "/how-ai-works", label: "Como Funciona?", icon: Brain },
    { path: "/teacher", label: "Minha Área", icon: GraduationCap },
    { path: "/library", label: "Biblioteca", icon: BookOpen },
    { path: "/classes", label: "Turmas", icon: Users },
    { path: "/reports", label: "Relatórios", icon: BarChart2 },
  ];

  const menuAluno = [
    { path: "/", label: "Início", icon: Home },
    { path: "/how-ai-works", label: "Como Funciona?", icon: Brain },
    { path: "/student", label: "Minha Área", icon: GraduationCap },
    { path: "/library", label: "Biblioteca", icon: BookOpen },
    { path: "/ranking", label: "Ranking", icon: Trophy },
  ];

  const menuPublico = [
    { path: "/", label: "Início", icon: Home },
    { path: "/how-ai-works", label: "Como Funciona?", icon: Brain },
    { path: "/library", label: "Biblioteca", icon: BookOpen },
  ];

  // Escolher menu conforme o usuário
  const navItems =
    userRole === "professor"
      ? menuProfessor
      : userRole === "aluno"
      ? menuAluno
      : menuPublico;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div
          className="flex items-center justify-between px-8 py-4 rounded-full shadow-lg backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.59)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
              <img
                src={ImagemMemoria}
                alt="MemorIA"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold">
              <span style={{ color: "#153c4b" }}>Memor</span>
              <span style={{ color: "#edbf21" }}>IA</span>
            </span>
          </Link>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-[#153c4b] text-white shadow-md"
                        : "text-[#153c4b] hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* BOTÃO LOGIN / LOGOUT */}
          <div className="hidden md:block">
            {userRole ? (
              <Button
                onClick={async () => {
                  await logoutUsuario();
                  localStorage.removeItem("userType");
                  window.location.href = "/login";
                }}
                className="bg-[#153c4b] text-white px-6 py-3 rounded-full shadow-md"
              >
                <LogIn className="w-4 h-4 mr-2" /> Sair
              </Button>
            ) : (
              <Link to="/login">
                <Button className="bg-[#153c4b] text-white px-6 py-3 rounded-full shadow-md">
                  <LogIn className="w-4 h-4 mr-2" /> Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* BOTÃO MOBILE */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="p-2 text-[#153c4b]"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setIsOpen(false)}
          />

          <div
            className="relative w-80 p-6 rounded-2xl bg-white/90 shadow-xl flex flex-col space-y-4"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  <div
                    className={`flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-[#153c4b] text-white"
                        : "text-[#153c4b] hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-base">{item.label}</span>
                  </div>
                </Link>
              );
            })}

            {/* Login / Logout no Mobile */}
            {userRole ? (
              <Button
                onClick={async () => {
                  await logoutUsuario();
                  localStorage.removeItem("userType");
                  window.location.href = "/login";
                }}
                className="bg-[#153c4b] text-white w-full py-3 rounded-full"
              >
                <LogIn className="w-4 h-4 mr-2" /> Sair
              </Button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button className="bg-[#153c4b] text-white w-full py-3 rounded-full">
                  <LogIn className="w-4 h-4 mr-2" /> Entrar
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
