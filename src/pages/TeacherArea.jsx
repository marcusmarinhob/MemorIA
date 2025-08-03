import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import ChatBot from '@/components/ChatBot';
import TeacherStats from '@/components/teacher/TeacherStats';
import ClassList from '@/components/teacher/ClassList';
import TopicPerformance from '@/components/teacher/TopicPerformance';
import TeacherSidebar from '@/components/teacher/TeacherSidebar';

const TeacherArea = () => {
  const [teacherData, setTeacherData] = useState(null);

  useEffect(() => {
    // Simular dados do professor
    const mockData = {
      teacher: {
        name: "Prof. João Santos",
        subject: "Matemática",
        school: "Escola Municipal Dom Pedro",
        totalStudents: 120,
        activeClasses: 4
      },
      classes: [
        { name: "7º A", students: 30, averageGrade: 7.8, engagement: 85, completionRate: 78, needsAttention: 5 },
        { name: "7º B", students: 28, averageGrade: 8.2, engagement: 92, completionRate: 85, needsAttention: 2 },
        { name: "8º A", students: 32, averageGrade: 7.5, engagement: 75, completionRate: 70, needsAttention: 8 },
        { name: "8º B", students: 30, averageGrade: 8.0, engagement: 88, completionRate: 82, needsAttention: 3 }
      ],
      topicPerformance: [
        { topic: "Frações", difficulty: 65, studentsStruggling: 25 },
        { topic: "Equações", difficulty: 78, studentsStruggling: 18 },
        { topic: "Geometria", difficulty: 45, studentsStruggling: 35 },
        { topic: "Porcentagem", difficulty: 55, studentsStruggling: 28 }
      ],
      aiSuggestions: [
        { type: "content", title: "Reforço em Geometria", description: "35% dos alunos têm dificuldade com geometria. Sugerimos exercícios visuais adicionais.", priority: "Alta" },
        { type: "method", title: "Gamificação para Frações", description: "Implementar jogos educativos pode melhorar o engajamento com frações.", priority: "Média" },
        { type: "individual", title: "Atenção Individual", description: "8 alunos do 8º A precisam de acompanhamento mais próximo.", priority: "Alta" }
      ],
      recentActivity: [
        { student: "Ana Silva", action: "Completou exercícios de frações", time: "2h atrás", score: 95 },
        { student: "Carlos Santos", action: "Pediu ajuda com equações", time: "3h atrás", score: null },
        { student: "Maria Oliveira", action: "Finalizou teste de geometria", time: "5h atrás", score: 88 },
        { student: "Pedro Costa", action: "Acessou conteúdo de porcentagem", time: "1 dia atrás", score: null }
      ]
    };

    setTeacherData(mockData);
  }, []);

  if (!teacherData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Área do Professor - sabIA</title>
        <meta name="description" content="Área exclusiva para professores acompanharem o progresso das turmas, receberem insights da IA e personalizarem o ensino." />
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Área do Professor
              </h1>
              <p className="text-xl text-white/80">
                Bem-vindo, {teacherData.teacher.name} - {teacherData.teacher.subject}
              </p>
              <p className="text-white/60">{teacherData.teacher.school}</p>
            </motion.div>

            <TeacherStats stats={{...teacherData.teacher, classes: teacherData.classes}} />

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <ClassList classes={teacherData.classes} />
                <TopicPerformance topics={teacherData.topicPerformance} />
              </div>

              <TeacherSidebar 
                aiSuggestions={teacherData.aiSuggestions} 
                recentActivity={teacherData.recentActivity} 
              />
            </div>
          </div>
        </div>

        <ChatBot />
      </div>
    </>
  );
};

export default TeacherArea;