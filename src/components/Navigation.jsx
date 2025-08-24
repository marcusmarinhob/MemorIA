import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  BarChart3,
  Users,
  Brain,
  GraduationCap,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ImagemSabia from "../assets/sabia2.jpg";

const Navigation = () => {
  const location = useLocation();

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
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden shadow-md"
            >
              <img
                src={ImagemSabia}
                alt="Sabiá"
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>
            <span className="text-2xl font-bold">
              <span style={{ color: "#edbf21" }}>Sab</span>
              <span style={{ color: "#153c4b" }}>IA</span>
            </span>
          </Link>

          {/* Navigation Items - Centralized */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      isActive 
                        ? "bg-[#153c4b] text-white shadow-md" 
                        : "text-[#153c4b] hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Login Button */}
          <Link to="/login">
            <Button 
              className="bg-[#153c4b] text-white px-6 py-3 font-semibold rounded-full flex items-center justify-center hover:bg-[#1a4a5c] hover:scale-105 transition-all duration-300 shadow-md border-0"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Entrar
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu - Hidden by default, can be expanded later */}
      <div className="md:hidden mt-4">
        <div 
          className="mx-4 p-4 rounded-2xl shadow-lg backdrop-blur-sm"
          style={{ 
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }}
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? "bg-[#153c4b] text-white shadow-md" 
                        : "text-[#153c4b] hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-base font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
