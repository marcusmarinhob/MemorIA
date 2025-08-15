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
    <nav
      className="glass-effect fixed top-0 left-0 right-0 z-50 p-4"
      style={{ backgroundColor: "#ffedb0" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-lg flex items-center justify-center"
          ></motion.div>
          <span className="text-4xl font-bold">
            <span style={{ color: "#edbf21" }}>Sab</span>
            <span style={{ color: "#153c4b" }}>IA</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-[#153c4b]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all bg-[#ffedb0]"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <Link to="/login">
          <Button className="bg-[#153c4b] border-2 border-[#edbf21] text-[#edbf21] text-xl px-8 py-4 font-bold rounded-full flex items-center justify-center hover:bg-[#edbf21] hover:text-black hover:scale-105 transition-transform duration-300">
            <LogIn className="w-4 h-4 mr-2" />
            Entrar
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
