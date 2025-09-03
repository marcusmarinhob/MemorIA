import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronDown, 
  Search,
  Filter,
  Play,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import ChatBot from "@/components/ChatBot";
import { toast } from "@/components/ui/use-toast";
import { text } from "stream/consumers";

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const grades = ["6º ano", "7º ano", "8º ano", "9º ano"];
  const subjects = [
    "Matemática",
    "Português",
    "Ciências",
    "História",
    "Geografia",
    "Inglês",
  ];

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
      image: "https://images.unsplash.com/photo-1595872018818-97555653a011",
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
      image: "https://images.unsplash.com/photo-1581090700227-4c4f50b4f4b6",
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
      image: "https://images.unsplash.com/photo-1603791452906-b0fefb83f9b2",
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
      image: "https://images.unsplash.com/photo-1505664063607-efd88c5817c7",
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
      image: "https://images.unsplash.com/photo-1509223197845-458d87318791",
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
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
  ];

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade =
      selectedGrade === "all" || item.grade === selectedGrade;
    const matchesSubject =
      selectedSubject === "all" || item.subject === selectedSubject;

    return matchesSearch && matchesGrade && matchesSubject;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-green-500";
      case "Médio":
        return "bg-yellow-500";
      case "Difícil":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <Helmet>
        <title>Biblioteca de Conteúdos - sabIA</title>
        <meta
          name="description"
          content="Acesse nossa biblioteca completa de conteúdos educacionais organizados por série e matéria, com tutoria personalizada por IA."
        />
      </Helmet>

      <div className>
        <Navigation />

        <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#edbf21] mb-6">
              Biblioteca de Conteúdos
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Explore nosso acervo completo de materiais educacionais
              organizados por série e matéria
            </p>
          </motion.div>

          {/* Filtros */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl p-6 mb-12 bg-[#153c4b] shadow-lg"
          >
            <div className="grid md:grid-cols-4 gap-4">
              {/* Busca */}
              <div className="h-full flex items-center">
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
                  <Input
                    placeholder="Buscar conteúdo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-7 rounded-full bg-white/20 text-white placeholder-white border-none shadow-none"
                  />
                </div>
              </div>

              {/* Série */}
              <div className="h-full flex items-center">
                <div className="relative w-full">
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full px-4 py-4 pr-10 rounded-full bg-white/20 text-white appearance-none border-none shadow-none"
                  >
                    <option value="all" className="bg-[#153c4b] text-white">Todas as séries</option>
                    {grades.map((grade) => (
                      <option key={grade} value={grade} className="bg-[#153c4b] text-white">
                        {grade}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
                </div>
              </div>

              {/* Matéria */}
              <div className="h-full flex items-center">
                <div className="relative w-full">
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-4 py-4 pr-10 rounded-full bg-white/20 text-white appearance-none border-none shadow-none focus:ring-2 focus:ring-[#edbf21]"
                  >
                    <option value="all" className="bg-[#153c4b] text-white">Todas as matérias</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject} className="bg-[#153c4b] text-white">
                        {subject}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
                </div>
              </div>

              {/* Botão filtros */}
              <div className="h-full flex items-center">
                <Button
                  // Removemos o variant para evitar sobrescrita de estilos
                  className="w-full px-4 py-4 text-white font-bold rounded-full transition-transform duration-300 flex items-center justify-center hover:scale-105"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)", // fundo semitransparente
                    border: "none", // remove borda
                    color: "white", // força texto branco sempre
                  }}
                  onClick={() =>
                    toast({
                      title: "Filtros Avançados",
                      description:
                        "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
                    })
                  }
                >
                  <Filter className="w-5 h-5 mr-2 text-white" />
                  Filtros
                </Button>
              </div>

            </div>
          </motion.div>




          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full flex flex-col overflow-hidden rounded-2xl shadow-lg bg-white/90">
                  <div className="relative">
                    <img
                      alt={item.description}
                      className="w-full h-48 object-cover rounded-t-2xl"
                      src={item.image}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`${getDifficultyColor(
                          item.difficulty
                        )} text-white`}
                      >
                        {item.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-black/50 text-white">
                        {item.grade}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="outline"
                        className="border-[#edbf21] text-[#edbf21]"
                      >
                        {item.subject}
                      </Badge>
                      <div className="flex items-center text-[#edbf21]">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-[#153c4b] text-lg">
                      {item.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.duration}
                    </div>
                    <Button
                      size="lg"
                      className="w-full rounded-full bg-[#153c4b] border-2 border-[#edbf21] text-[#edbf21] font-bold text-lg hover:scale-105 transition-transform duration-300"
                      onClick={() =>
                        toast({
                          title: "Estudar Conteúdo",
                          description:
                            "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
                        })
                      }
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Estudar Agora
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Estado vazio */}
          {filteredContent.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <BookOpen className="w-16 h-16 text-[#edbf21] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#153c4b] mb-2">
                Nenhum conteúdo encontrado
              </h3>
              <p className="text-gray-600">
                Tente ajustar os filtros ou buscar por outros termos
              </p>
            </motion.div>
          )}
        </div>

        <ChatBot />
      </div>
    </>
  );
};

export default Library;
