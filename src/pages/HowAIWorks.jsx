import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  Brain,
  MessageCircle,
  Target,
  Zap,
  BookOpen,
  ArrowRight,
  Play,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import ChatBot from "@/components/ChatBot";
import { toast } from "@/components/ui/use-toast";
import Apresentacao from "../Videos/apresentacao.mp4";
import { Link } from "react-router-dom";

const HowAIWorks = () => {
  const [showVideo, setShowVideo] = useState(false);
  const steps = [
    {
      number: "01",
      title: "Você faz uma pergunta",
      description:
        "Digite sua dúvida sobre qualquer matéria escolar no chat da sabIA",
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "02",
      title: "A IA analisa seu perfil",
      description:
        "Nossa inteligência artificial considera seu nível, histórico e dificuldades",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "03",
      title: "Resposta personalizada",
      description: "Receba uma explicação adaptada ao seu jeito de aprender",
      icon: Target,
      color: "from-green-500 to-emerald-500",
    },
    {
      number: "04",
      title: "Aprendizado contínuo",
      description: "A IA aprende com você e melhora suas recomendações",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const features = [
    {
      title: "Linguagem Simples",
      description:
        "A sabIA explica conceitos complexos de forma fácil de entender, usando exemplos do seu dia a dia.",
      icon: MessageCircle,
      example:
        "Em vez de dizer 'equação linear', ela explica: 'vamos descobrir o valor de x, como um mistério matemático!'",
    },
    {
      title: "Adaptação ao Seu Ritmo",
      description:
        "Se você não entender na primeira vez, a IA explica de outro jeito, mais devagar ou com mais exemplos.",
      icon: Target,
      example:
        "Se você errar uma questão de frações, ela oferece exercícios mais básicos antes de avançar.",
    },
    {
      title: "Disponível 24/7",
      description:
        "Pode tirar dúvidas a qualquer hora, mesmo de madrugada ou nos fins de semana.",
      icon: Zap,
      example:
        "Estudando para a prova de ciências no domingo? A sabIA está sempre pronta para ajudar!",
    },
    {
      title: "Conteúdo Seguro",
      description:
        "Todas as respostas são verificadas e apropriadas para sua idade e série escolar.",
      icon: BookOpen,
      example:
        "O conteúdo é sempre educativo e adequado para estudantes do 6º ao 9º ano.",
    },
  ];

  const benefits = [
    {
      title: "Para Estudantes",
      points: [
        "Tire dúvidas na hora, sem esperar",
        "Aprenda no seu próprio ritmo",
        "Receba explicações personalizadas",
        "Acompanhe seu progresso",
      ],
      icon: "🎓",
      color: "#153c4b",
    },
    {
      title: "Para Responsáveis",
      points: [
        "Monitore o progresso do seu filho",
        "Receba relatórios semanais",
        "Veja onde precisa de mais ajuda",
        "Acompanhe as conquistas",
      ],
      icon: "👨‍👩‍👧‍👦",
      color: "#153c4b",
    },
    {
      title: "Para Professores",
      points: [
        "Identifique dificuldades da turma",
        "Receba sugestões de conteúdo",
        "Acompanhe o engajamento",
        "Personalize o ensino",
      ],
      icon: "👩‍🏫",
      color: "#153c4b",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Como a IA Funciona? - sabIA</title>
        <meta
          name="description"
          content="Entenda como nossa inteligência artificial personaliza o aprendizado e adapta o conteúdo para cada estudante do ensino fundamental."
        />
      </Helmet>

      <div className="min-h-screen ">
        <Navigation />

        <div className="pt-24 pb-16 ">
          <div className=" mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16  p-8 rounded-2xl"
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 mt-10 floating-animation"
                style={{ backgroundColor: "#153c4b" }}
              >
                <Brain className="w-12 h-12 text-[#edbf21]" />
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#edbf21]">
                Como a IA Funciona?
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-[#153c4b]/50">
                Descubra como nossa inteligência artificial torna o aprendizado
                mais fácil, divertido e personalizado para você!
              </p>
              <Button
                size="lg"
                className="bg-[#153c4b]  text-[#edbf21] text-2xl sm:text-2xl px-8 sm:px-16 py-4 sm:py-6 font-bold rounded-full flex items-center justify-center 
             hover:bg-[#edbf21] hover:text-[#153c4b] hover:scale-105 transition duration-300 mx-auto"
                onClick={() => setShowVideo(true)}
              >
                <Play className="w-5 h-5 mr-2" />
                Ver Demonstração
              </Button>
            </motion.div>

            {showVideo && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                <div className="relative w-11/12 md:w-3/4 lg:w-1/2">
                  <video
                    src={Apresentacao}
                    controls
                    autoPlay
                    className="w-full rounded-2xl shadow-lg"
                  />
                  <button
                    onClick={() => setShowVideo(false)}
                    className="absolute top-2 right-2 bg-white text-black rounded-full px-3 py-1 shadow hover:bg-gray-200"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            <section className="py-12 px-6 bg-gradient-to-b from-[#e6f7f6] to-white relative">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-12 relative z-10"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#153c4b]">
                    Como funciona em 4 passos simples
                  </h2>
                  <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-[#153c4b]/50">
                    Veja como é fácil aprender com o SabIA
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Card className="h-full rounded-2xl shadow-xl bg-white/20 backdrop-blur-lg border border-white/30 text-center">
                          <CardContent className="p-6">
                            <div
                              className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                            >
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-3xl font-bold text-[#edbf21] mb-2">
                              {step.number}
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-[#153c4b]">
                              {step.title}
                            </h3>
                            <p className="text-[#153c4b]/50 text-sm">
                              {step.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="px-[7%] mb-20 p-8 rounded-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#153c4b]">
                  O que torna nossa IA especial?
                </h2>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-[#153c4b]/50">
                  Características que fazem a diferença no seu aprendizado
                </p>
              </motion.div>

              <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="h-full rounded-2xl shadow-xl bg-[#153c4b] border border-white/20">
                        <CardHeader>
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white">
                              <Icon className="w-6 h-6 text-[#edbf21]" />
                            </div>
                            <CardTitle className="text-[#edbf21]">
                              {feature.title}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white mb-4">
                            {feature.description}
                          </p>
                          <div className="p-3 rounded-lg border-l-4 border-[#edbf21] bg-white/10">
                            <p className="text-white text-sm italic">
                              <strong>Exemplo:</strong> {feature.example}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <section className="px-[7%] mb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#153c4b]">
                  Benefícios para toda a comunidade escolar
                </h2>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-[#153c4b]/50">
                  O SabIA ajuda estudantes, responsáveis e professores
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full rounded-2xl shadow-xl bg-white/20 backdrop-blur-lg border border-white/30">
                      <CardHeader className="text-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#153c4b]">
                          <span className="text-2xl text-[#edbf21]">
                            {benefit.icon}
                          </span>
                        </div>
                        <CardTitle className="text-[#153c4b]">
                          {benefit.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {benefit.points.map((point, pointIndex) => (
                            <li
                              key={pointIndex}
                              className="flex items-center text-[#153c4b]/70"
                            >
                              <div className="w-2 h-2 rounded-full mr-3 bg-[#edbf21]" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-[#153c4b] p-8 mb-16"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#edbf21]">
                  Segurança e Privacidade
                </h2>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white/70">
                  Seus dados estão protegidos e o conteúdo é sempre apropriado
                </p>
              </div>

              <div className="grid px-[5%] md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "🔒",
                    title: "Dados Protegidos",
                    text: "Suas informações pessoais são criptografadas e seguras",
                  },
                  {
                    icon: "✅",
                    title: "Conteúdo Verificado",
                    text: "Todo material é revisado por especialistas em educação",
                  },
                  {
                    icon: "👨‍👩‍👧‍👦",
                    title: "Apropriado para Idade",
                    text: "Conteúdo adequado para estudantes do ensino fundamental",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="text-center rounded-2xl p-6 bg-[#edbf21]"
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-[#153c4b]">
                      <span className="text-xl text-white">{item.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-[#153c4b]">
                      {item.title}
                    </h3>
                    <p className="text-[#153c4b]">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center px-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#153c4b]">
                Pronto para experimentar o SabIA?
              </h2>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-[#153c4b]/50">
                Comece agora e descubra como a inteligência artificial pode
                transformar seus estudos!
              </p>
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-[#edbf21] text-[#153c4b] text-2xl sm:text-2xl px-8 sm:px-16 py-4 sm:py-6 font-bold rounded-full flex items-center justify-center 
             hover:bg-[#153c4b] hover:text-[#edbf21] hover:scale-105 transition duration-300 mx-auto"
                >
                  Começar Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        <ChatBot />
      </div>
    </>
  );
};

export default HowAIWorks;
