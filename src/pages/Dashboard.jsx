
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Calendar, Target, ArrowLeft, Trophy, Clock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import ChatBot from '@/components/ChatBot';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Simular dados do dashboard
    const mockData = {
      student: {
        name: "Ana Silva",
        grade: "7º ano",
        totalPoints: 1250,
        level: 5,
        weeklyGoal: 300,
        weeklyProgress: 180
      },
      subjects: [
        { name: "Matemática", progress: 75, grade: 8.5, trend: "up", color: "bg-blue-500" },
        { name: "Português", progress: 85, grade: 9.0, trend: "up", color: "bg-green-500" },
        { name: "Ciências", progress: 60, grade: 7.5, trend: "down", color: "bg-purple-500" },
        { name: "História", progress: 70, grade: 8.0, trend: "up", color: "bg-yellow-500" },
        { name: "Geografia", progress: 55, grade: 7.0, trend: "stable", color: "bg-red-500" }
      ],
      weeklyActivity: [
        { day: "Seg", hours: 2.5, completed: true },
        { day: "Ter", hours: 1.8, completed: true },
        { day: "Qua", hours: 3.2, completed: true },
        { day: "Qui", hours: 2.1, completed: true },
        { day: "Sex", hours: 1.5, completed: true },
        { day: "Sáb", hours: 0.8, completed: false },
        { day: "Dom", hours: 0, completed: false }
      ],
      achievements: [
        { name: "Primeira Semana", description: "Complete 7 dias seguidos", progress: 100, unlocked: true },
        { name: "Matemático", description: "Acerte 50 exercícios de matemática", progress: 100, unlocked: true },
        { name: "Leitor Voraz", description: "Leia 10 textos completos", progress: 60, unlocked: false },
        { name: "Cientista", description: "Complete 5 experimentos", progress: 40, unlocked: false }
      ],
      recommendations: [
        {
          subject: "Matemática",
          topic: "Equações do 1º grau",
          reason: "Baseado na sua dificuldade com álgebra",
          priority: "Alta"
        },
        {
          subject: "Ciências",
          topic: "Sistema digestório",
          reason: "Próximo tópico do seu cronograma",
          priority: "Média"
        },
        {
          subject: "Geografia",
          topic: "Clima brasileiro",
          reason: "Reforço do conteúdo anterior",
          priority: "Baixa"
        }
      ]
    };

    setDashboardData(mockData);
  }, []);

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Carregando dashboard...</div>
      </div>
    );
  }

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Alta': return 'bg-red-500';
      case 'Média': return 'bg-yellow-500';
      case 'Baixa': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <Helmet>
        <title>Meu Progresso - sabIA</title>
        <meta name="description" content="Acompanhe seu progresso de aprendizado, estatísticas detalhadas e recomendações personalizadas da IA." />
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
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Meu Progresso
              </h1>
              <p className="text-xl text-white/80">
                Acompanhe sua jornada de aprendizado, {dashboardData.student.name}
              </p>
            </motion.div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="glass-effect">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{dashboardData.student.totalPoints}</div>
                    <p className="text-white/70 text-sm">Pontos Totais</p>
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
                    <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">Nível {dashboardData.student.level}</div>
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
                    <div className="text-2xl font-bold text-white">{dashboardData.student.weeklyProgress}h</div>
                    <p className="text-white/70 text-sm">Esta Semana</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="glass-effect">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70 text-sm">Meta Semanal</span>
                      <span className="text-white text-sm">{dashboardData.student.weeklyProgress}/{dashboardData.student.weeklyGoal}h</span>
                    </div>
                    <Progress value={(dashboardData.student.weeklyProgress / dashboardData.student.weeklyGoal) * 100} />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Progresso por Matéria */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="glass-effect">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Progresso por Matéria
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {dashboardData.subjects.map((subject, index) => (
                        <div key={index} className="p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                              <span className="font-semibold text-white">{subject.name}</span>
                              {getTrendIcon(subject.trend)}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary">Nota: {subject.grade}</Badge>
                              <Badge variant="outline" className="border-white/30 text-white">
                                {subject.progress}%
                              </Badge>
                            </div>
                          </div>
                          <Progress value={subject.progress} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Atividade Semanal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card className="glass-effect">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Atividade Semanal
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-7 gap-2">
                        {dashboardData.weeklyActivity.map((day, index) => (
                          <div key={index} className="text-center">
                            <div className="text-xs text-white/70 mb-2">{day.day}</div>
                            <div
                              className={`h-16 rounded-lg flex items-end justify-center p-1 ${
                                day.completed ? 'bg-gradient-to-t from-blue-500 to-purple-600' : 'bg-white/10'
                              }`}
                            >
                              <div
                                className="w-full bg-white/30 rounded"
                                style={{ height: `${(day.hours / 4) * 100}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-white/70 mt-1">{day.hours}h</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Conquistas */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Card className="glass-effect">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Conquistas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {dashboardData.achievements.map((achievement, index) => (
                        <div key={index} className="p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-white text-sm">{achievement.name}</span>
                            {achievement.unlocked && <Trophy className="w-4 h-4 text-yellow-400" />}
                          </div>
                          <p className="text-xs text-white/70 mb-2">{achievement.description}</p>
                          <Progress value={achievement.progress} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Recomendações da IA */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Card className="glass-effect">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Recomendações da IA</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {dashboardData.recommendations.map((rec, index) => (
                        <div key={index} className="p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-white text-sm">{rec.subject}</span>
                            <Badge className={`${getPriorityColor(rec.priority)} text-white text-xs`}>
                              {rec.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-white font-medium mb-1">{rec.topic}</p>
                          <p className="text-xs text-white/70">{rec.reason}</p>
                        </div>
                      ))}
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

export default Dashboard;
