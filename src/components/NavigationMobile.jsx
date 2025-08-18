import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ImagemSabia from "../assets/sabia2.jpg";
import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  Brain,
  Users,
  GraduationCap,
  LogIn,
  Menu,
} from "lucide-react";

const NavigationMobile = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Início", icon: Home },
    { path: "/library", label: "Biblioteca", icon: BookOpen },
    { path: "/how-ai-works", label: "Como a IA Funciona?", icon: Brain },
    { path: "/parents", label: "Responsáveis", icon: Users },
    { path: "/teacher", label: "Professores", icon: GraduationCap },
  ];

  return (
    <nav
      className="glass-effect fixed top-0 left-0 right-0 z-50 p-4 md:hidden"
      style={{ backgroundColor: "#ffedb0" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-4">
          <span className="flex items-center">
            <span className="text-4xl font-bold">
              <span style={{ color: "#edbf21" }}>Sab</span>
              <span style={{ color: "#153c4b" }}>IA</span>
            </span>
            <img
              src={ImagemSabia}
              alt="Sabiá"
              className="w-20 h-12 object-cover rounded-lg ml-4"
            />
          </span>
        </Link>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-[#edbf21] transition-colors"
          >
            <Menu className="w-8 h-8 text-[#153c4b]" />
          </button>

          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 mt-2 w-56 bg-[#ffedb0] rounded-lg shadow-lg flex flex-col overflow-hidden"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                  >
                    <div
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg
                                    text-[#153c4b] hover:bg-[#edbf21] hover:text-black transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </Link>
                );
              })}

              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <div
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg
                                text-[#153c4b] hover:bg-[#edbf21] hover:text-black transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="text-sm font-medium">Entrar</span>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationMobile;
