import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  BarChart3,
  Clock,
  Trophy,
  BookOpen,
  ArrowLeft,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import ChatBot from "@/components/ChatBot";
import { toast } from "@/components/ui/use-toast";

const ParentsArea = () => {
  const [parentData, setParentData] = useState(null);

  useEffect(() => {
    const mockData = {
      parent: {
        name: "Maria Silva",
        children: [
          {
            name: "Ana Silva",
            grade: "7º ano",
            age: 13,
            totalPoints: 1250,
            level: 5,
            weeklyHours: 12.5,
            averageGrade: 8.2,
          },
        ],
      },
      childProgress: {
        subjects: [
          {
            name: "Matemática",
            grade: 8.5,
            progress: 75,
            trend: "up",
            lastActivity: "2 horas atrás",
          },
          {
            name: "Português",
            grade: 9.0,
            progress: 85,
            trend: "up",
            lastActivity: "1 dia atrás",
          },
          {
            name: "Ciências",
            grade: 7.5,
            progress: 60,
            trend: "down",
            lastActivity: "3 dias atrás",
          },
          {
            name: "História",
            grade: 8.0,
            progress: 70,
            trend: "up",
            lastActivity: "1 dia atrás",
          },
          {
            name: "Geografia",
            grade: 7.0,
            progress: 55,
            trend: "stable",
            lastActivity: "2 dias atrás",
          },
        ],
        weeklyActivity: [
          { day: "Seg", hours: 2.5, completed: true },
          { day: "Ter", hours: 1.8, completed: true },
          { day: "Qua", hours: 3.2, completed: true },
          { day: "Qui", hours: 2.1, completed: true },
          { day: "Sex", hours: 1.5, completed: true },
          { day: "Sáb", hours: 0.8, completed: false },
          { day: "Dom", hours: 0, completed: false },
        ],
        recentAchievements: [
          {
            name: "Matemático",
            date: "Ontem",
            description: "Completou 50 exercícios de matemática",
          },
          {
            name: "Primeira Semana",
            date: "3 dias atrás",
            description: "Estudou 7 dias seguidos",
          },
        ],
        alerts: [
          {
            type: "warning",
            message: "Ana não estudou ciências nos últimos 3 dias",
            priority: "Média",
          },
          {
            type: "info",
            message: "Novo conteúdo de matemática disponível",
            priority: "Baixa",
          },
        ],
      },
      aiInsights: [
        {
          title: "Ponto Forte",
          description:
            "Ana tem excelente desempenho em Português e demonstra facilidade com interpretação de texto.",
          type: "positive",
        },
        {
          title: "Área de Atenção",
          description:
            "Recomendamos mais prática em Ciências, especialmente nos tópicos de biologia.",
          type: "attention",
        },
        {
          title: "Sugestão",
          description:
            "Considere estabelecer um horário fixo para estudos de ciências para criar consistência.",
          type: "suggestion",
        },
      ],
    };

    setParentData(mockData);
  }, []);

  if (!parentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl" style={{ color: "#153c4b" }}></div>
      </div>
    );
  }

  const child = parentData.parent.children[0];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="pl-1 w-4 h-4 text-green-400" />;
      case "down":
        return <TrendingUp className="pr-1 w-4 h-4 text-red-400 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case "info":
        return <AlertCircle className="w-4 h-4 text-blue-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case "positive":
        return "border-green-500/30 bg-green-500/10";
      case "attention":
        return "border-yellow-500/30 bg-yellow-500/10";
      case "suggestion":
        return "border-blue-500/30 bg-blue-500/10";
      default:
        return "border-gray-500/30 bg-gray-500/10";
    }
  };

  return (
    <>
      <Helmet>
        <title>Área dos Responsáveis - SabIA</title>
        <meta
          name="description"
          content="Acompanhe o progresso educacional do seu filho com relatórios detalhados e insights da inteligência artificial."
        />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />

        <div className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1
                className="text-4xl text-center font-bold mt-8"
                style={{ color: "#153c4b" }}
              >
                Área dos Responsáveis
              </h1>
              <p
                className="text-2xl text-center font-bold mt-2"
                style={{ color: "#153c4b" }}
              >
                Acompanhe o progresso educacional de {child.name}
              </p>
            </motion.div>

            {/* Card principal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-6 mb-8 bg-[#153c4b]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#edbf21] rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#153c4b]">
                      {child.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mt-2 text-[#edbf21]">
                      {child.name}
                    </h2>
                    <p className="text-lg font-bold mt-1 text-white">
                      {child.grade} • {child.age} anos
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    toast({
                      title: "Configurações",
                      description:
                        "🚧 Esta funcionalidade ainda não está implementada.",
                    })
                  }
                  variant="outline"
                  size="md"
                  className="bg-[#edbf21] border-2 border-[#153c4b] text-[#153c4b] px-6 py-2 font-bold rounded-full hover:scale-105 transition-transform duration-300"
                >
                  Configurações
                </Button>
              </div>

              <div className="grid md:grid-cols-4 gap-6 text-center text-white">
                <div>
                  <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold mt-2 text-[#edbf21]">
                    {child.totalPoints}
                  </div>
                  <p className="text-white/70 text-sm">Pontos</p>
                </div>
                <div>
                  <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold mt-2 text-[#edbf21]">
                    Nível {child.level}
                  </div>
                  <p className="text-white/70 text-sm">Experiência</p>
                </div>
                <div>
                  <Clock className="w-8 h-8 text-[#edbf21] mx-auto mb-2" />
                  <div className="text-2xl font-bold mt-2 text-[#edbf21]">
                    {child.weeklyHours}h
                  </div>
                  <p className="text-white/70 text-sm">Esta Semana</p>
                </div>
                <div>
                  <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold mt-2 text-[#edbf21]">
                    {child.averageGrade}
                  </div>
                  <p className="text-white/70 text-sm">Média Geral</p>
                </div>
              </div>
            </motion.div>

            {/* Cards secundários */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Progresso por matéria */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="rounded-2xl bg-[#153c4b]">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold mt-2 text-[#edbf21] flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Progresso por Matéria
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {parentData.childProgress.subjects.map(
                        (subject, index) => (
                          <div
                            key={index}
                            className="p-4 bg-[#1f4f68] rounded-2xl"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3 text-white font-semibold">
                                {subject.name}
                                {getTrendIcon(subject.trend)}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary">
                                  Nota: {subject.grade}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="border-[#edbf21] text-[#edbf21]"
                                >
                                  {subject.progress}%
                                </Badge>
                              </div>
                            </div>
                            <Progress value={subject.progress} className="mb-2" />
                            <p className="text-white/60 text-xs">
                              Última atividade: {subject.lastActivity}
                            </p>
                          </div>
                        )
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Insights da IA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="rounded-2xl bg-[#153c4b]">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold mt-2 text-[#edbf21]">
                        Insights da IA sobre {child.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {parentData.aiInsights.map((insight, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-2xl border ${getInsightColor(
                            insight.type
                          )}`}
                        >
                          <h4 className="text-lg font-bold text-[#edbf21]">
                            {insight.title}
                          </h4>
                          <p className="text-white/80 text-sm">
                            {insight.description}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="space-y-6">
                {/* Alertas */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="rounded-2xl bg-[#153c4b]">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold mt-2 text-[#edbf21]">
                        Alertas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {parentData.childProgress.alerts.map((alert, index) => (
                        <div
                          key={index}
                          className="p-3 bg-[#1f4f68] rounded-2xl flex items-start space-x-2"
                        >
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <p className="text-white text-sm">{alert.message}</p>
                            <Badge className="mt-1 text-xs" variant="outline">
                              {alert.priority}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Conquistas Recentes */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card className="rounded-2xl bg-[#153c4b]">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold mt-2 text-[#edbf21]">
                        Conquistas Recentes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {parentData.childProgress.recentAchievements.map(
                        (achievement, index) => (
                          <div
                            key={index}
                            className="p-3 bg-[#1f4f68] rounded-2xl"
                          >
                            <div className="flex items-center space-x-2 mb-1">
                              <Trophy className="w-4 h-4 text-yellow-400" />
                              <span className="font-medium text-white text-sm">
                                {achievement.name}
                              </span>
                            </div>
                            <p className="text-xs text-white/70 mb-1">
                              {achievement.description}
                            </p>
                            <p className="text-xs text-white/50">{achievement.date}</p>
                          </div>
                        )
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Ações Rápidas */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Card className="rounded-2xl bg-[#153c4b]">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold mt-2 text-[#edbf21]">
                        Ações Rápidas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-white/10"
                        onClick={() =>
                          toast({
                            title: "Relatório Semanal",
                            description:
                              "🚧 Funcionalidade não implementada.",
                          })
                        }
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Relatório Semanal
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-white/10"
                        onClick={() =>
                          toast({
                            title: "Configurar Metas",
                            description:
                              "🚧 Funcionalidade não implementada.",
                          })
                        }
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        Configurar Metas
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-white/10"
                        onClick={() =>
                          toast({
                            title: "Conversar com Professor",
                            description:
                              "🚧 Funcionalidade não implementada.",
                          })
                        }
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Conversar com Professor
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <ChatBot />
      </div>
    </>
  );
};

export default ParentsArea;
