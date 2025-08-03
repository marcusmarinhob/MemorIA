
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Filter, ArrowLeft, Play, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import ChatBot from '@/components/ChatBot';
import { toast } from '@/components/ui/use-toast';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const grades = ['6º ano', '7º ano', '8º ano', '9º ano'];
  const subjects = ['Matemática', 'Português', 'Ciências', 'História', 'Geografia', 'Inglês'];

  const content = [
    {
      id: 1,
      title: "Frações e Números Decimais",
      subject: "Matemática",
      grade: "6º ano",
      duration: "15 min",
      difficulty: "Fácil",
      rating: 4.8,
      description: "Aprenda a trabalhar com frações e converter para decimais",
      image: "Estudante resolvendo problemas de matemática com frações"
    },
    {
      id: 2,
      title: "Análise Sintática Básica",
      subject: "Português",
      grade: "7º ano",
      duration: "20 min",
      difficulty: "Médio",
      rating: 4.6,
      description: "Entenda os termos essenciais da oração",
      image: "Livros de português e gramática em uma mesa"
    },
    {
      id: 3,
      title: "Sistema Digestório",
      subject: "Ciências",
      grade: "8º ano",
      duration: "25 min",
      difficulty: "Médio",
      rating: 4.9,
      description: "Como funciona a digestão no corpo humano",
      image: "Diagrama colorido do sistema digestório humano"
    },
    {
      id: 4,
      title: "Brasil Colonial",
      subject: "História",
      grade: "7º ano",
      duration: "30 min",
      difficulty: "Médio",
      rating: 4.7,
      description: "A colonização portuguesa no Brasil",
      image: "Mapa histórico do Brasil colonial"
    },
    {
      id: 5,
      title: "Equações do 1º Grau",
      subject: "Matemática",
      grade: "7º ano",
      duration: "18 min",
      difficulty: "Médio",
      rating: 4.5,
      description: "Resolva equações de primeiro grau passo a passo",
      image: "Quadro negro com equações matemáticas"
    },
    {
      id: 6,
      title: "Clima e Vegetação",
      subject: "Geografia",
      grade: "6º ano",
      duration: "22 min",
      difficulty: "Fácil",
      rating: 4.4,
      description: "Os diferentes tipos de clima e vegetação do Brasil",
      image: "Mapa do Brasil mostrando diferentes biomas"
    }
  ];

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || item.grade === selectedGrade;
    const matchesSubject = selectedSubject === 'all' || item.subject === selectedSubject;
    
    return matchesSearch && matchesGrade && matchesSubject;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Fácil': return 'bg-green-500';
      case 'Médio': return 'bg-yellow-500';
      case 'Difícil': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <Helmet>
        <title>Biblioteca de Conteúdos - sabIA</title>
        <meta name="description" content="Acesse nossa biblioteca completa de conteúdos educacionais organizados por série e matéria, com tutoria personalizada por IA." />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Biblioteca de Conteúdos
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Explore nosso acervo completo de materiais educacionais organizados por série e matéria
              </p>
            </motion.div>

            {/* Filtros */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-effect rounded-lg p-6 mb-8"
            >
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  <Input
                    placeholder="Buscar conteúdo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white"
                >
                  <option value="all" className="bg-gray-800">Todas as séries</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade} className="bg-gray-800">{grade}</option>
                  ))}
                </select>

                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white"
                >
                  <option value="all" className="bg-gray-800">Todas as matérias</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject} className="bg-gray-800">{subject}</option>
                  ))}
                </select>

                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => toast({
                    title: "Filtros Avançados",
                    description: "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
                  })}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </motion.div>

            {/* Conteúdos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="glass-effect h-full overflow-hidden">
                    <div className="relative">
                      <img  
                        alt={item.description}
                        className="w-full h-48 object-cover"
                       src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${getDifficultyColor(item.difficulty)} text-white`}>
                          {item.difficulty}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-black/50 text-white">
                          {item.grade}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-blue-400 text-blue-400">
                          {item.subject}
                        </Badge>
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-4 h-4 mr-1 fill-current" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-white text-lg">
                        {item.title}
                      </CardTitle>
                      <p className="text-white/70 text-sm">
                        {item.description}
                      </p>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-white/60 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {item.duration}
                        </div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        onClick={() => toast({
                          title: "Estudar Conteúdo",
                          description: "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
                        })}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Estudar Agora
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredContent.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <BookOpen className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Nenhum conteúdo encontrado
                </h3>
                <p className="text-white/70">
                  Tente ajustar os filtros ou buscar por outros termos
                </p>
              </motion.div>
            )}
          </div>
        </div>

        <ChatBot />
      </div>
    </>
  );
};

export default Library;
