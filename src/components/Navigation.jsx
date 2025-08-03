import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, BarChart3, Users, Brain, GraduationCap, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/library', label: 'Biblioteca', icon: BookOpen },
    { path: '/how-ai-works', label: 'Como a IA Funciona?', icon: Brain },
    { path: '/parents', label: 'Responsáveis', icon: Users },
    { path: '/teacher', label: 'Professores', icon: GraduationCap },
  ];

  return (
    <nav className="glass-effect fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
          >
            <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/5b3fa98b-a199-4439-9411-aeec121e4281/981d0b32888904812190326e82de7308.jpg" alt="Mascote sabIA" className="w-full h-full rounded-lg object-cover" />
          </motion.div>
          <span className="text-2xl font-bold gradient-text">sabIA</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <Link to="/login">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <LogIn className="w-4 h-4 mr-2" />
            Entrar
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;