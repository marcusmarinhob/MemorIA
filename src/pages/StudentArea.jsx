
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, MessageCircle, Trophy, Clock, ArrowLeft, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import ChatBot from '@/components/ChatBot';
import { toast } from '@/components/ui/use-toast';

const StudentArea = () => {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const mockData = {
      name: "Ana Silva",
      grade: "7º ano",
      points: 1250,
      level: 5,
      streak: 7,
      subjects: [
        { name: "Matemática", progress: 75, nextTopic: "Equações do 1º grau" },
        { name: "Português", progress: 85, nextTopic: "Análise sintática" },
        { name: "Ciências", progress: 60, nextTopic: "Sistema digestório" },
        { name: "História", progress: 70, nextTopic: "Brasil Colonial" },
        { name: "Geografia", progress: 55, nextTopic: "Clima brasileiro" }
      ],
      recentActivities: [
        { subject: "Matemática", topic: "Frações", score: 95, time: "2 horas atrás" },
        { subject: "Português", topic: "Verbos", score: 88, time: "1 dia atrás" },
        { subject: "Ciências", topic: "Células", score: 92, time: "2 dias atrás" }
      ],
      achievements: [
        { name: "Primeira Semana", icon: "🎯", unlocked: true },
        { name: "Matemático", icon: "🔢", unlocked: true },
        { name: "Leitor Voraz", icon: "📚", unlocked: false },
        { name: "Cientista", icon: "🔬", unlocked: false }
      ]
    };

    setStudentData(mockData);
  }, []);

  if (!studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Área do Estudante - sabIA</title>
        <meta name="description" content="Área personalizada do estudante com tutoria por IA, acompanhamento de progresso e conteúdo adaptativo." />
      </Helmet>

      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>
            
            <div className="text-right">
              <p className="text-white/70">Bem-vindo(a) de volta!</p>
              <h1 className="text-2xl font-bold text-white">{studentData.name}</h1>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-effect">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{studentData.points}</div>
                  <p className="text-white/70 text-sm">Pontos</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-effect">
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">Nível {studentData.level}</div>
                  <p className="text-white/70 text-sm">Experiência</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-effect">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{studentData.streak}</div>
                  <p className="text-white/70 text-sm">Dias seguidos</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-effect">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{studentData.grade}</div>
                  <p className="text-white/70 text-sm">Série</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Suas Matérias
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {studentData.subjects.map((subject, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-white">{subject.name}</h3>
                          <Badge variant="secondary">{subject.progress}%</Badge>
                        </div>
                        <Progress value={subject.progress} className="mb-2" />
                        <p className="text-sm text-white/70">
                          Próximo: {subject.nextTopic}
                        </p>
                        <Button
                          size="sm"
                          className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          onClick={() => toast({
                            title: "Estudar",
                            description: "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
                          })}
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
                transition={{ delay: 0.6 }}
              >
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Atividades Recentes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {studentData.recentActivities.map((activity, index) => (
                      <div key={index} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-white text-sm">{activity.subject}</span>
                          <Badge variant="secondary" className="text-xs">{activity.score}%</Badge>
                        </div>
                        <p className="text-xs text-white/70">{activity.topic}</p>
                        <p className="text-xs text-white/50">{activity.time}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Conquistas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {studentData.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg text-center ${
                            achievement.unlocked
                              ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                              : 'bg-white/5 opacity-50'
                          }`}
                        >
                          <div className="text-2xl mb-1">{achievement.icon}</div>
                          <p className="text-xs text-white font-medium">{achievement.name}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Links Rápidos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Link to="/library">
                      <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Biblioteca
                      </Button>
                    </Link>
                    <Link to="/dashboard">
                      <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                        <Trophy className="w-4 h-4 mr-2" />
                        Meu Progresso
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-white/10"
                      onClick={() => toast({
                        title: "Exercícios",
                        description: "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
                      })}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Exercícios
                    </Button>
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
