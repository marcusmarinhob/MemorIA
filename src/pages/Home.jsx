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

        <section className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="floating-animation">
                <img
                  alt="Mascote sabIA: um pássaro com chapéu de formatura e engrenagem"
                  className="w-40 h-40 mx-auto rounded-3xl"
                  src={ImagemSabia}
                />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-[#153c4b]">
                Aprenda com o
                <br />
                SabIA
              </h1>

              <p className="text-xl md:text-2xl text-[#153c4b] max-w-3xl mx-auto">
                A plataforma de tutoria com inteligência artificial <br />
                que transforma o aprendizado dos <br />
                alunos do 6º ao 9º ano
              </p>
              <div className="flex flex-col items-center gap-4 mt-8 relative">
                <div className="flex flex-col items-center gap-4 w-full">
                  {/* Botão Começar Agora com imagem ao lado */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 w-full">
                    <Link to="/login" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="lg"
                        className="bg-[#153c4b] border-2 border-[#edbf21] text-[#edbf21] text-2xl sm:text-3xl px-8 sm:px-16 py-4 sm:py-6 font-bold rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300 w-full"
                      >
                        Começar Agora
                        <Power className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <img
                      src={IconeEsquerdo}
                      alt="Icone do SabIA"
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                    />
                  </div>

                  {/* Botão Como Funciona com imagem ao lado */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 w-full">
                    <Link to="/how-ai-works" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="lg"
                        className="bg-[#153c4b] border-2 border-[#edbf21] text-[#edbf21] text-2xl sm:text-3xl px-8 sm:px-16 py-4 sm:py-6 font-bold rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300 w-full"
                      >
                        Como Funciona
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <img
                      src={IconeDireito}
                      alt="Icone do SabIA"
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                    />
                  </div>
                </div>
                {/*
                <div className="absolute left-[5%] top-[60%] transform -translate-y-1/2 hidden md:block">
                  <img
                    src={ImagemLateral}
                    alt="Imagem Sabia em cima de livros"
                    className="w-auto h-auto md:w-56 md:h-auto"
                  />
                </div>
                */}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#57b4b1] mb-6">
                Por que escolher o SabIA?
              </h2>
              <p className="text-xl text-[#153c4b] max-w-2xl mx-auto">
                Nossa inteligência artificial foi desenvolvida especialmente
                para estudantes
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="bg-[#153c4b] h-full">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-[#edbf21]" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#edbf21] mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-[#edbf21]/80">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

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
