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
import { toast } from "@/components/ui/use-toast";
import { buscarDadosUsuario } from "../lib/firestore";
import { onAuthStateChange } from "../lib/auth";

const StudentArea = () => {
  const [studentData, setStudentData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Função correta e completa
  // -----------------------------
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
        { name: "Matemática", progress: 75, nextTopic: "Equações do 1º grau" },
        { name: "Português", progress: 85, nextTopic: "Análise sintática" },
        { name: "Ciências", progress: 60, nextTopic: "Sistema digestório" },
        { name: "História", progress: 70, nextTopic: "Brasil Colonial" },
        { name: "Geografia", progress: 55, nextTopic: "Clima brasileiro" },
      ],
      recentActivities: [
        { subject: "Matemática", topic: "Frações", score: 95, time: "2 horas atrás" },
        { subject: "Português", topic: "Verbos", score: 88, time: "1 dia atrás" },
        { subject: "Ciências", topic: "Células", score: 92, time: "2 dias atrás" },
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

  // -----------------------------
  // useEffect CORRIGIDO
  // -----------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }

      setCurrentUser(user);
      fetchUserData(user); // ✅ Agora funciona corretamente
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#edbf21] mx-auto"></div>
          <p className="mt-4 text-[#ffffff]">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#ffffff]">Erro ao carregar dados.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Área do Estudante - MemorIA</title>
        <meta
          name="description"
          content="Área personalizada do estudante com tutoria por IA, acompanhamento de progresso e conteúdo adaptativo."
        />
      </Helmet>

      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 text-[#ffffff]">
            <Link to="/" className="inline-flex items-center text-[#ffffff]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>

            <div className="text-right">
              <p>Bem-vindo(a) de volta!</p>
              <h1 className="text-2xl font-bold">{studentData.name}</h1>
            </div>
          </div>

          {/* ... TODO O RESTO DO SEU JSX PERMANECE IGUAL ... */}
        </div>
      </div>
    </>
  );
};

export default StudentArea;
