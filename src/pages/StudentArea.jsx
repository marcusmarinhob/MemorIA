import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  MessageCircle,
  Trophy,
  Clock,
  ArrowLeft,
  Play,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import ChatBot from "@/components/ChatBot";
import { toast } from "@/components/ui/use-toast";
import { buscarDadosUsuario } from "../lib/firestore";
import { onAuthStateChange } from "../lib/auth";

const StudentArea = () => {
  const [studentData, setStudentData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }

      setCurrentUser(user);
      fetchUserData(user);
    });

    const fetchUserData = async (user) => {
      const userDataResult = await buscarDadosUsuario(user.uid);
      let userName = "students";

      if (userDataResult.success) {
        userName = userDataResult.data.nome || "students";
      }

      const mockData = {
        uid: user.uid,
        name: userName.toUpperCase(),
        grade: "7º ano",
        points: 1250,
        level: 5,
        streak: 7,
        subjects: [
          {
            name: "Matemática",
            progress: 75,
            nextTopic: "Equações do 1º grau",
          },
          { name: "Português", progress: 85, nextTopic: "Análise sintática" },
          { name: "Ciências", progress: 60, nextTopic: "Sistema digestório" },
          { name: "História", progress: 70, nextTopic: "Brasil Colonial" },
          { name: "Geografia", progress: 55, nextTopic: "Clima brasileiro" },
        ],
        recentActivities: [
          {
            subject: "Matemática",
            topic: "Frações",
            score: 95,
            time: "2 horas atrás",
          },
          {
            subject: "Português",
            topic: "Verbos",
            score: 88,
            time: "1 dia atrás",
          },
          {
            subject: "Ciências",
            topic: "Células",
            score: 92,
            time: "2 dias atrás",
          },
        ],
        achievements: [
          { name: "Primeira Semana", icon: "🎯", unlocked: true },
          { name: "Matemático", icon: "🔢", unlocked: true },
          { name: "Leitor Voraz", icon: "📚", unlocked: false },
          { name: "Cientista", icon: "🔬", unlocked: false },
        ],
      };

      setStudentData(mockData);
      setLoading(false);
    };

    fetchUserData();

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#edbf21] mx-auto"></div>
          <p className="mt-4 text-[#153c4b]">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#153c4b]">Erro ao carregar dados.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Área do Estudante - SabIA</title>
        <meta
          name="description"
          content="Área personalizada do estudante com tutoria por IA, acompanhamento de progresso e conteúdo adaptativo."
        />
      </Helmet>

      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 text-[#153c4b]">
            <Link to="/" className="inline-flex items-center text-[#153c4b]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>

            <div className="text-right">
              <p>Bem-vindo(a) de volta!</p>
              <h1 className="text-2xl font-bold">{studentData.name}</h1>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-center">
            {[
              {
                icon: Trophy,
                value: studentData.points,
                label: "Pontos",
                color: "yellow-400",
              },
              {
                icon: Star,
                value: `Nível ${studentData.level}`,
                label: "Experiência",
                color: "purple-400",
              },
              {
                icon: Clock,
                value: studentData.streak,
                label: "Dias seguidos",
                color: "yellow-300",
              },
              {
                icon: BookOpen,
                value: studentData.grade,
                label: "Série",
                color: "green-400",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="rounded-2xl p-6 bg-[#153c4b] text-white shadow-lg">
                  <item.icon
                    className={`w-8 h-8 mx-auto mb-2 text-${item.color}`}
                  />
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p className="text-white/80 text-sm">{item.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="rounded-2xl bg-[#153c4b] text-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Suas Matérias
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {studentData.subjects.map((subject, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white/10 rounded-xl flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-white">
                            {subject.name}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="text-xs"
                            style={{
                              backgroundColor: "#edbf21",
                              color: "#153c4b",
                            }}
                          >
                            {subject.progress}%
                          </Badge>
                        </div>
                        <Progress value={subject.progress} className="mb-2" />
                        <p className="text-sm text-white/80">
                          Próximo: {subject.nextTopic}
                        </p>
                        <Button
                          variant="outline"
                          size="md"
                          className="bg-white/10 border-2 border-[#edbf21] text-[#edbf21] text-sm sm:text-base px-6 py-2 font-bold rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300 w-auto mt-2"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Estudar
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="rounded-2xl bg-[#153c4b] text-white shadow-lg">
                  <CardHeader>
                    <CardTitle>Atividades Recentes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {studentData.recentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="p-3 bg-white/10 rounded-xl flex flex-col gap-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white text-sm">
                            {activity.subject}
                          </span>
                          <Badge
                            variant="secondary"
                            className="text-xs"
                            style={{
                              backgroundColor: "#edbf21",
                              color: "#153c4b",
                            }}
                          >
                            {activity.score}%
                          </Badge>
                        </div>
                        <p className="text-xs text-white/80">
                          {activity.topic}
                        </p>
                        <p className="text-xs text-white/60">{activity.time}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="rounded-2xl bg-[#153c4b] text-white shadow-lg">
                  <CardHeader>
                    <CardTitle>Conquistas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {studentData.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-xl text-center ${
                            achievement.unlocked
                              ? "bg-[#1a2d3e] border border-[#153c4b]"
                              : "bg-white/10 opacity-60"
                          }`}
                        >
                          <div className="text-2xl mb-1">
                            {achievement.icon}
                          </div>
                          <p className="text-xs text-white font-medium">
                            {achievement.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Card className="rounded-2xl bg-[#153c4b] text-white shadow-lg">
                  <CardHeader>
                    <CardTitle>Links Rápidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <Link to="/library" className="w-full">
                        <Button className="w-full justify-start text-white rounded-full border border-white bg-transparent hover:bg-white/10 transition-colors">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Biblioteca
                        </Button>
                      </Link>
                      <Link to="/dashboard" className="w-full">
                        <Button className="w-full justify-start text-white rounded-full border border-white bg-transparent hover:bg-white/10 transition-colors">
                          <Trophy className="w-4 h-4 mr-2" />
                          Meu Progresso
                        </Button>
                      </Link>
                      <Button
                        className="w-full justify-start text-white rounded-full border border-white bg-transparent hover:bg-white/10 transition-colors"
                        onClick={() =>
                          toast({
                            title: "Exercícios",
                            description:
                              "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
                          })
                        }
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Exercícios
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>

        <ChatBot />
      </div>
    </>
  );
};

export default StudentArea;
