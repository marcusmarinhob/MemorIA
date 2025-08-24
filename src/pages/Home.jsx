import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  BookOpen,
  Users,
  Zap,
  Star,
  ArrowRight,
  Power,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import ChatBot from "@/components/ChatBot";
import ImagemSabia from "../assets/sabia.jpeg";
import IconeEsquerdo from "../assets/icone-esquerdo.jpeg";
import IconeDireito from "../assets/icone-direito.jpeg";
import ImagemLateral from "../assets/livros.jpeg";
import NavigationMobile from "../components/NavigationMobile";

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "IA Personalizada",
      description: "Tutoria adaptada ao seu ritmo de aprendizado",
    },
    {
      icon: BookOpen,
      title: "Conteúdo Completo",
      description: "Materiais do 6º ao 9º ano organizados por matéria",
    },
    {
      icon: Users,
      title: "Acompanhamento",
      description: "Responsáveis e professores podem monitorar o progresso",
    },
    {
      icon: Zap,
      title: "Aprendizado Rápido",
      description: "Respostas instantâneas para suas dúvidas",
    },
  ];

  const testimonials = [
    {
      name: "Ana, 13 anos",
      text: "A sabIA me ajudou muito em matemática! Agora entendo frações de verdade!",
      grade: "7º ano",
    },
    {
      name: "Carlos, 14 anos",
      text: "Adoro como a IA explica ciências de um jeito fácil de entender.",
      grade: "8º ano",
    },
    {
      name: "Maria, mãe da Sofia",
      text: "Minha filha melhorou muito as notas depois que começou a usar a plataforma.",
      grade: "Responsável",
    },
  ];

  return (
    <>
      <Helmet>
        <title>sabIA - Plataforma de Tutoria com Inteligência Artificial</title>
        <meta
          name="description"
          content="Plataforma educativa com IA para alunos do 6º ao 9º ano. Tutoria personalizada, conteúdo adaptativo e acompanhamento do progresso."
        />
      </Helmet>

      <div className="hidden md:block">
        <Navigation />
      </div>
      <div className="md:hidden">
        <NavigationMobile />
      </div>

      {/* ================= SEÇÃO HERO (COMEÇAR AGORA) ================= */}
      <section className="pt-24 pb-16 px-4 text-center relative">
        <motion.div
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <img
            alt="Mascote SabIA"
            className="w-32 h-32 mx-auto floating-animation rounded-full shadow-lg"
            src={ImagemSabia}
          />

          <h1 className="text-5xl md:text-7xl font-bold text-[#edbf21]">
            Aprenda com o <br /> SabIA
          </h1>

          <p className="text-xl md:text-2xl text-[#153c4b] max-w-2xl mx-auto">
            A plataforma de tutoria com inteligência artificial <br />
            que transforma o aprendizado dos alunos do 6º ao 9º ano
          </p>

          <div className="flex justify-center mt-10">
            <Link to="/login">
              <Button
                size="lg"
                className="px-12 py-6 text-2xl font-bold rounded-full text-white bg-[#153c4b] border-2 border-[#edbd2100] hover:scale-105 hover:bg-[#153c4b]/90 transition-transform duration-300"
              >
                Começar Agora
                <Power className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= SEÇÃO POR QUE ESCOLHER ================= */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#e6f7f6] to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#153c4b] mb-6">
              Por que escolher o SabIA?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Nossa inteligência artificial foi desenvolvida especialmente para estudantes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-8 glass-effect rounded-2xl shadow-lg"
                >
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#edbf21]/20">
                    <Icon className="w-8 h-8 text-[#edbf21]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#153c4b] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SEÇÃO ESTATÍSTICAS ================= */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-[#153c4b] rounded-2xl p-8"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#edbf21] mb-2">
                  10k+
                </div>
                <p className="text-[#edbf21]/80">Estudantes Ativos</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#edbf21] mb-2">
                  95%
                </div>
                <p className="text-[#edbf21]/80">Melhoria nas Notas</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#edbf21] mb-2">
                  24/7
                </div>
                <p className="text-[#edbf21]/80">Suporte da IA</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= TESTEMUNHOS ================= */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#57b4b1] mb-6">
              O que nossos usuários dizem
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-[#153c4b] h-full">
                  <CardContent className="p-6 text-center">
                    <div className="flex mb-4 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-[#edbf21] fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-[#edbf21]/80 mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <p className="font-semibold text-[#edbf21]">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-[#edbf21]/60">
                        {testimonial.grade}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION FINAL ================= */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-effect rounded-2xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#57b4b1] mb-6">
              Pronto para revolucionar seus estudos?
            </h2>
            <p className="text-xl text-[#153c4b] mb-8">
              Junte-se a milhares de estudantes que já estão aprendendo com o
              SabIA
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/how-ai-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-[#153c4b] border-2 border-[#edbf21] text-[#edbf21] text-xl sm:text-3xl px-12 sm:px-20 py-6 sm:py-8 font-bold rounded-full flex items-center justify-center w-full sm:w-auto hover:scale-105 transition-transform duration-300"
                >
                  Começar Gratuitamente
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ChatBot />
    </>
  );
};

export default Home;
