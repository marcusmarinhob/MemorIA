import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Menu , Home, BookOpen, Brain, GraduationCap, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImagemSabia from "../assets/sabia2.jpg";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Início", icon: Home },
    { path: "/library", label: "Biblioteca", icon: BookOpen },
    { path: "/how-ai-works", label: "Como a IA Funciona?", icon: Brain },
    { path: "/parents", label: "Responsáveis", icon: Users },
    { path: "/teacher", label: "Professores", icon: GraduationCap },
  ];

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
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden shadow-md">
              <img
                src={ImagemSabia}
                alt="Sabiá"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="text-2xl font-bold">
              <span style={{ color: "#edbf21" }}>Sab</span>
              <span style={{ color: "#153c4b" }}>IA</span>
            </span>
          </Link>

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
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="whitespace-nowrap text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <Link to="/login">
              <Button className="bg-[#153c4b] text-white px-6 py-3 font-semibold rounded-full flex items-center justify-center hover:bg-[#1a4a5c] hover:scale-105 transition-all duration-200 shadow-md border-0">
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              className="p-2 text-[#153c4b] bg-transparent hover:bg-white/10 focus:bg-transparent shadow-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/10"
            onClick={() => setIsOpen(false)}
          ></div>

          <div
            className="relative w-80 p-6 rounded-2xl glass-effect flex flex-col space-y-4 z-50"
            style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
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
                        ? "bg-[#153c4b] text-white shadow-md"
                        : "text-[#153c4b] hover:bg-gray-100/50"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="whitespace-nowrap text-base font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}

            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button className="bg-[#153c4b] text-white w-full flex items-center justify-center px-4 py-3 rounded-full hover:bg-[#1a4a5c] transition-all duration-200">
                <LogIn className="w-4 h-4 mr-2" /> Entrar
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
